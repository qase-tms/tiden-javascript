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
export function normalizeSpecPath(fullPath: string, cwd: string = process.cwd()): string {
  const normalized = fullPath.replace(/\\/g, '/');
  const root = cwd.replace(/\\/g, '/').replace(/\/+$/, '') + '/';
  return normalized.startsWith(root) ? normalized.slice(root.length) : normalized;
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
