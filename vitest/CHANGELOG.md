# Changelog

## 0.1.0

Initial Tiden fork release of `@tiden/vitest-reporter`.

- Ported from [`vitest-qase-reporter`](https://github.com/qase-tms/qase-javascript) at commit
  [`d77a157`](https://github.com/qase-tms/qase-javascript/commit/d77a157020fea088ea323050a36b9bf874ad089d)
  (`vitest-qase-reporter@1.4.3`, Apache-2.0); wire transport retargeted from Qase TestOps to
  Tiden's Test Runs API via `@tiden/reporter-commons`.
- Public API renamed to the Tiden vocabulary: `VitestTidenReporter` / `VitestTidenOptionsType`,
  `withTiden`, `addTidenId`, `Tiden <field>:` annotation messages, `(Tiden ID: n)` title markers,
  `TidenExpRes:` / `TidenData:` step markers.
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
- See the [root README](../README.md#lineage) for full fork lineage, and this package's
  [README](./README.md) for the current feature set and configuration reference.
