# Changelog

## 0.1.0

Initial Tiden fork release of `@tiden/reporter-commons`.

- Forked from [`qase-javascript-commons`](https://github.com/qase-tms/qase-javascript) at commit
  [`d77a157`](https://github.com/qase-tms/qase-javascript/commit/d77a157020fea088ea323050a36b9bf874ad089d)
  (Apache-2.0); wire transport retargeted from Qase TestOps to Tiden's Test Runs API.
- **JSON API calls now go through the generated `@tiden/api-client`.** `CreateTestRun`,
  `ReportResults` and `CompleteTestRun` are issued via the generated `TestRunServiceApi`, so their
  request/response types track the Tiden OpenAPI contract instead of a hand-maintained
  copy. The generated class is constructed on top of the same axios instance `tiden-http.ts`
  creates, so baseURL, `Authorization`, and the 30s timeout stay in one place; the hand-written
  wire types (`client/models/tiden-result.ts`) are gone.
  - Wire format follows the generated models: lowerCamelCase JSON (`testopsIds`, `paramGroups`,
    `suitePath`, `clientMeta`, step `expectedResult`/`inputData`) and int64 `duration` as a string.
    Both shapes decode identically server-side (protojson), verified against the live API.
  - The local `report`-mode file format is unchanged — it keeps its own snake_case contract.
  - Attachment upload stays hand-written: `POST /v1/products/{product}/attachments:upload` is a
    multipart route absent from the OpenAPI spec, so no generated operation exists. It shares the
    same axios instance, and retries/backoff are unchanged.
  - **`@tiden/api-client` is now a runtime dependency of this package (`^0.1.0`), not just a
    convenience package for API consumers.** It MUST be published to npm alongside
    `@tiden/reporter-commons` — the release workflow publishes it first, in dependency order.
    Holding it back would make this package uninstallable.
- See the [root README](../README.md#lineage) for full fork lineage, and this package's
  [README](./README.md) for the current shared config/env layer this package provides.
