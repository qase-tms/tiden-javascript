import type { TestIdentity } from '../models/test-identity';
import { resolveRepositoryContext } from './repository';
import { resolveFilePath } from './spec-path';
import { removeTidenIdsFromTitle } from './title';

/** The language token of every JavaScript reporter. */
export const JS_IDENTITY_LANGUAGE = 'js';

let warned = false;

/** Forget that a warning was printed. For tests; a real run never needs it. */
export function resetIdentityWarning(): void {
  warned = false;
}

/**
 * The identity parts of one test: the repository, the repo-relative POSIX
 * file as scope, and the raw describe titles plus the test title as name.
 *
 * Titles are not lowercased, underscored or otherwise rewritten: the server
 * builds the key from them, and a reporter-side normalizer is exactly what
 * made jest and vitest disagree about one test. The trailing
 * `(Tiden ID: N)` marker is the one thing removed from the test title; it is
 * an explicit id, not part of the name, and adding one must not fork the
 * test's history.
 *
 * `undefined` means "send no identity": no repository could be resolved, or
 * the file is not under the repository root, or the test has no title. The
 * legacy `signature` still identifies the test then. One warning per process
 * names the first cause; a warning per test would bury the run log.
 *
 * @param startDir where to start looking for `.git`; defaults to `process.cwd()`.
 */
export function buildTestIdentity(args: {
  file: string | undefined;
  describes: readonly string[];
  title: string;
  startDir?: string | undefined;
}): TestIdentity | undefined {
  const title = removeTidenIdsFromTitle(args.title);
  if (title === '') {
    return undefined;
  }
  const context = resolveRepositoryContext(args.startDir);

  if (!context.repository) {
    warnOnce(
      'no repository was found. Set TIDEN_REPOSITORY, run in CI with the standard '
      + 'repository variables, or run inside a git checkout with an "origin" remote.',
    );
    return undefined;
  }
  if (!context.root) {
    warnOnce('no .git directory was found above the working directory, so test files cannot be made repo-relative.');
    return undefined;
  }
  const scope = args.file ? resolveFilePath(args.file, context.root) : undefined;
  if (scope === undefined) {
    warnOnce(
      `${args.file ?? 'a test with no file'} is outside the repository root (${context.root}).`,
    );
    return undefined;
  }

  return {
    language: JS_IDENTITY_LANGUAGE,
    repository: context.repository,
    scope: [scope],
    // An anonymous `describe('')` is not a level of the name. Playwright's
    // own titlePath() drops it, and every framework must agree.
    name: [...args.describes.filter((describe) => describe !== ''), title],
  };
}

function warnOnce(reason: string): void {
  if (warned) {
    return;
  }
  warned = true;
  console.warn(
    `tiden: not sending test identity — ${reason} `
    + 'Results are still reported, matched by their signature only. '
    + '(Reported once per process.)',
  );
}
