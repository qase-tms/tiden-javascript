# Changelog

## 0.2.0

> **Breaking: every case reported by this reporter changes identity.** `signature` and the
> reported suite path both gain the spec file. Existing cases keyed the old way are not
> migrated — a run after upgrading creates new cases beside them, and requirement coverage
> stays on the old rows until they are reconciled. Read the migration note below before
> upgrading a product that already has vitest history.

- **Case identity now includes the spec file.** `signature` was built from Vitest's `fullName`
  alone — the describe chain plus the leaf title. `fullName` carries no file, so two same-named
  tests in different spec files shared one identity, and this reporter disagreed with any other
  producer that did include the file. The path now leads with the project-relative spec file as
  **one segment with its slashes intact**, matching `@tiden/playwright-reporter`'s `titlePath()`
  shape. The in-code comment claiming alignment with the Playwright reporter is now true.
  See [qase-tms/tiden-app#445](https://github.com/qase-tms/tiden-app/issues/445).
- **Fixed: the reported suite path was truncated.** `currentSuite` — one describe's `name` from
  `onTestSuiteReady` — took precedence over the derived path, so a nested test was reported as
  its innermost describe alone with no file (`Outer > Inner > deep test` arrived as
  `["Inner"]`), and a test with no describe reported no suite at all. The derived fallback
  collapsed separately: it joined the chain with `' > '` while the caller split on `' - '`, so a
  nested path became ONE suite titled `"Outer > Inner"`. The path is now
  `[spec file, ...describe titles]`, derived as segments with no string round-trip.
- **`rootDir` / `TIDEN_ROOT_DIR`** sets the base the spec-file segment is resolved against
  (default `process.cwd()`). Every producer reporting into one product must agree on this base
  or the same test lands as two cases; set it when the runner's working directory is not the
  root you want measured from. It applies to the suite path as well as the signature.
- An explicit `tiden.suite()` annotation still replaces the whole computed path and keeps its
  `' - '` nesting convention. `currentSuite` survives only as a fallback for a case with neither
  a module id nor a describe, and is no longer split on `' - '` — a `describe('Feature - edge
  cases')` is one suite, not two.
- `ResultBuilder.extractSuiteFromTestCase` is deprecated: it is not the reported suite path, and
  its `' > '`-joined return is the shape the collapse was made of. Use `suitePath()`.

**Migration.** If a product already carries vitest cases from 0.1.x, upgrading re-keys them.
Either reconcile the old rows onto the new identities, or pin the base with `TIDEN_ROOT_DIR` so
this reporter matches whatever else already reports those tests. The segment shape differs from
`@tiden/jest-reporter`, which splits the file on `/` — do not carry one form across.

## 0.1.1

- No code changes. Requires `@tiden/reporter-commons` `^0.1.1`, which fixes a polynomial ReDoS
  in the step-marker parser this reporter feeds through `tiden.step()` — see the
  [commons changelog](../commons/CHANGELOG.md).

## 0.1.0

Initial Tiden fork release of `@tiden/vitest-reporter`.

- Ported from [`vitest-qase-reporter`](https://github.com/qase-tms/qase-javascript) at commit
  [`d77a157`](https://github.com/qase-tms/qase-javascript/commit/d77a157020fea088ea323050a36b9bf874ad089d)
  (`vitest-qase-reporter@1.4.3`, Apache-2.0); wire transport retargeted from Qase TestOps to
  Tiden's Test Runs API via `@tiden/reporter-commons`.
- Public API renamed to the Tiden vocabulary: `VitestTidenReporter` / `VitestTidenOptionsType`,
  `withTiden`, `addTidenId`, `Tiden <field>:` annotation messages, `(Tiden ID: n)` title markers,
  `TidenExpRes:` / `TidenData:` step markers.
- **Fixed: results were rejected by the API.** Upstream assigns Vitest's own `testCase.id`
  (e.g. `1971115177_8_1`) to the reported result `id`, but that field is
  `api.v1.ResultCreate.id` — an idempotency key the API validates as a UUID — so every result in
  a run was rejected with `INVALID_RESULT_ID` and the run stayed at `total=0`. Now generated with
  `uuidv4()`, matching the Playwright reporter (`uuid` pinned to `11.1.1` likewise).
  `testCase.id` remains the internal key for correlating annotations. Internal step/attachment
  ids moved to `uuidv4()` too (neither is sent to the API — commons rebuilds steps for the wire
  and uploads attachments by name/content — but the deprecated
  `Math.random().toString(36).substr(2, 9)` is gone).
- **Case identity aligned with `@tiden/playwright-reporter`:** `signature` is now built by
  commons' `generateSignature(caseIds | null, structuralPath)` — the `fullName` path split on
  `' > '`, leaf test title included, param-free — instead of upstream's raw Vitest `fullName`.
  This is a deliberate divergence from `vitest-qase-reporter`; **do not revert it on an upstream
  re-sync**, or the same logical case will key differently in the Vitest and Playwright
  reporters. See [README → Case identity](./README.md#case-identity-signature) and the comment
  on `testResult.signature` in `src/modules/resultBuilder.ts`.
- Multi-project (`testops_multi`) reporting was dropped along with the rest of the fork:
  `addQaseProjects()` and the `(Qase PROJ: n)` title markers have no Tiden equivalent.
- Added `./setup` to the package's `exports` map, so the documented
  `@tiden/vitest-reporter/setup` network-profiler entry point actually resolves (it was
  unreachable upstream).
- README documents the three `TIDEN_MODE` values explicitly (`tiden` uploads, `report` only
  writes a local file, `off` is inert) — `report` reads like "report to Tiden" and is not.
- See the [root README](../README.md#lineage) for full fork lineage, and this package's
  [README](./README.md) for the current feature set and configuration reference.
