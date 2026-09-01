# @tiden/jest-reporter

Tiden reporter for [Jest](https://jestjs.io/). Reports your Jest suite's results into Tiden's
Test Runs API.

Forked from `jest-qase-reporter` — see the [root README](../README.md#lineage) for the full fork
lineage.

## Features

- Reports every Jest spec to Tiden, including skipped and `todo` specs
- Links tests to Tiden cases by id, through the test title
- Batched uploads with a local-file fallback when the API is unreachable
- Metadata API for titles, comments, suites, fields, parameters, tags, steps and attachments
- Network Profiler that captures outgoing HTTP requests as steps
- Shared case identity with the Playwright and Vitest reporters

## Installation

```bash
npm install --save-dev @tiden/jest-reporter
```

## Quick Start

**1. Create a `tiden.config.json` in your project root:**

```json
{
  "mode": "tiden",
  "tiden": {
    "product": "<product uuid>",
    "api": { "token": "tfy_...", "baseUrl": "https://api.tiden.example" }
  }
}
```

**2. Register the reporter in `jest.config.js`:**

```javascript
module.exports = {
  reporters: [
    'default',
    ['@tiden/jest-reporter', { mode: 'tiden' }],
  ],
};
```

**3. Optionally link a test to a Tiden case:**

```javascript
const { tiden } = require('@tiden/jest-reporter/jest');

test(tiden(1, 'logs in with valid credentials'), () => {
  expect(login('ada', 'secret')).toBe(true);
});
```

**4. Run your suite:**

```bash
npx jest
```

## Configuration

Options are resolved in this order, highest priority first:

1. **Environment variables** (`TIDEN_*`)
2. **`tiden.config.json`** in the project root
3. **Reporter options** in `jest.config.js`

> [!NOTE]
> This is the opposite of upstream `jest-qase-reporter`, where `jest.config.js` options win over
> environment variables. The order above matches `@tiden/playwright-reporter` and
> `@tiden/vitest-reporter`, so `TIDEN_*` set in CI always wins.

### Full `tiden.config.json` example

```json
{
  "mode": "tiden",
  "debug": false,
  "environment": "staging",
  "tiden": {
    "product": "<product uuid>",
    "api": { "token": "tfy_...", "baseUrl": "https://api.tiden.example" },
    "run": { "title": "Jest run", "complete": true, "branch": "main" },
    "batch": { "size": 200 }
  }
}
```

- `mode` — see [Modes](#modes) below. **`tiden` is the one that uploads.**
- `tiden.product` — your Tiden product ID.
- `tiden.api.token` / `tiden.api.baseUrl` — Tiden API credentials and endpoint (full URL, e.g.
  `https://api.tiden.example`, not just a host).
- `tiden.run.complete` — whether this process should mark the run complete when the suite
  finishes. **Defaults to `true`** if omitted; set `false` for sharded CI so only the final job
  completes the run — see [Sharded CI](#sharded-ci) below.

### Modes

`mode` / `TIDEN_MODE` takes exactly three values, and only one of them uploads anything:

| Value | What it does |
|---|---|
| `tiden` | **Uploads results to Tiden's Test Runs API.** This is what you want in CI. Requires `tiden.product` + `tiden.api.token` (+ `baseUrl`). |
| `report` | Writes a local report file instead of uploading — default `build/tiden-report/`, tunable with `report.connections.local.{path,format}`. Nothing reaches Tiden. |
| `off` | Reporter is inert: no upload, no file. |

> [!WARNING]
> `report` does **not** mean "report to Tiden" — it means "write a report file locally". Picking
> it when you meant `tiden` produces a green run with no data in Tiden. Set `TIDEN_MODE=tiden`.

`fallback` / `TIDEN_FALLBACK` takes the same values and is used only if the primary mode fails to
initialize (e.g. `mode: 'tiden'` with `fallback: 'report'` keeps results on disk when the API is
unreachable).

### Environment variables

All options can also be set via environment variables, which take the highest priority — they
override both the config file and any explicit `jest.config.js` reporter options.

| Config key                        | Environment variable                | Description                                                                    |
|------------------------------------|--------------------------------------|----------------------------------------------------------------------------------|
| **Common**                         |                                       |                                                                                    |
| `mode`                              | `TIDEN_MODE`                         | `tiden` = upload to Tiden, `report` = local file only, `off` = inert — see [Modes](#modes) |
| `fallback`                          | `TIDEN_FALLBACK`                     | Mode to fall back to if the primary mode fails to initialize                     |
| `debug`                             | `TIDEN_DEBUG`                        | Enable debug logging                                                             |
| `environment`                       | `TIDEN_ENVIRONMENT`                  | Environment slug attached to the run (auto-created server-side if unknown)       |
| `captureLogs`                       | `TIDEN_CAPTURE_LOGS`                 | Capture `stdout`/`stderr` into the reported result                               |
| `rootSuite`                         | `TIDEN_ROOT_SUITE`                   | Wrap all reported suites under a single root suite name                          |
| `statusMapping`                     | `TIDEN_STATUS_MAPPING`               | Rename result statuses, format `fromStatus=toStatus[,fromStatus=toStatus...]`     |
| **Tiden reporting**                 |                                       |                                                                                    |
| `tiden.product`                     | `TIDEN_PRODUCT_ID`                   | Tiden product ID (**required** in `tiden` mode)                                  |
| `tiden.uploadAttachments`           | `TIDEN_UPLOAD_ATTACHMENTS`           | Enable/disable attachment uploads                                                |
| `tiden.defect`                      | `TIDEN_DEFECT`                       | Mark failed results as defects                                                   |
| `tiden.statusFilter`                | `TIDEN_STATUS_FILTER`                | Comma-separated statuses to exclude from reporting (e.g. `passed,skipped`)        |
| `tiden.api.token`                   | `TIDEN_API_TOKEN`                    | Tiden API token (**required** in `tiden` mode)                                   |
| `tiden.api.baseUrl`                 | `TIDEN_BASE_URL`                     | Tiden API base URL, full URL (e.g. `https://api.tiden.example`)                   |
| `tiden.run.id`                      | `TIDEN_RUN_ID`                       | Reuse an existing run instead of creating a new one (sharded CI)                  |
| `tiden.run.title`                   | `TIDEN_RUN_TITLE`                    | Test run title                                                                   |
| `tiden.run.description`             | `TIDEN_RUN_DESCRIPTION`              | Test run description                                                             |
| `tiden.run.complete`                | `TIDEN_RUN_COMPLETE`                 | Whether this process completes the run when it finishes (default `true`; set `false` on CI shards) |
| `tiden.run.branch`                  | `TIDEN_BRANCH`                       | Branch name attached to the run                                                  |
| `tiden.batch.size`                  | `TIDEN_BATCH_SIZE`                   | Batch size for uploading results (default `200`, max `2000`)                      |
| `tiden.configurations.values`       | `TIDEN_CONFIGURATIONS_VALUES`        | Configuration group values, format `group1=value1,group2=value2`                 |
| **Report mode (local file output)**|                                       |                                                                                    |
| `report.connections.local.path`     | `TIDEN_REPORT_CONNECTION_PATH`       | Output path for `report` mode                                                    |
| `report.connections.local.format`   | `TIDEN_REPORT_CONNECTION_FORMAT`     | Output format: `json` or `jsonp`                                                 |
| **Logging**                         |                                       |                                                                                    |
| `logging.console`                   | `TIDEN_LOGGING_CONSOLE`              | Enable/disable console output for reporter logs (default `true`)                 |
| `logging.file`                      | `TIDEN_LOGGING_FILE`                 | Enable/disable file output for reporter logs (default: same as `debug`)          |

> **CLI alignment:** `TIDEN_PRODUCT_ID`, `TIDEN_API_TOKEN`, and `TIDEN_BASE_URL` are the same
> environment variables read by the `tiden` CLI. Set them once in your CI environment and both the
> CLI and this reporter will pick them up.

> **Full option reference:** see [`commons`](../commons/README.md) for the shared config/env
> layer these values compose into.


## Linking tests to cases

Wrap the test title with `tiden(caseId, title)`:

```javascript
const { tiden } = require('@tiden/jest-reporter/jest');

test(tiden(1, 'logs in'), () => { /* ... */ });
test(tiden([1, 2], 'covers two cases'), () => { /* ... */ });
```

This encodes the ids into the title (`logs in (Tiden ID: 1)`), which the reporter parses back out.
Because the ids travel with the test result itself, this channel works in every Jest
configuration, including multi-worker runs.

## Metadata API

> [!IMPORTANT]
> **The `tiden.*` metadata helpers below require `--runInBand` (or `maxWorkers=1`).** Jest runs
> specs in worker processes while reporters live in the main process, and these helpers write to a
> `global.Tiden` bridge that only the main process can see. Under the default multi-worker
> configuration they silently do nothing — the tests still report, but their metadata is lost.
> `tiden(caseId, title)` above has no such limitation.

```javascript
const { tiden } = require('@tiden/jest-reporter/jest');

test('checkout flow', async () => {
  tiden.title('Checkout with a saved card');
  tiden.comment('Covers the happy path');
  tiden.suite('Payments');
  tiden.fields({ severity: 'critical' });
  tiden.parameters({ currency: 'EUR' });
  tiden.groupParameters({ shard: '1' });
  tiden.tags('smoke', 'payments');

  await tiden.step('Open the cart', () => {
    expect(cart.items).toHaveLength(1);
  });

  await tiden.step('Pay', () => pay(), 'Payment succeeds', 'card=saved');

  tiden.attach({ name: 'receipt.json', content: '{}', type: 'application/json' });
  tiden.attach({ paths: ['/tmp/screenshot.png'] });
});
```

`tiden.ignore()` drops the current test from the report entirely.

| Method | Effect |
|---|---|
| `tiden.title(value)` | Override the reported test title |
| `tiden.comment(value)` | Attach a comment to the result |
| `tiden.suite(value)` | Override the reported suite |
| `tiden.fields(values)` | Set custom fields |
| `tiden.parameters(values)` | Set parameters |
| `tiden.groupParameters(values)` | Set group parameters |
| `tiden.tags(...values)` | Add tags |
| `tiden.step(name, body, expectedResult?, data?)` | Run and report a step |
| `tiden.attach({ name, type, content })` / `({ paths })` | Attach content or files |
| `tiden.ignore()` | Do not report this test |

### Test result statuses

| Jest result | Tiden status |
|-------------|--------------|
| `passed`    | `passed`     |
| `failed`    | `failed`     |
| `pending` (`test.skip`) | `skipped` |
| `todo` (`test.todo`) | `disabled` |

Skipped and `todo` specs never execute, so they bypass Jest's per-test hooks; the reporter sweeps
them out of the file-level result instead, and reports each exactly once.

Failures are classified by the shared commons status logic: assertion failures report as
`failed`, while other runtime errors — a bare `throw`, network, syntax or type errors — report as
`invalid`. The Playwright and Vitest reporters classify identically.

### Retries

Jest has no framework-level flaky concept. When `jest.retryTimes()` re-runs a test, only the
final attempt is reported, and no result is marked flaky.

### Case identity (`signature`)

A result's `signature` is what makes the same logical case match across runs. It is built with
commons' `generateSignature()` from the spec's structural path — the working-directory-relative
file path, then the `describe` chain, then the test title — with any linked case ids prefixed:

```
src::utils::login.test.ts::auth::logs_in
7::src::utils::login.test.ts::auth::logs_in
```

It is deliberately **param-free**: a parametrized case keeps one identity across every parameter
combination.

> [!IMPORTANT]
> **Deliberate divergence from upstream `jest-qase-reporter`.** This package uses
> `generateSignature()` with the same argument semantics as
> [`@tiden/playwright-reporter`](../playwright/README.md) and
> [`@tiden/vitest-reporter`](../vitest/README.md), so a given logical case keys identically in all
> three. **Do not revert this to a raw name-based signature when re-syncing with upstream** — see
> the comment on `result.signature` in `src/result-builder.ts`.
>
> Like the Playwright reporter and unlike the Vitest one, the path starts at the spec file name,
> which keeps identical `describe`/test titles in different files distinct.

## Network Profiler

The Network Profiler captures outgoing HTTP requests made during test execution and reports them
as request-type steps.

Enable it in `tiden.config.json`:

```json
{
  "profilers": ["network"],
  "networkProfiler": {
    "skip_domains": ["telemetry.example.com"],
    "track_on_fail": true
  }
}
```

> [!NOTE]
> Like the metadata API, the profiler collects requests in the reporter's own process, so it
> requires `--runInBand`.

## Sharded CI

`tiden.run.complete` defaults to `true`, so runs complete by default. For sharded CI, create the
run in the first job, thread its ID to the rest via `TIDEN_RUN_ID`, and set
`TIDEN_RUN_COMPLETE=false` on all but the final job. The run ID is printed unconditionally as
`Test run created: #<id>` in the reporter's log output. See the
[Playwright reporter's sharded-CI recipe](../playwright/README.md#sharded-ci-recipe) for a full
worked example — the environment variables are identical, only the test command differs
(`npx jest --shard=1/3`).

## Requirements

- Node.js >= 18
- Jest >= 28

## License

Apache License 2.0. See [LICENSE](../LICENSE) for details.
