import fs from 'fs';
import os from 'os';
import path from 'path';

import { REPOSITORY_ENV, resetRepositoryContext } from '../../src/internal/repository';
import { buildTestIdentity, resetIdentityWarning } from '../../src/internal/test-identity';

const REPOSITORY = 'git@github.com:acme/shop.git';

describe('buildTestIdentity', () => {
  let root: string;
  let savedRepository: string | undefined;
  let warn: jest.SpyInstance;

  beforeEach(() => {
    savedRepository = process.env[REPOSITORY_ENV];
    process.env[REPOSITORY_ENV] = REPOSITORY;
    resetRepositoryContext();
    resetIdentityWarning();
    root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'tiden-identity-')));
    fs.mkdirSync(path.join(root, '.git'));
    warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    warn.mockRestore();
    if (savedRepository === undefined) {
      Reflect.deleteProperty(process.env, REPOSITORY_ENV);
    } else {
      process.env[REPOSITORY_ENV] = savedRepository;
    }
    resetRepositoryContext();
    resetIdentityWarning();
    fs.rmSync(root, { recursive: true, force: true });
  });

  const warnings = (): string[] => (warn.mock.calls as unknown[][]).map((call) => String(call[0]));

  const build = (over: Partial<Parameters<typeof buildTestIdentity>[0]> = {}) =>
    buildTestIdentity({
      file: path.join(root, 'src', 'auth', 'login.test.ts'),
      describes: [],
      title: 'logs in',
      startDir: root,
      ...over,
    });

  it('gives language, repository, the repo-relative file as scope and the title as name', () => {
    expect(build()).toEqual({
      language: 'js',
      repository: REPOSITORY,
      scope: ['src/auth/login.test.ts'],
      name: ['logs in'],
    });
    expect(warn).not.toHaveBeenCalled();
  });

  it('puts every describe title before the test title, outermost first', () => {
    expect(build({ describes: ['Auth', 'Session'] })?.name).toEqual(['Auth', 'Session', 'logs in']);
  });

  it('keeps titles raw: no lowercasing, no underscores, no splitting on "::"', () => {
    const identity = build({ describes: ['Auth :: Session'], title: 'Logs In  Twice' });

    expect(identity?.name).toEqual(['Auth :: Session', 'Logs In  Twice']);
  });

  it('removes the trailing (Tiden ID: N) marker from the test title', () => {
    expect(build({ title: 'logs in (Tiden ID: 42)' })?.name).toEqual(['logs in']);
    expect(build({ title: 'logs in (Tiden ID: 1,2)' })?.name).toEqual(['logs in']);
  });

  it('gives the same name with and without the marker, so adding an id does not fork history', () => {
    expect(build({ title: 'logs in (Tiden ID: 42)' })).toEqual(build({ title: 'logs in' }));
  });

  it('does not strip a marker from a describe title', () => {
    expect(build({ describes: ['Auth (Tiden ID: 7)'] })?.name).toEqual(['Auth (Tiden ID: 7)', 'logs in']);
  });

  it('drops an anonymous describe and keeps the rest of the path', () => {
    expect(build({ describes: ['Auth', '', 'Session'] })?.name).toEqual(['Auth', 'Session', 'logs in']);
  });

  it('sends nothing for a test with no title, and does not warn about it', () => {
    expect(build({ title: '' })).toBeUndefined();
    expect(build({ title: '(Tiden ID: 3)' })).toBeUndefined();
    expect(warn).not.toHaveBeenCalled();
  });

  it('turns a Windows-style path into a POSIX scope', () => {
    const windows = `${root}\\src\\auth\\login.test.ts`;

    expect(build({ file: windows })?.scope).toEqual(['src/auth/login.test.ts']);
  });

  it('measures the file from the repository root, not from the start directory', () => {
    const nested = path.join(root, 'packages', 'web');
    fs.mkdirSync(nested, { recursive: true });

    const identity = build({
      file: path.join(nested, 'src', 'a.test.ts'),
      startDir: nested,
    });

    expect(identity?.scope).toEqual(['packages/web/src/a.test.ts']);
  });

  it('sends no identity for a file outside the repository root, and warns once for the process', () => {
    const outside = '/somewhere/else/a.test.ts';

    expect(build({ file: outside })).toBeUndefined();
    expect(build({ file: outside })).toBeUndefined();
    expect(build({ file: '/another/b.test.ts' })).toBeUndefined();

    expect(warn).toHaveBeenCalledTimes(1);
    expect(warnings()[0]).toContain('outside the repository root');
  });

  it('sends no identity for a test with no file', () => {
    expect(build({ file: undefined })).toBeUndefined();
    expect(warn).toHaveBeenCalledTimes(1);
  });

  it('sends no identity when no repository resolves, and warns once for the process', () => {
    Reflect.deleteProperty(process.env, REPOSITORY_ENV);
    resetRepositoryContext();
    // A checkout whose config has no origin: root found, repository not.
    fs.writeFileSync(path.join(root, '.git', 'config'), '[core]\n\tbare = false\n');

    expect(build()).toBeUndefined();
    expect(build({ title: 'another test' })).toBeUndefined();

    expect(warn).toHaveBeenCalledTimes(1);
    expect(warnings()[0]).toContain('TIDEN_REPOSITORY');
  });

  it('sends no identity when there is no .git above the working directory', () => {
    const bare = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'tiden-nogit-')));
    try {
      expect(build({ file: path.join(bare, 'a.test.ts'), startDir: bare })).toBeUndefined();
      expect(warn).toHaveBeenCalledTimes(1);
    } finally {
      fs.rmSync(bare, { recursive: true, force: true });
    }
  });
});
