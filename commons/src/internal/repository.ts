import * as fs from 'fs';
import * as path from 'path';

/** Explicit override. Wins over every CI variable and over `.git/config`. */
export const REPOSITORY_ENV = 'TIDEN_REPOSITORY';

export interface RepositoryContext {
  /** The raw remote, exactly as found. The server normalizes it. */
  repository: string | undefined;
  /** The nearest ancestor of the start directory that contains `.git`. */
  root: string | undefined;
  /**
   * The commit checked out at the root: git HEAD, followed through its ref.
   * Only ever read from `.git`; `TIDEN_BUILD_SHA` is handled by the config.
   */
  headSha: string | undefined;
}

const SLASH = '/'.charCodeAt(0);

/**
 * Resolved once per process and start directory. The answer cannot change
 * while a test run is in flight, and every result of a run asks for it.
 */
const cache = new Map<string, RepositoryContext>();

/**
 * The repository a test run belongs to and the directory its files are
 * measured from.
 *
 * Repository, first match wins:
 *   1. `TIDEN_REPOSITORY`
 *   2. CI environment: `GITHUB_SERVER_URL` + `GITHUB_REPOSITORY`,
 *      `CI_SERVER_URL` + `CI_PROJECT_PATH`, `BITBUCKET_GIT_HTTP_ORIGIN`,
 *      `BUILD_REPOSITORY_URI`
 *   3. the `origin` URL in the `.git/config` of the repository root
 *
 * Root: the nearest ancestor of `startDir` (default `process.cwd()`) that
 * contains `.git`. A directory, or a file that points to the real git
 * directory (worktrees and submodules).
 *
 * Head SHA: `HEAD` of that git directory. A detached HEAD holds the SHA
 * itself; a symbolic one names a ref, read from its loose file or from
 * `packed-refs`. Undefined on an unborn branch or anything unreadable.
 *
 * No subprocess: `git` may be missing from a CI image, and spawning it for
 * every test run costs more than reading one small file. The value is not
 * normalized here; the server owns that rule, so a reporter can never drift
 * from it.
 */
export function resolveRepositoryContext(startDir?: string): RepositoryContext {
  const start = path.resolve(startDir ?? process.cwd());
  const cached = cache.get(start);
  if (cached) {
    return cached;
  }
  const found = findGitEntry(start);
  const dirs = found ? gitDirs(found.dotGit) : undefined;
  const context: RepositoryContext = {
    repository: repositoryFromEnv(process.env) ?? (dirs ? repositoryFromGit(dirs) : undefined),
    root: found?.root,
    headSha: dirs ? headShaFromGit(dirs) : undefined,
  };
  cache.set(start, context);
  return context;
}

/** Forget every resolved context. For tests; a real run never needs it. */
export function resetRepositoryContext(): void {
  cache.clear();
}

function repositoryFromEnv(env: NodeJS.ProcessEnv): string | undefined {
  const value = (name: string): string | undefined => {
    const raw = env[name]?.trim();
    return raw ? raw : undefined;
  };

  const explicit = value(REPOSITORY_ENV);
  if (explicit) {
    return explicit;
  }

  const pairs: [string, string][] = [
    ['GITHUB_SERVER_URL', 'GITHUB_REPOSITORY'],
    ['CI_SERVER_URL', 'CI_PROJECT_PATH'],
  ];
  for (const [serverName, repoName] of pairs) {
    const server = value(serverName);
    const repo = value(repoName);
    if (server && repo) {
      return `${trimTrailingSlashes(server)}/${repo}`;
    }
  }

  return value('BITBUCKET_GIT_HTTP_ORIGIN') ?? value('BUILD_REPOSITORY_URI');
}

/** Scanned, not `/\/+$/`: that pattern backtracks quadratically (see spec-path.ts). */
function trimTrailingSlashes(value: string): string {
  let end = value.length;
  while (end > 0 && value.charCodeAt(end - 1) === SLASH) {
    end -= 1;
  }
  return value.slice(0, end);
}

interface GitEntry {
  root: string;
  dotGit: string;
}

function findGitEntry(start: string): GitEntry | undefined {
  let dir = start;
  for (;;) {
    const dotGit = path.join(dir, '.git');
    if (exists(dotGit)) {
      return { root: dir, dotGit };
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      return undefined;
    }
    dir = parent;
  }
}

function exists(candidate: string): boolean {
  try {
    const stat = fs.statSync(candidate);
    return stat.isDirectory() || stat.isFile();
  } catch {
    return false;
  }
}

interface GitDirs {
  /** Where this checkout's own HEAD lives. */
  gitDir: string;
  /** Where the config, branches and `packed-refs` live. */
  commonDir: string;
}

