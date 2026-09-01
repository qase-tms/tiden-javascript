# Changelog

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
