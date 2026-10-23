/* eslint-disable */
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { resetIdentityWarning, resetRepositoryContext } from '@tiden/reporter-commons/internal';

import { ResultBuilder } from '../src/result-builder';
import { MetadataApplier } from '../src/metadata-applier';

const REPOSITORY = 'git@github.com:acme/shop.git';
const REPO_ENV = [
  'TIDEN_REPOSITORY', 'GITHUB_SERVER_URL', 'GITHUB_REPOSITORY', 'CI_SERVER_URL',
  'CI_PROJECT_PATH', 'BITBUCKET_GIT_HTTP_ORIGIN', 'BUILD_REPOSITORY_URI',
];

describe('identity (parts sent next to the legacy signature)', () => {
  const saved: Record<string, string | undefined> = {};
  let root: string;
  let warn: jest.SpyInstance;

  beforeEach(() => {
    for (const name of REPO_ENV) {
      saved[name] = process.env[name];
      delete process.env[name];
    }
    process.env['TIDEN_REPOSITORY'] = REPOSITORY;
    resetRepositoryContext();
    resetIdentityWarning();
    root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'tiden-jest-id-')));
    fs.mkdirSync(path.join(root, '.git'));
    warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    warn.mockRestore();
    for (const name of REPO_ENV) {
      if (saved[name] === undefined) delete process.env[name];
      else process.env[name] = saved[name];
    }
    resetRepositoryContext();
    resetIdentityWarning();
    fs.rmSync(root, { recursive: true, force: true });
  });

  const assertion = (overrides: any = {}): any => ({
    title: 'logs in',
    fullName: 'Auth logs in',
    ancestorTitles: ['Auth'],
    status: 'passed',
    duration: 120,
    failureDetails: [],
    failureMessages: [],
    ...overrides,
  });

  const build = (overrides: any = {}, file = path.join(root, 'src/auth/login.test.ts')) =>
    ResultBuilder.build({
      value: assertion(overrides),
      path: file,
      metadata: MetadataApplier.empty(),
      profilerSteps: [],
      rootDir: root,
    });

  it('carries language, repository, the repo-relative file and the raw name path for a normal test', () => {
    expect(build().identity).toEqual({
      language: 'js',
      repository: REPOSITORY,
      scope: ['src/auth/login.test.ts'],
      name: ['Auth', 'logs in'],
    });
  });

  it('keeps the legacy signature byte-identical', () => {
    expect(build().signature).toBe('src::auth::login.test.ts::auth::logs_in');
  });

  it('lists every describe, outermost first, for nested describes', () => {
    const result = build({ ancestorTitles: ['Auth', 'Session', 'Refresh'], title: 'rotates the token' });

    expect(result.identity?.name).toEqual(['Auth', 'Session', 'Refresh', 'rotates the token']);
  });

  it('has an empty describe list for a top-level test', () => {
    expect(build({ ancestorTitles: [] }).identity?.name).toEqual(['logs in']);
  });

  it('does not lowercase or underscore titles', () => {
    expect(build({ ancestorTitles: ['Auth Flow'], title: 'Logs In Twice' }).identity?.name)
      .toEqual(['Auth Flow', 'Logs In Twice']);
  });

  it('removes the (Tiden ID: N) marker from the name and leaves the legacy signature as it was', () => {
    const result = build({ title: 'logs in (Tiden ID: 7)' });

    expect(result.identity?.name).toEqual(['Auth', 'logs in']);
    expect(result.case_id).toBe(7);
    expect(result.signature).toBe('7::src::auth::login.test.ts::auth::logs_in');
  });

  it('gives a test the same identity before and after an id is added to it', () => {
    expect(build({ title: 'logs in (Tiden ID: 7)' }).identity).toEqual(build().identity);
  });

  it('turns a Windows-style path into a POSIX scope', () => {
    const result = build({}, `${root}\\src\\auth\\login.test.ts`);

    expect(result.identity?.scope).toEqual(['src/auth/login.test.ts']);
  });

  it('measures the scope from the repository root even when rootDir is a sub-package', () => {
    const pkg = path.join(root, 'packages', 'web');
    fs.mkdirSync(pkg, { recursive: true });
    const result = ResultBuilder.build({
      value: assertion(),
      path: path.join(pkg, 'src/a.test.ts'),
      metadata: MetadataApplier.empty(),
      profilerSteps: [],
      rootDir: pkg,
    });

    expect(result.identity?.scope).toEqual(['packages/web/src/a.test.ts']);
  });

  it('sends no identity for a file outside the repository root, and warns once per process', () => {
    const first = build({}, '/elsewhere/a.test.ts');
    const second = build({}, '/elsewhere/b.test.ts');

    expect(first.identity).toBeUndefined();
    expect(second.identity).toBeUndefined();
    expect(first.signature).not.toBe('');
    const identityWarnings = warn.mock.calls.filter((c) => String(c[0]).includes('not sending test identity'));
    expect(identityWarnings).toHaveLength(1);
  });

  it('sends no identity when no repository resolves, and warns once per process', () => {
    delete process.env['TIDEN_REPOSITORY'];
    resetRepositoryContext();

    const first = build();
    const second = build({ title: 'another' });

    expect(first.identity).toBeUndefined();
    expect(second.identity).toBeUndefined();
    const identityWarnings = warn.mock.calls.filter((c) => String(c[0]).includes('not sending test identity'));
    expect(identityWarnings).toHaveLength(1);
  });

  it('takes the repository from the origin URL in .git/config', () => {
    delete process.env['TIDEN_REPOSITORY'];
    fs.writeFileSync(
      path.join(root, '.git', 'config'),
      '[remote "origin"]\n\turl = https://github.com/acme/from-config.git\n',
    );
    resetRepositoryContext();

    expect(build().identity?.repository).toBe('https://github.com/acme/from-config.git');
  });

  it('takes the repository from the CI environment', () => {
    delete process.env['TIDEN_REPOSITORY'];
    process.env['GITHUB_SERVER_URL'] = 'https://github.com';
    process.env['GITHUB_REPOSITORY'] = 'acme/shop';
    resetRepositoryContext();

    expect(build().identity?.repository).toBe('https://github.com/acme/shop');
  });
});