function gitDirs(dotGit: string): GitDirs | undefined {
  const gitDir = resolveGitDir(dotGit);
  if (!gitDir) {
    return undefined;
  }
  // A linked worktree keeps its own HEAD and index in `<main>/.git/worktrees/<n>`
  // but shares the remotes and branches with the main repository, named by
  // `commondir`.
  const commonDir = readTrimmed(path.join(gitDir, 'commondir'));
  return { gitDir, commonDir: commonDir ? path.resolve(gitDir, commonDir) : gitDir };
}

function repositoryFromGit({ commonDir }: GitDirs): string | undefined {
  const config = readText(path.join(commonDir, 'config'));
  return config === undefined ? undefined : originUrl(config);
}

/** SHA-1, or SHA-256 for a repository created with `--object-format=sha256`. */
const OBJECT_ID = /^(?:[0-9a-f]{40}|[0-9a-f]{64})$/i;

const SYMREF_PREFIX = 'ref:';

/** More than any real chain (HEAD → branch); stops a ref cycle. */
const MAX_SYMREF_DEPTH = 5;

function headShaFromGit(dirs: GitDirs): string | undefined {
  let value = readTrimmed(path.join(dirs.gitDir, 'HEAD'));
  for (let depth = 0; value !== undefined && depth < MAX_SYMREF_DEPTH; depth += 1) {
    if (!value.startsWith(SYMREF_PREFIX)) {
      return OBJECT_ID.test(value) ? value : undefined;
    }
    const ref = value.slice(SYMREF_PREFIX.length).trim();
    if (!ref.startsWith('refs/')) {
      return undefined;
    }
    value = readRef(dirs, ref);
  }
  return undefined;
}

/**
 * A ref's value: its loose file, else its line in `packed-refs`. Per-worktree
 * refs sit in the worktree's own git directory, shared ones in the common one.
 */
function readRef({ gitDir, commonDir }: GitDirs, ref: string): string | undefined {
  for (const dir of gitDir === commonDir ? [gitDir] : [gitDir, commonDir]) {
    const loose = readTrimmed(path.join(dir, ref));
    if (loose) {
      return loose;
    }
  }
  return packedRef(commonDir, ref);
}

/** `<sha> <ref>` lines; `#` opens the header, `^` a peeled tag target. */
function packedRef(commonDir: string, ref: string): string | undefined {
  const packed = readText(path.join(commonDir, 'packed-refs'));
  if (packed === undefined) {
    return undefined;
  }
  for (const raw of packed.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#') || line.startsWith('^')) {
      continue;
    }
    const space = line.indexOf(' ');
    if (space > 0 && line.slice(space + 1).trim() === ref) {
      return line.slice(0, space);
    }
  }
  return undefined;
}

/** `.git` as a directory is the git directory; as a file it holds `gitdir: <path>`. */
function resolveGitDir(dotGit: string): string | undefined {
  try {
    if (fs.statSync(dotGit).isDirectory()) {
      return dotGit;
    }
  } catch {
    return undefined;
  }
  const content = readTrimmed(dotGit);
  const prefix = 'gitdir:';
  if (content === undefined || !content.startsWith(prefix)) {
    return undefined;
  }
  const target = content.slice(prefix.length).trim();
  return target ? path.resolve(path.dirname(dotGit), target) : undefined;
}

function readText(file: string): string | undefined {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch {
    return undefined;
  }
}

function readTrimmed(file: string): string | undefined {
  const text = readText(file);
  return text === undefined ? undefined : (text.split(/\r?\n/, 1)[0] ?? '').trim();
}

const ORIGIN_SECTION = /^\[\s*remote\s+"origin"\s*\]/i;

/** The first `url` of `[remote "origin"]` in a git config file. */
function originUrl(config: string): string | undefined {
  let inOrigin = false;
  for (const raw of config.split(/\r?\n/)) {
    const line = raw.trim();
    if (line.startsWith('[')) {
      inOrigin = ORIGIN_SECTION.test(line);
      continue;
    }
    if (!inOrigin || line.startsWith('#') || line.startsWith(';')) {
      continue;
    }
    const eq = line.indexOf('=');
    if (eq < 0 || line.slice(0, eq).trim().toLowerCase() !== 'url') {
      continue;
    }
    const value = unquote(line.slice(eq + 1).trim());
    if (value) {
      return value;
    }
  }
  return undefined;
}

function unquote(value: string): string {
  return value.length >= 2 && value.startsWith('"') && value.endsWith('"')
    ? value.slice(1, -1)
    : value;
}
