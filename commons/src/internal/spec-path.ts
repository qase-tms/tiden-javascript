import * as fs from 'fs';
import * as path from 'path';

import { EnvEnum } from '../env/env-enum';

/**
 * Normalizes an absolute spec-file path to a project-relative one, for use as
 * the leading segment of a case signature.
 *
 * Kept as a SINGLE segment with its slashes intact — it is not split on `/`.
 * That matches Playwright's `titlePath()` (which yields the spec file as one
 * element) and the app-side vitest CI transform, so a case reported by the
 * reporter and the same case reported by CI resolve to one identity.
 *
 * Path-shaped only: no filesystem access, and an id that does not live under
 * `cwd` (a Vite virtual module, for instance) is returned unchanged rather
 * than forced into a relative form.
 */
const SLASH = '/'.charCodeAt(0);

export function normalizeSpecPath(fullPath: string, cwd: string = process.cwd()): string {
  const normalized = fullPath.replace(/\\/g, '/');
  const root = rootPrefix(cwd);
  return normalized.startsWith(root) ? normalized.slice(root.length) : normalized;
}

/**
 * The root as a `/`-terminated prefix, with any trailing slashes collapsed to
 * exactly one.
 *
 * Trimmed by scanning rather than with `/\/+$/`: that pattern backtracks
 * quadratically on a root of many slashes, and the root can come from
 * configuration (`rootDir` / `TIDEN_ROOT_DIR`). Same class of defect as the
 * step-marker parser fixed in commons 0.1.1 — keep this regex-free.
 */
function rootPrefix(cwd: string): string {
  const normalized = cwd.replace(/\\/g, '/');
  let end = normalized.length;
  while (end > 0 && normalized.charCodeAt(end - 1) === SLASH) {
    end -= 1;
  }
  return normalized.slice(0, end) + '/';
}


/**
 * The base a spec-file segment is resolved against, in precedence order:
 * an explicit `rootDir` option, then `TIDEN_ROOT_DIR`, then undefined
 * (meaning `normalizeSpecPath` falls back to `process.cwd()`).
 *
 * Env is read here rather than through the usual config pipeline because that
 * pipeline merges env inside `OptionsResolver`, whose result never reaches a
 * framework reporter — so a framework-side setting would silently ignore its
 * own environment variable.
 */
export function resolveRootDir(explicit?: string | undefined): string | undefined {
  const fromEnv = process.env[EnvEnum.rootDir];
  return explicit ?? (fromEnv !== undefined && fromEnv !== '' ? fromEnv : undefined);
}

/**
 * The repo-relative source file of a test, for the `file_path` result field.
 *
 * Held to a stricter standard than `normalizeSpecPath`, which returns a path
 * outside the root unchanged. `file_path` is the key the server joins a
 * requirement's repo-relative `repo_file` anchors against, so an absolute
 * machine path — or a virtual module id — can never match one: reporting it
 * yields a field that looks like a join key and silently never joins.
 * `undefined` means "omit the field", and the caller warns. Omitting is not
 * fabricating; it is what the Go CLI's filemap and the PHPUnit reporter's
 * FilePathResolver already do.
 *
 * Unlike `normalizeSpecPath` this is NOT purely path-shaped, because the root
 * is user-supplied and three plausible spellings of the same directory would
 * otherwise turn the feature off for a whole run:
 *   - a RELATIVE root (`..`, `.`, `''` from a config file) matches no absolute
 *     test path, so every file is omitted and the warning tells the user to set
 *     the variable they just set. Resolved against cwd.
 *   - UNNORMALIZED segments (`/repo/tests/../src/a.ts`) pass through verbatim
 *     and can never match an anchor. Collapsed.
 *   - a SYMLINKED root — `/tmp/checkout` on macOS while the runner emits
 *     `/private/tmp/checkout/...` — mismatches as a string. Compared again via
 *     realpath, and only when the plain comparison already failed, so the happy
 *     path touches the filesystem at most once per distinct root.
 * `repos/phpunit`'s FilePathResolver calls realpath() on both sides for exactly
 * the macOS /tmp reason; this brings the JS rule in line with it.
 *
 * Deliberately NOT applied to `normalizeSpecPath`/`resolveRootDir`: those feed
 * the case SIGNATURE, and changing how a root resolves would change the file
 * segment of every signature computed under a relative or symlinked root —
 * forking the history of every case already reported under the old spelling.
 * A join key can be corrected; an identity cannot.
 *
 * Note what this still cannot detect: a path that resolves cleanly against the
 * WRONG root. Playwright run from `tests/api` with no `TIDEN_ROOT_DIR` yields
 * `Tests/v1/x.api.spec.ts` — well-formed, matching no anchor. Set
 * `rootDir`/`TIDEN_ROOT_DIR` to the repository root wherever the runner's cwd
 * is not already it.
 */
