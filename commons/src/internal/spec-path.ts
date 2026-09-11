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
 * Note what this CANNOT detect: a path that resolves cleanly against the wrong
 * root. Playwright run from `tests/api` with no `TIDEN_ROOT_DIR` yields
 * `Tests/v1/x.api.spec.ts`, which is well-formed and matches no anchor. Set
 * `rootDir`/`TIDEN_ROOT_DIR` to the repository root wherever the runner's cwd
 * is not already it.
 */
export function resolveFilePath(fullPath: string, root: string = process.cwd()): string | undefined {
  const normalized = fullPath.replace(/\\/g, '/');
  const prefix = rootPrefix(root);
  if (!normalized.startsWith(prefix)) {
    return undefined;
  }
  const relative = normalized.slice(prefix.length);
  return relative === '' ? undefined : relative;
}
