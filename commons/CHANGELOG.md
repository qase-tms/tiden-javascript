# Changelog

## Unreleased

- **`resolveFilePath` and `isUsableFilePath` on the `/internal` entry point.** The rule behind
  every reporter's `fields.file_path`, which is the key the server joins a requirement's
  repo-relative `repo_file` anchors against. Deliberately NOT `normalizeSpecPath`: that one
  returns a path outside the root unchanged, which is right for a signature segment and wrong
  for a join key — an absolute machine path or a virtual module id can never match an anchor,
  so it would be a field that looks like a join key and silently never joins. `undefined`
  means omit; omitting is not fabricating.
- **`resolveFilePath` resolves the root rather than trusting the string.** A relative root
  (`..`, `.`, or `''` from a config file) matched no absolute test path, so every file was
  omitted for the whole run while the warning told the user to set the variable they had just
  set. Relative roots now resolve against cwd, `.`/`..` segments are collapsed on both sides,
  and a symlinked root — `/tmp/x` while the runner emits `/private/tmp/x/...` on macOS — is
  compared again via `realpath`, memoized and only after the plain comparison fails.
  `tiden-phpunit-reporter`'s `FilePathResolver` already did this for the same macOS reason.
- **`normalizeSpecPath` and `resolveRootDir` are deliberately unchanged.** They feed the case
  SIGNATURE, and changing how a root resolves would change the file segment of every signature
  computed under a relative or symlinked root — forking the history of every case already
  reported under the old spelling. A join key can be corrected; an identity cannot.

## 0.2.0

- **`rootDir` / `TIDEN_ROOT_DIR` option**, plus `normalizeSpecPath` and `resolveRootDir` on the
  `/internal` entry point: the base a case signature's spec-file segment is resolved against,
  defaulting to `process.cwd()`. Consumed by `@tiden/vitest-reporter` and `@tiden/jest-reporter`.
  Env is read directly by `resolveRootDir` rather than through `OptionsResolver`, whose composed
  result never reaches a framework reporter — resolving it any other way leaves `TIDEN_ROOT_DIR`
  silently ignored while looking configured.
- **Fixed a polynomial ReDoS in `normalizeSpecPath`.** The root's trailing slashes were trimmed
  with `/\/+$/`, which backtracks quadratically on a root of repeated slashes — and the root is
  configurable (`rootDir` / `TIDEN_ROOT_DIR`). Measured at 546ms for a 40k-character root against
  0ms for the scan that replaces it. Caught by CodeQL (`js/polynomial-redos`) before release; same
  class as the step-marker parser fixed in 0.1.1.
- **Fixed: `TIDEN_FALLBACK` was silently ignored.** It was declared in `EnvEnum`, `EnvType` and the
  env validation schema, but `envToConfig` never mapped it into `ConfigType` — so the value
  validated and was then dropped. It decides what happens when `tiden` mode cannot start, which is
  the disable path below.
- **A reporter that stops MID-RUN says so too.** `FallbackCoordinator.disable()` turned reporting
  off after an upstream (and fallback) failure while logging only the error, not the consequence:
  the suite carried on, every later result went nowhere, and the run ended green. A present-but-
  rejected token reached the same silent failure as a missing one by a different path.
- **The credential list is no longer appended to every disabled message.** It is stated where a
  missing setting is a live suspect, and omitted where the error above is the answer — a message
  padded with the same tail every time stops being read.
- **`buildReporters` says why it disabled the reporter.** Both disabling paths — a config
  `mode`/`fallback` of `off`, and a `tiden` mode that cannot start because one of the four
  required settings is missing — used to set `disabled = true` with no output. A disabled reporter
  is indistinguishable from a working one, which cost a user an hour. Each branch now announces
  itself through `logReporterDisabled`, naming the reason, the remedy, and the credentials
  `createRunReporter` requires. Deliberately `logger.log`, not `logDebug`.

## 0.1.1

- **Fixed a polynomial ReDoS in `extractAndCleanStep`** (CodeQL `js/polynomial-redos`, high).
  Its single regex spanned both the `TidenExpRes:` and `TidenData:` markers and needed an
  ambiguous `\s*:?\s*` prefix: for a run of N spaces there are O(N) ways to split them across
  the two `\s*`, so a step name containing a long run of spaces backtracked polynomially.
  Replaced with index-based slicing, matching what upstream `qase-javascript-commons` moved to.
- Two bugs fixed along the way: a single marker with no counterpart was silently ignored (the
  old regex required both), and `.` dropped multiline marker values.

## 0.1.0

Initial Tiden fork release of `@tiden/reporter-commons`.

- Forked from [`qase-javascript-commons`](https://github.com/qase-tms/qase-javascript) at commit
  [`d77a157`](https://github.com/qase-tms/qase-javascript/commit/d77a157020fea088ea323050a36b9bf874ad089d)
  (Apache-2.0); wire transport retargeted from Qase TestOps to Tiden's Test Runs API.
- **JSON API calls use a purpose-built reporter transport.** `CreateTestRun`, `ReportResults`
  and `CompleteTestRun` share the axios instance from `tiden-http.ts`, so baseURL,
  `Authorization`, and the 30s timeout stay in one place without pulling the full generated API
  client into every reporter installation.
  - Reporter DTOs follow the generated models: lowerCamelCase JSON (`testopsIds`, `paramGroups`,
    `suitePath`, `clientMeta`, step `expectedResult`/`inputData`) and int64 `duration` as a string.
    A compile-time test checks them against the private generated OpenAPI snapshot, and wire tests
    verify the paths and serialization.
  - The local `report`-mode file format is unchanged — it keeps its own snake_case contract.
  - Attachment upload stays hand-written: `POST /v1/products/{product}/attachments:upload` is a
    multipart route absent from the OpenAPI spec, so no generated operation exists. It shares the
    same axios instance, and retries/backoff are unchanged.
  - `@tiden/api-client` is not a runtime dependency and is not published to npm. The generated
    workspace is marked private and serves only as a repository-local contract snapshot.
- See the [root README](../README.md#lineage) for full fork lineage, and this package's
  [README](./README.md) for the current shared config/env layer this package provides.
