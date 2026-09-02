# Changelog

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
