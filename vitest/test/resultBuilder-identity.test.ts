/* eslint-disable */
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { resetIdentityWarning, resetRepositoryContext } from '@tiden/reporter-commons/internal';
import { ResultBuilder } from '../src/modules/resultBuilder';

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
    root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'tiden-vitest-id-')));
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

  const MODULE = { type: 'module' };

  /** A real-shaped chain: test -> suite -> ... -> module, like vitest/node hands a reporter. */
  const suiteChain = (...names: string[]): any =>
    names.reduce((parent: any, name) => ({ type: 'suite', name, parent }), MODULE);

  const testCase = (over: any = {}): any => {
    const { moduleId = path.join(root, 'src/auth/login.test.ts'), describes = ['Auth'], name = 'logs in', ...rest } = over;
    return {
      name,
      id: 'id',
      fullName: [...describes, name].join(' > '),
      module: moduleId === null ? undefined : { moduleId },
      parent: describes.length === 0 ? MODULE : suiteChain(...describes),
      result: jest.fn().mockReturnValue({ state: 'passed', errors: [] }),
      diagnostic: jest.fn().mockReturnValue({ duration: 100, startTime: 1_700_000_000_000 }),
      ...rest,
    };
  };

  const build = (over: any = {}, rootDir: string | undefined = root) =>
    ResultBuilder.build({
      testCase: testCase(over),
      metadata: undefined,
      currentSuite: undefined,
      profilerSteps: [],
      rootDir,
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
    expect(build().signature).toBe('src/auth/login.test.ts::auth::logs_in');
  });

  it('lists every describe, outermost first, for nested describes', () => {
    const result = build({ describes: ['Auth', 'Session', 'Refresh'], name: 'rotates the token' });

    expect(result.identity?.name).toEqual(['Auth', 'Session', 'Refresh', 'rotates the token']);
  });

  it('has an empty describe list for a top-level test', () => {
    expect(build({ describes: [] }).identity?.name).toEqual(['logs in']);
  });

  it('keeps a describe title that contains " > " as one level', () => {
    // fullName joins levels with " > ", so splitting it would turn this one
    // describe into two and disagree with jest about the same test.
    expect(build({ describes: ['a > b'] }).identity?.name).toEqual(['a > b', 'logs in']);
  });

  it('falls back to fullName for a test case with no parent chain', () => {
    const result = build({ parent: undefined, describes: ['Outer', 'Inner'] });

    expect(result.identity?.name).toEqual(['Outer', 'Inner', 'logs in']);
  });

  it('does not lowercase or underscore titles', () => {
    expect(build({ describes: ['Auth Flow'], name: 'Logs In Twice' }).identity?.name)
      .toEqual(['Auth Flow', 'Logs In Twice']);
  });

  it('removes the (Tiden ID: N) marker from the name while the legacy signature keeps it', () => {
    const result = build({ name: 'logs in (Tiden ID: 7)' });

    expect(result.identity?.name).toEqual(['Auth', 'logs in']);
    expect(result.case_id).toBe(7);
    // Byte-identical to what 0.3.0 produced: vitest keeps the marker in the last segment.
    expect(result.signature).toBe('7::src/auth/login.test.ts::auth::logs_in_(tiden_id:_7)');
  });

  it('gives a test the same identity before and after an id is added to it', () => {
    expect(build({ name: 'logs in (Tiden ID: 7)' }).identity).toEqual(build().identity);
  });

  it('turns a Windows-style path into a POSIX scope', () => {
    const result = build({ moduleId: `${root}\\src\\auth\\login.test.ts` });

    expect(result.identity?.scope).toEqual(['src/auth/login.test.ts']);
  });

  it('measures the scope from the repository root even when rootDir is a sub-package', () => {
    const pkg = path.join(root, 'packages', 'web');
    fs.mkdirSync(pkg, { recursive: true });

    const result = build({ moduleId: path.join(pkg, 'src/a.test.ts') }, pkg);

    expect(result.identity?.scope).toEqual(['packages/web/src/a.test.ts']);
  });

  it('sends no identity for a file outside the repository root, and warns once per process', () => {
    const first = build({ moduleId: '/elsewhere/a.test.ts' });
    const second = build({ moduleId: '/elsewhere/b.test.ts' });

    expect(first.identity).toBeUndefined();
    expect(second.identity).toBeUndefined();
    const identityWarnings = warn.mock.calls.filter((c) => String(c[0]).includes('not sending test identity'));
    expect(identityWarnings).toHaveLength(1);
  });

  it('sends no identity for a virtual module with no module id', () => {
    expect(build({ moduleId: null }).identity).toBeUndefined();
  });

  it('sends no identity when no repository resolves, and warns once per process', () => {
    delete process.env['TIDEN_REPOSITORY'];
    resetRepositoryContext();

    expect(build().identity).toBeUndefined();
    expect(build({ name: 'another' }).identity).toBeUndefined();
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
    process.env['CI_SERVER_URL'] = 'https://gitlab.example.com';
    process.env['CI_PROJECT_PATH'] = 'acme/shop';
    resetRepositoryContext();

    expect(build().identity?.repository).toBe('https://gitlab.example.com/acme/shop');
  });
});
