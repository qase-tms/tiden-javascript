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
