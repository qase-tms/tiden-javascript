import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { resolveBranch, resolveBuildSha } from '../../src/utils/build-sha';

const A = 'a'.repeat(40);
const B = 'b'.repeat(40);

function repo(): { dir: string; head: string } {
  const dir = mkdtempSync(join(tmpdir(), 'tiden-sha-'));
  const run = (...a: string[]) => execFileSync('git', a, { cwd: dir, encoding: 'utf8' }).trim();
  run('init', '-q', '-b', 'feature-x');
  writeFileSync(join(dir, 'f'), 'x');
  run('add', 'f');
  run('-c', 'user.name=t', '-c', 'user.email=t@t', 'commit', '-q', '-m', 'c');
  return { dir, head: run('rev-parse', 'HEAD') };
}

describe('resolveBuildSha', () => {
  const { dir, head } = repo();
  const empty = mkdtempSync(join(tmpdir(), 'tiden-nogit-'));

  it('prefers TIDEN_BUILD_SHA over GITHUB_SHA and git', () => {
    expect(resolveBuildSha({ TIDEN_BUILD_SHA: A, GITHUB_SHA: B }, dir)).toBe(A);
  });

  it('falls back to GITHUB_SHA, then git HEAD', () => {
    expect(resolveBuildSha({ GITHUB_SHA: B }, dir)).toBe(B);
    expect(resolveBuildSha({}, dir)).toBe(head);
  });

  it('ignores a malformed GITHUB_SHA', () => {
    expect(resolveBuildSha({ GITHUB_SHA: 'not-a-sha' }, dir)).toBe(head);
  });

  it('returns undefined, not an empty string, with no env and no git', () => {
    expect(resolveBuildSha({}, empty)).toBeUndefined();
  });

  it('treats an empty TIDEN_BUILD_SHA as an opt-out of the fallbacks', () => {
    expect(resolveBuildSha({ TIDEN_BUILD_SHA: '', GITHUB_SHA: B }, dir)).toBeUndefined();
  });
});

describe('resolveBranch', () => {
  const { dir } = repo();
  const empty = mkdtempSync(join(tmpdir(), 'tiden-nogit-'));

  it('prefers GITHUB_HEAD_REF, then GITHUB_REF_NAME, then git', () => {
    expect(resolveBranch({ GITHUB_HEAD_REF: 'pr-1', GITHUB_REF_NAME: 'main' }, dir)).toBe('pr-1');
    expect(resolveBranch({ GITHUB_REF_NAME: 'main' }, dir)).toBe('main');
    expect(resolveBranch({}, dir)).toBe('feature-x');
  });

  it('returns undefined with no env and no git', () => {
    expect(resolveBranch({}, empty)).toBeUndefined();
  });
});
