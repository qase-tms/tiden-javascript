# Changelog

## 0.2.0

- No code changes. Version bumped with the rest of the workspace; the release workflow requires
  all four published packages to match the tag. Requires `@tiden/reporter-commons` `^0.2.0`.
- Note for anyone comparing reporters: this reporter's `signature` has always led with the spec
  file (via `titlePath()`), and it also carries the project name as a segment.
  `@tiden/vitest-reporter` matches the file part as of 0.2.0 but has no project segment; jest
  splits the file on `/`. The three shapes are deliberate and must not be carried across.

## 0.1.1

- No code changes. Requires `@tiden/reporter-commons` `^0.1.1`, which fixes a polynomial ReDoS
  in the step-marker parser this reporter feeds through `tiden.step()` — see the
  [commons changelog](../commons/CHANGELOG.md).

## 0.1.0

Initial Tiden fork release of `@tiden/playwright-reporter`.

- Forked from [`playwright-qase-reporter`](https://github.com/qase-tms/qase-javascript) at commit
  [`d77a157`](https://github.com/qase-tms/qase-javascript/commit/d77a157020fea088ea323050a36b9bf874ad089d)
  (Apache-2.0); wire transport retargeted from Qase TestOps to Tiden's Test Runs API.
- See the [root README](../README.md#lineage) for full fork lineage, and this package's
  [README](./README.md) for the current feature set and configuration reference.
