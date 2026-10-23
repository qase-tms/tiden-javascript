/* eslint-disable */
import { describe, expect, it, beforeEach, afterEach } from '@jest/globals';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { TestCase, TestResult, TestStatus } from '@playwright/test/reporter';
import { resetIdentityWarning, resetRepositoryContext } from '@tiden/reporter-commons/internal';

import { PROJECT_PARAM, ResultBuilder, BuildArgs } from '../src/result-builder';
import { StepConverter } from '../src/step-converter';
import { StepIndex } from '../src/step-index';
import { TestCaseMetadata } from '../src/metadata-extractor';
import { ReporterOptionsType } from '../src/options';

const REPOSITORY = 'git@github.com:acme/shop.git';
const REPO_ENV = [
  'TIDEN_REPOSITORY', 'GITHUB_SERVER_URL', 'GITHUB_REPOSITORY', 'CI_SERVER_URL',
  'CI_PROJECT_PATH', 'BITBUCKET_GIT_HTTP_ORIGIN', 'BUILD_REPOSITORY_URI',
];

function emptyMetadata(): TestCaseMetadata {
  return {
    ids: [], title: '', fields: {}, parameters: {}, groupParams: {},
    attachments: [], ignore: false, suite: '', comment: '', tags: [],
  };
}

