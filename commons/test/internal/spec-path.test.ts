import fs from 'fs';
import os from 'os';
import path from 'path';

import { isUsableFilePath, normalizeSpecPath, resolveFilePath, resolveRootDir } from '../../src/internal/spec-path';

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

describe('resolveFilePath', () => {
  it('makes an absolute path root-relative', () => {
    expect(resolveFilePath('/repo/tests/api/Tests/v1/m.api.spec.ts', '/repo'))
      .toBe('tests/api/Tests/v1/m.api.spec.ts');
  });

  it('normalizes Windows separators', () => {
    expect(resolveFilePath('C:\\repo\\src\\a.test.ts', 'C:\\repo')).toBe('src/a.test.ts');
  });

  it('tolerates trailing slashes on the root without backtracking', () => {
    expect(resolveFilePath('/repo/src/a.test.ts', '/repo' + '/'.repeat(5000)))
      .toBe('src/a.test.ts');
  });

  // The whole point of not reusing normalizeSpecPath: an absolute path that
  // escaped the root can never match a repo-relative anchor, so it must be
  // omitted rather than reported as a join key that never joins.
  it('omits a path outside the root instead of returning it unchanged', () => {
    expect(resolveFilePath('/elsewhere/a.test.ts', '/repo')).toBeUndefined();
    expect(normalizeSpecPath('/elsewhere/a.test.ts', '/repo')).toBe('/elsewhere/a.test.ts');
  });

  it('omits a virtual module id', () => {
    expect(resolveFilePath('virtual:generated-tests', '/repo')).toBeUndefined();
  });

  it('does not treat a sibling directory sharing the root prefix as inside it', () => {
    expect(resolveFilePath('/repo-other/a.test.ts', '/repo')).toBeUndefined();
  });

  it('omits the root itself, which relativizes to an empty path', () => {
    expect(resolveFilePath('/repo', '/repo')).toBeUndefined();
    expect(resolveFilePath('/repo/', '/repo')).toBeUndefined();
  });

  // A relative root is what a monorepo sub-package naturally writes, and it
  // used to match NO absolute test path -- omitting every file for the whole
  // run while the warning told the user to set the variable they had just set.
  it('resolves a relative root against cwd, matching the absolute spelling', () => {
    const file = `${process.cwd()}/src/a.test.ts`;
    expect(resolveFilePath(file, '.')).toBe('src/a.test.ts');
    expect(resolveFilePath(file, process.cwd())).toBe('src/a.test.ts');
    expect(resolveFilePath(file, '..')).toBe(`${path.basename(process.cwd())}/src/a.test.ts`);
  });

  // '' is accepted by the config schema and reached rootPrefix('') === '/',
  // which reported the absolute machine path minus its leading slash -- a
  // well-formed key that can never join, which is what this function exists
  // to prevent.
  it('treats an empty root as cwd, never as the filesystem root', () => {
    expect(resolveFilePath('/Users/me/repo/src/a.test.ts', '')).toBeUndefined();
    expect(resolveFilePath(`${process.cwd()}/src/a.test.ts`, '')).toBe('src/a.test.ts');
  });

  it('collapses . and .. segments in the file path', () => {
    expect(resolveFilePath('/repo/tests/../src/a.ts', '/repo')).toBe('src/a.ts');
    expect(resolveFilePath('/repo/./src/a.ts', '/repo')).toBe('src/a.ts');
  });

  it('collapses . and .. segments in the root', () => {
    expect(resolveFilePath('/repo/src/a.ts', '/repo/tests/..')).toBe('src/a.ts');
  });

  // The macOS case the PHPUnit FilePathResolver names in its own comment:
  // TIDEN_ROOT_DIR=/tmp/x while the runner emits /private/tmp/x/...
  it('matches a symlinked root against its real path, in both directions', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tiden-spec-path-'));
    try {
      fs.mkdirSync(path.join(dir, 'src'));
      fs.writeFileSync(path.join(dir, 'src/a.test.ts'), '');
      const real = fs.realpathSync(dir);
      if (real === dir) {
        // No symlink on this platform's tmpdir; nothing to assert.
        expect(resolveFilePath(`${dir}/src/a.test.ts`, dir)).toBe('src/a.test.ts');
        return;
      }
      expect(resolveFilePath(`${real}/src/a.test.ts`, dir)).toBe('src/a.test.ts');
      expect(resolveFilePath(`${dir}/src/a.test.ts`, real)).toBe('src/a.test.ts');
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it('still omits a path that is genuinely outside a realpath-resolved root', () => {
    expect(resolveFilePath('/definitely/not/here/a.test.ts', process.cwd())).toBeUndefined();
  });
});

describe('isUsableFilePath', () => {
  it('accepts a repo-relative path, which is what an anchor is', () => {
    expect(isUsableFilePath('src/a.ts')).toBe(true);
    expect(isUsableFilePath('app/Services/Milestone.php')).toBe(true);
    expect(isUsableFilePath('./src/a.ts')).toBe(true);
  });

  // Anchors are repo-relative, so these can never join — keeping one would let
  // a hand-written field do what the resolver refuses to do.
  it('rejects a value that could never match an anchor', () => {
    expect(isUsableFilePath('/abs/a.ts')).toBe(false);
    expect(isUsableFilePath('C:/x/a.ts')).toBe(false);
    expect(isUsableFilePath('')).toBe(false);
    expect(isUsableFilePath('.')).toBe(false);
    expect(isUsableFilePath('..')).toBe(false);
    expect(isUsableFilePath('../outside/a.ts')).toBe(false);
  });

  it('judges the collapsed form, not the spelling', () => {
    expect(isUsableFilePath('src/../a.ts')).toBe(true);
    expect(isUsableFilePath('src/../../a.ts')).toBe(false);
  });
});