export function resolveFilePath(fullPath: string, root: string = process.cwd()): string | undefined {
  const file = collapse(fullPath);
  const base = collapse(absoluteRoot(root));

  const direct = relativeUnder(file, base);
  if (direct !== undefined) {
    return direct;
  }

  // Only now pay for the filesystem: a symlinked root (or file) is the one
  // remaining way two spellings of the same location can differ as strings.
  const realBase = collapse(realPathOrSelf(base));
  const realFile = collapse(realPathOrSelf(file));
  if (realBase === base && realFile === file) {
    return undefined;
  }
  return relativeUnder(realFile, realBase);
}

/** `full` expressed relative to `base`, or undefined when it is not under it. */
function relativeUnder(full: string, base: string): string | undefined {
  const prefix = rootPrefix(base);
  if (!full.startsWith(prefix)) {
    return undefined;
  }
  const relative = full.slice(prefix.length);
  return relative === '' ? undefined : relative;
}

/**
 * Backslashes to forward slashes, then `.`/`..` segments collapsed.
 * `path.posix` regardless of host: the string is already slash-normalized, and
 * a Windows path handed to a POSIX runner (or the reverse) must collapse the
 * same way for the fixtures to mean anything.
 */
function collapse(value: string): string {
  return path.posix.normalize(value.replace(/\\/g, '/'));
}

/**
 * A relative root resolved against cwd; an already-absolute one left alone.
 *
 * `path.resolve` is host-aware, so it cannot be applied unconditionally: on a
 * POSIX runner it would turn the absolute Windows root `C:/repo` into
 * `<cwd>/C:/repo`. The drive-letter test keeps that spelling absolute on both
 * hosts. An empty root is relative by this test, so it resolves to cwd — which
 * is what `normalizeSpecPath` already does with a falsy root, and closes the
 * gap where `""` reported the absolute path minus its leading slash.
 */
function absoluteRoot(root: string): string {
  const slashed = root.replace(/\\/g, '/');
  return isAbsoluteLike(slashed) ? slashed : path.resolve(root);
}

function isAbsoluteLike(value: string): boolean {
  return value.charCodeAt(0) === SLASH || /^[A-Za-z]:\//.test(value);
}

/** realpath, memoized per input; the input itself when it does not resolve. */
const realPathCache = new Map<string, string>();

function realPathOrSelf(value: string): string {
  const cached = realPathCache.get(value);
  if (cached !== undefined) {
    return cached;
  }
  let resolved = value;
  try {
    resolved = fs.realpathSync(value);
  } catch {
    // Not on disk (a virtual module id, a deleted file, a root that does not
    // exist). The raw string is the honest answer — same fall-back the PHP
    // resolver takes when realpath() returns false.
  }
  realPathCache.set(value, resolved);
  return resolved;
}

/**
 * Whether a `file_path` the TEST set for itself could ever match a requirement
 * anchor.
 *
 * The reporters keep a test-provided `file_path` — it may deliberately name the
 * source file under test rather than the spec's own location — but the value is
 * held to the same standard a derived one is: anchors are repo-relative, so an
 * absolute path, an empty string, or one that escapes the root is unlinkable by
 * construction. Keeping such a value would let a hand-written field do the one
 * thing the resolver refuses to do, which is fabricate a link that never joins.
 *
 * This deliberately does NOT decide the larger question of whether a test
 * should be able to override `file_path` at all — `tiden-phpunit-reporter`'s
 * AttributeReader drops a hand-written `#[Field('file_path')]` outright. That
 * divergence is a product decision, recorded in the PR, not settled here.
 */
export function isUsableFilePath(value: string): boolean {
  const collapsed = collapse(value);
  if (collapsed === '' || collapsed === '.' || collapsed === '..') {
    return false;
  }
  if (isAbsoluteLike(collapsed)) {
    return false;
  }
  return !collapsed.startsWith('../');
}
