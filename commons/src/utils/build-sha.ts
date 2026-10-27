import { execFileSync } from 'node:child_process';

const SHA_PATTERN = /^[0-9a-f]{7,64}$/i;

type Env = Record<string, string | undefined>;

function git(args: string[], cwd: string): string | undefined {
  try {
    const out = execFileSync('git', args, {
      cwd,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
      timeout: 5000,
    }).trim();
    return out || undefined;
  } catch {
    return undefined; // no git binary, not a repository, or timeout
  }
}

function defaultCwd(env: Env): string {
  return env['TIDEN_ROOT_DIR'] || process.cwd();
}

/**
 * Resolves the commit SHA a run was built from, so by-SHA release gates have
 * evidence. Precedence: `TIDEN_BUILD_SHA`, then `GITHUB_SHA`, then
 * `git rev-parse HEAD`. Returns undefined (never an empty string) when none is
 * available; an explicitly empty `TIDEN_BUILD_SHA` opts out of the fallbacks,
 * like `--build-sha ""` in the CLI.
 */
export function resolveBuildSha(env: Env = process.env, cwd: string = defaultCwd(env)): string | undefined {
  const explicit = env['TIDEN_BUILD_SHA'];
  if (explicit !== undefined) {
    return explicit.trim() || undefined;
  }
  const fromCi = env['GITHUB_SHA']?.trim();
  if (fromCi && SHA_PATTERN.test(fromCi)) {
    return fromCi;
  }
  const fromGit = git(['rev-parse', 'HEAD'], cwd);
  return fromGit && SHA_PATTERN.test(fromGit) ? fromGit : undefined;
}

/**
 * Fallback branch when `TIDEN_BRANCH` / `run.branch` is not set:
 * `GITHUB_HEAD_REF` (pull requests), `GITHUB_REF_NAME`, then the checked-out
 * git branch (undefined on a detached HEAD).
 */
export function resolveBranch(env: Env = process.env, cwd: string = defaultCwd(env)): string | undefined {
  const fromCi = env['GITHUB_HEAD_REF']?.trim() || env['GITHUB_REF_NAME']?.trim();
  if (fromCi) {
    return fromCi;
  }
  const fromGit = git(['rev-parse', '--abbrev-ref', 'HEAD'], cwd);
  return fromGit && fromGit !== 'HEAD' ? fromGit : undefined;
}