function makeResult(): TestResult {
  return {
    status: 'passed' as TestStatus, startTime: new Date(0), duration: 0, parallelIndex: 0,
    error: undefined, errors: [], attachments: [], steps: [], stdout: [], stderr: [], retry: 0,
  } as unknown as TestResult;
}

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
    root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'tiden-pw-id-')));
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

  /** `titlePath()` as Playwright returns it: ['', project, file, ...describes, title]. */
  function testCase(over: { project?: string; describes?: string[]; title?: string; file?: string } = {}): TestCase {
    const { project = 'chromium', describes = ['Auth'], title = 'logs in', file = path.join(root, 'src/auth/login.spec.ts') } = over;
    return {
      title,
      titlePath: () => ['', project, 'src/auth/login.spec.ts', ...describes, title],
      annotations: [],
      location: { file, line: 1, column: 1 },
    } as unknown as TestCase;
  }

  function build(
    over: Parameters<typeof testCase>[0] = {},
    args: Partial<BuildArgs> = {},
    rootDir: string | undefined = root,
  ) {
    const builder = new ResultBuilder(new StepConverter(new StepIndex()), rootDir);
    return builder.build({
      test: testCase(over),
      result: makeResult(),
      metadata: emptyMetadata(),
      annotations: { ids: [], suites: [] },
      options: {} as ReporterOptionsType,
      isCaptureLogs: false,
      tidenIdsRegistry: new Map<string, number[]>(),
      ...args,
    })! as any;
  }

  it('carries language, repository, the repo-relative file and the raw name path for a normal test', () => {
    expect(build().identity).toEqual({
      language: 'js',
      repository: REPOSITORY,
      scope: ['src/auth/login.spec.ts'],
      name: ['Auth', 'logs in'],
    });
  });

  it('keeps the legacy signature byte-identical, project and all', () => {
    expect(build().signature).toBe('chromium::src/auth/login.spec.ts::auth::logs_in');
  });

  it('lists every describe, outermost first, for nested describes', () => {
    expect(build({ describes: ['Auth', 'Session', 'Refresh'], title: 'rotates' }).identity.name)
      .toEqual(['Auth', 'Session', 'Refresh', 'rotates']);
  });

  it('has an empty describe list for a top-level test', () => {
    expect(build({ describes: [] }).identity.name).toEqual(['logs in']);
  });

  it('does not lowercase or underscore titles', () => {
    expect(build({ describes: ['Auth Flow'], title: 'Logs In Twice' }).identity.name)
      .toEqual(['Auth Flow', 'Logs In Twice']);
  });

  it('removes the (Tiden ID: N) marker from the name while the legacy signature keeps it', () => {
    const result = build({ title: 'logs in (Tiden ID: 7)' });

    expect(result.identity.name).toEqual(['Auth', 'logs in']);
    expect(result.case_id).toBe(7);
    // Byte-identical to what 0.3.0 produced: Playwright keeps the marker in the last segment.
    expect(result.signature).toBe('7::chromium::src/auth/login.spec.ts::auth::logs_in_(tiden_id:_7)');
  });

  it('gives a test the same identity before and after an id is added to it', () => {
    expect(build({ title: 'logs in (Tiden ID: 7)' }).identity).toEqual(build().identity);
  });

  it('puts the project in the tiden.playwright.project param, not in the identity', () => {
    const result = build({ project: 'firefox' });

    expect(PROJECT_PARAM).toBe('tiden.playwright.project');
    expect(result.params[PROJECT_PARAM]).toBe('firefox');
    expect(result.identity.name).toEqual(['Auth', 'logs in']);
    expect(JSON.stringify(result.identity)).not.toContain('firefox');
  });

  it('gives one test run under two projects the same identity and different params', () => {
    const chromium = build({ project: 'chromium' });
    const firefox = build({ project: 'firefox' });

    expect(chromium.identity).toEqual(firefox.identity);
    expect(chromium.params[PROJECT_PARAM]).toBe('chromium');
    expect(firefox.params[PROJECT_PARAM]).toBe('firefox');
  });

  it('adds no project param when the project is unnamed', () => {
    const result = build({ project: '' });

    expect(PROJECT_PARAM in result.params).toBe(false);
    expect(result.identity.name).toEqual(['Auth', 'logs in']);
  });

  it('ignores tiden.suite() / TidenSuite annotations in the name', () => {
    const viaAnnotation = build({}, { annotations: { ids: [], suites: ['Custom Suite', 'Nested'] } });
    const viaMetadata = build({}, { metadata: { ...emptyMetadata(), suite: 'Another Suite' } });

    expect(viaAnnotation.identity.name).toEqual(['Auth', 'logs in']);
    expect(viaMetadata.identity.name).toEqual(['Auth', 'logs in']);
    // The legacy signature does follow the annotation; that is unchanged.
    expect(viaAnnotation.signature).toBe('custom_suite::nested');
  });

  it('turns a Windows-style path into a POSIX scope', () => {
    const result = build({ file: `${root}\\src\\auth\\login.spec.ts` });

    expect(result.identity.scope).toEqual(['src/auth/login.spec.ts']);
  });

  it('measures the scope from the repository root even when rootDir is a sub-package', () => {
    const pkg = path.join(root, 'packages', 'web');
    fs.mkdirSync(pkg, { recursive: true });

    const result = build({ file: path.join(pkg, 'e2e/a.spec.ts') }, {}, pkg);

    expect(result.identity.scope).toEqual(['packages/web/e2e/a.spec.ts']);
  });

  it('sends no identity for a file outside the repository root, and warns once per process', () => {
    const first = build({ file: '/elsewhere/a.spec.ts' });
    const second = build({ file: '/elsewhere/b.spec.ts' });

    expect(first.identity).toBeUndefined();
    expect('identity' in first).toBe(false);
    expect(second.identity).toBeUndefined();
    const identityWarnings = warn.mock.calls.filter((c) => String(c[0]).includes('not sending test identity'));
    expect(identityWarnings).toHaveLength(1);
  });

  it('still sets the project param when the identity is withheld', () => {
    expect(build({ file: '/elsewhere/a.spec.ts', project: 'webkit' }).params[PROJECT_PARAM]).toBe('webkit');
  });

  it('sends no identity when no repository resolves, and warns once per process', () => {
    delete process.env['TIDEN_REPOSITORY'];
    resetRepositoryContext();

    expect(build().identity).toBeUndefined();
    expect(build({ title: 'another' }).identity).toBeUndefined();
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

    expect(build().identity.repository).toBe('https://github.com/acme/from-config.git');
  });

  it('takes the repository from a worktree .git file', () => {
    delete process.env['TIDEN_REPOSITORY'];
    const worktree = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'tiden-pw-wt-')));
    try {
      const gitDir = path.join(root, '.git', 'worktrees', 'wt');
      fs.mkdirSync(gitDir, { recursive: true });
      fs.writeFileSync(path.join(gitDir, 'commondir'), '../..\n');
      fs.writeFileSync(path.join(root, '.git', 'config'), '[remote "origin"]\n\turl = git@github.com:acme/wt.git\n');
      fs.writeFileSync(path.join(worktree, '.git'), `gitdir: ${gitDir}\n`);
      resetRepositoryContext();

      const result = build({ file: path.join(worktree, 'a.spec.ts') }, {}, worktree);

      expect(result.identity).toEqual(expect.objectContaining({
        repository: 'git@github.com:acme/wt.git',
        scope: ['a.spec.ts'],
      }));
    } finally {
      fs.rmSync(worktree, { recursive: true, force: true });
    }
  });

  it('takes the repository from the CI environment', () => {
    delete process.env['TIDEN_REPOSITORY'];
    process.env['BUILD_REPOSITORY_URI'] = 'https://dev.azure.com/acme/proj/_git/shop';
    resetRepositoryContext();

    expect(build().identity.repository).toBe('https://dev.azure.com/acme/proj/_git/shop');
  });
});
