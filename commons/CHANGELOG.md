# Changelog

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
