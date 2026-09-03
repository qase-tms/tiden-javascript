import { normalizeSpecPath, resolveRootDir } from '../../src/internal/spec-path';

describe('normalizeSpecPath', () => {
  it('makes an absolute path project-relative', () => {
    expect(normalizeSpecPath('/repo/src/a.test.ts', '/repo')).toBe('src/a.test.ts');
  });

  it('keeps slashes intact — the result is ONE signature segment', () => {
    expect(normalizeSpecPath('/repo/src/deep/a.test.ts', '/repo')).toBe('src/deep/a.test.ts');
  });

  it('normalizes Windows separators', () => {
    expect(normalizeSpecPath('C:\\repo\\src\\a.test.ts', 'C:\\repo')).toBe('src/a.test.ts');
  });

  it('tolerates a trailing slash on the root', () => {
    expect(normalizeSpecPath('/repo/src/a.test.ts', '/repo/')).toBe('src/a.test.ts');
  });

  it('collapses many trailing slashes without backtracking', () => {
    // Trimmed by scanning, not with /\/+$/ — that pattern is quadratic on a
    // root of repeated slashes, and the root is configurable (TIDEN_ROOT_DIR).
    // CodeQL js/polynomial-redos flagged the regex form.
    expect(normalizeSpecPath('/repo/src/a.test.ts', '/repo' + '/'.repeat(5000)))
      .toBe('src/a.test.ts');
  });

  it('handles a root that is only slashes', () => {
    expect(normalizeSpecPath('/src/a.test.ts', '/'.repeat(64))).toBe('src/a.test.ts');
  });

  it('returns a path outside the root unchanged rather than forcing it relative', () => {
    expect(normalizeSpecPath('/elsewhere/a.test.ts', '/repo')).toBe('/elsewhere/a.test.ts');
  });

  it('returns a virtual module id unchanged', () => {
    expect(normalizeSpecPath('virtual:generated-tests', '/repo')).toBe('virtual:generated-tests');
  });

  it('does not treat a sibling directory sharing the root prefix as inside it', () => {
    expect(normalizeSpecPath('/repo-other/a.test.ts', '/repo')).toBe('/repo-other/a.test.ts');
  });
});

describe('resolveRootDir', () => {
  const KEY = 'TIDEN_ROOT_DIR';
  let saved: string | undefined;

  beforeEach(() => {
    saved = process.env[KEY];
    delete process.env[KEY];
  });

  afterEach(() => {
    if (saved === undefined) delete process.env[KEY];
    else process.env[KEY] = saved;
  });

  it('returns undefined when neither an option nor the env var is set', () => {
    expect(resolveRootDir()).toBeUndefined();
  });

  it('reads TIDEN_ROOT_DIR', () => {
    process.env[KEY] = '/repo';
    expect(resolveRootDir()).toBe('/repo');
  });

  it('prefers an explicit option over the env var', () => {
    process.env[KEY] = '/from-env';
    expect(resolveRootDir('/from-option')).toBe('/from-option');
  });

  it('treats an empty env var as unset, not as the filesystem root', () => {
    process.env[KEY] = '';
    expect(resolveRootDir()).toBeUndefined();
  });
});
