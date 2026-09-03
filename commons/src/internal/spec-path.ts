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
