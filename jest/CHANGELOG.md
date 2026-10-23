# Changelog

## Unreleased

- **Every result now carries `identity`** next to the unchanged legacy `signature`:
  `{ language: "js", repository, scope: [<repo-relative POSIX file>], name: [...describe titles, test title] }`.
  Titles are raw, not lowercased or underscored, and the `(Tiden ID: N)` marker is removed from the
  test title, so adding an id to a test does not fork its history. A describe's title and a test's title come from jest's `ancestorTitles` and `title`.
- **It needs a repository.** `TIDEN_REPOSITORY`, then the CI variables, then the `origin` URL in
  `.git/config`; the file must be under the repository root (the nearest ancestor with `.git`).
  Otherwise no `identity` is sent and one warning is printed per process; results are still
  reported, matched by signature only.
- A server that does not know `identity` yet answers 400 `unknown field "identity"`; the batch is
  resent without it and the reporter stops sending it.
- The run's `clientMeta` carries `gitRepository`.
- The file-anchor warnings say "spec", the product's new name for what it used to call a
  requirement: `this test cannot be linked to a spec by file anchor`, and an absolute or
  escaping `file_path` "could never match a spec anchor", so the path is derived from the test
  file instead. Wording only; `fields.file_path` and the warning conditions are unchanged.

## 0.3.0

- **Every result now carries `fields.file_path`**, the repo-relative source file of the test —
  the key the server joins a requirement's `repo_file` anchors against. Until now no JS reporter
  set it (only the Go CLI and the PHPUnit reporter did), so a case reported from here could not
  be linked to a requirement by file anchor at all.
- **It depends entirely on `rootDir` / `TIDEN_ROOT_DIR`.** The path is resolved against that
  root; set it to the repository root wherever the runner's cwd is not already it. A file that
  does not resolve under the root omits the field rather than reporting an absolute machine path
  that could never match an anchor, and warns once per file on stderr:
  `tiden: <file> is outside the reporting root, omitting file_path`.
- **A `file_path` the test sets for itself still wins** — it may deliberately name the source
  file under test — but it is held to the same standard a derived one is. An absolute or
  escaping value is replaced by the derived path, with a warning, since keeping it would
  fabricate a link that never joins.

## 0.2.0

- **`rootDir` / `TIDEN_ROOT_DIR`** sets the base the spec-file segments of a `signature` are
  resolved against (default `process.cwd()`, the previous fixed behaviour). Set it when jest runs
  from a sub-package but another producer reports the same tests from the repo root — every
  producer reporting into one product must measure the file from the same root, or one test
  becomes two cases. It applies to the reported suite path as well.
- Not a breaking change: identity is unchanged unless `rootDir` or `TIDEN_ROOT_DIR` is set.
- Only the base is configurable. This reporter still splits the file on `/` into one segment per
  directory (`app::src::a.test.ts::…`) while `@tiden/vitest-reporter` keeps it whole
  (`app/src/a.test.ts::…`). The shapes are per-reporter and must not be carried across.
- `normalizePath` now delegates to commons' `normalizeSpecPath`; its default behaviour, including
  Windows separator handling, is unchanged.
- **Says why it disabled itself.** A reporter that resolves to `off` used to go completely quiet,
  which is indistinguishable from one that is working: the suite runs, the tests pass, and nothing
  reaches Tiden. Every disabling branch now logs the reason and the way out, naming the settings
  `tiden` mode requires. (The fix is in `@tiden/reporter-commons`; it surfaces through this
  reporter.)

## 0.1.1

- No code changes. Requires `@tiden/reporter-commons` `^0.1.1`, which fixes a polynomial ReDoS
  in the step-marker parser this reporter feeds through `tiden.step()` — see the
  [commons changelog](../commons/CHANGELOG.md).

## 0.1.0

Initial Tiden fork release of `@tiden/jest-reporter`.

- Forked from [`jest-qase-reporter`](https://github.com/qase-tms/qase-javascript) at commit
  [`d77a157`](https://github.com/qase-tms/qase-javascript/commit/d77a157020fea088ea323050a36b9bf874ad089d)
  (Apache-2.0); wire transport retargeted from Qase TestOps to Tiden's Test Runs API.
- **Case identity and result ids match the Playwright and Vitest reporters from day one.**
  `signature` is built by commons' `generateSignature(caseIds | null, structuralPath)` — spec file
  path, `describe` chain, leaf title, param-free — and the reported `id` is a generated `uuidv4()`,
  never a Jest identifier, because it is the API's idempotency key and is validated as a UUID.
  **Do not revert either on an upstream re-sync**; see the comments in `src/result-builder.ts`.
- **Config precedence inverted from upstream** to match the sibling reporters: environment
  variables > `tiden.config.json` > `jest.config.js` reporter options.
- Multi-project (`testops_multi`) reporting dropped, consistent with the Playwright and Vitest
  ports.
- Skipped and `todo` specs, which bypass Jest's per-test hooks, are swept from the file-level
  result and reported exactly once. Upstream never reports `todo` and reports `test.skip` twice.
- Publishes exactly once across `onRunComplete` (Jest <= 29) and `onRunnerEnd` (Jest 30), and
  returns an awaitable promise so the upload cannot race process exit.
- Failures with no matcher result now report their real error message instead of the literal
  `Runtime exception`, so a bare `throw new Error(...)` arrives with its actual text. Status
  classification is unchanged and stays commons' shared rule — assertion failures report as
  `failed`, other runtime errors as `invalid` — identical to the Playwright and Vitest reporters.
  ANSI colour codes are stripped from reported stacktraces.
