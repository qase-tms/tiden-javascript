# @tiden/vitest-reporter

Vitest reporter for Tiden — reports test results, attachments, and steps from your Vitest
suite into Tiden's Test Runs API.

See the [root README](../README.md#lineage) for this package's fork lineage.

## Features

- Link automated tests to Tiden test cases by ID (`addTidenId()` title helper)
- Rich per-test metadata via Vitest test annotations: title, fields, parameters, grouped
  parameters, suite, comment, tags
- File and inline attachments, plus steps with expected result / data
- Configurable via `vitest.config.ts`, a config file, or environment variables (env wins, so CI
  can always override committed config)
- Network Profiler setup file for automatic HTTP request capture as reported steps
- Sharded-CI support via a shared `TIDEN_RUN_ID`

## Installation

```sh
npm install --save-dev @tiden/vitest-reporter
```

## Quick Start

**1. Create `tiden.config.json` in your project root:**

```json
{
  "mode": "tiden",
  "tiden": {
    "product": "<product uuid>",
    "api": {
      "token": "tfy_...",
      "baseUrl": "https://api.tiden.example"
    }
  }
}
```

**2. Register the reporter in `vitest.config.ts`:**

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    reporters: [
      'default',
      ['@tiden/vitest-reporter', {
        mode: 'tiden',
        tiden: {
          api: { token: process.env.TIDEN_API_TOKEN, baseUrl: process.env.TIDEN_BASE_URL },
          product: process.env.TIDEN_PRODUCT_ID,
        },
      }],
    ],
  },
});
```

**3. Link a test to a Tiden test case:**

```typescript
import { test, expect } from 'vitest';
import { addTidenId } from '@tiden/vitest-reporter/vitest';

test(addTidenId('User can login with valid credentials', [1]), () => {
  expect(true).toBe(true);
});
```

**4. Run your tests:**

```sh
npx vitest run
```

## Configuration

The reporter is configured via, in order of priority:

1. **Environment variables** (`TIDEN_*`) (highest priority)
2. **Config file** (`tiden.config.json`, project root)
3. **`vitest.config.ts`** reporter options

Environment variables win last so CI can always override committed config (e.g. swap
`tiden.api.baseUrl`/`tiden.api.token` per environment) without editing checked-in files.

### Full `tiden.config.json` example

```json
{
  "mode": "tiden",
  "debug": false,
  "environment": "staging",
  "tiden": {
    "product": "<product uuid>",
    "api": { "token": "tfy_...", "baseUrl": "https://api.tiden.example" },
    "run": { "title": "Vitest run", "complete": true, "branch": "main" },
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
override both the config file and any explicit `vitest.config.ts` reporter options.

| Config key                        | Environment variable                | Description                                                                    |
|------------------------------------|--------------------------------------|----------------------------------------------------------------------------------|
| **Common**                         |                                       |                                                                                    |
| `mode`                              | `TIDEN_MODE`                         | `tiden` = upload to Tiden, `report` = local file only, `off` = inert — see [Modes](#modes) |
| `fallback`                          | `TIDEN_FALLBACK`                     | Mode to fall back to if the primary mode fails to initialize                     |
| `debug`                             | `TIDEN_DEBUG`                        | Enable debug logging                                                             |
| `environment`                       | `TIDEN_ENVIRONMENT`                  | Environment slug attached to the run (auto-created server-side if unknown)       |
| `captureLogs`                       | `TIDEN_CAPTURE_LOGS`                 | Capture `stdout`/`stderr` into the reported result                               |
| `rootSuite`                         | `TIDEN_ROOT_SUITE`                   | Wrap all reported suites under a single root suite name                          |
| `rootDir`                           | `TIDEN_ROOT_DIR`                     | Base the spec-file segment of a case signature is resolved against (default: `process.cwd()`) |
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

### `rootDir` and case identity

A case's `signature` is its identity, matched byte-for-byte by the server, and it
begins with the spec file. That file is measured from `rootDir`, so **every
producer reporting into one product must agree on the same base** — otherwise the
same test arrives under two identities and becomes two cases.

The default, `process.cwd()`, is right when tests are always run from one place.
Set `rootDir` explicitly when they are not: a monorepo whose CI runs vitest from a
sub-package while another producer reports paths from the repo root, for example.

```bash
TIDEN_ROOT_DIR="$GITHUB_WORKSPACE" npx vitest run
```

It applies to the reported suite path as well, so the tree placement matches the
identity.


> **CLI alignment:** `TIDEN_PRODUCT_ID`, `TIDEN_API_TOKEN`, and `TIDEN_BASE_URL` are the same
> environment variables read by the `tiden` CLI. Set them once in your CI environment and both the
> CLI and this reporter will pick them up.

> **Full option reference:** see [`commons`](../commons/README.md) for the shared config/env
> layer these values compose into.

## Linking tests to cases

`addTidenId(title, ids)` appends a `(Tiden ID: n)` marker to the test title; the reporter parses
it back out, links the result to those case IDs, and reports the cleaned title.

```typescript
import { test, expect } from 'vitest';
import { addTidenId } from '@tiden/vitest-reporter/vitest';

test(addTidenId('User can login', [1]), () => { /* ... */ });
test(addTidenId('Covers multiple cases', [1, 2, 3]), () => { /* ... */ });
```

## Metadata API (`withTiden`)

Per-test metadata travels to the reporter through Vitest's test annotations. Wrap the test body
in `withTiden` to get a `tiden` object on the test context:

```typescript
import { test, expect } from 'vitest';
import { withTiden } from '@tiden/vitest-reporter/vitest';

test('User can login', withTiden(async ({ tiden }) => {
  await tiden.title('User can login with valid credentials'); // override the reported title
  await tiden.fields({ severity: 'critical' });               // custom fields
  await tiden.parameters({ env: 'staging' });                 // parameters (vary per test)
  await tiden.groupParameters({ region: 'eu' });              // parameters grouped as one entity
  await tiden.suite('Authentication / Login');                // suite override
  await tiden.comment('Flaky on CI');                         // free-text comment
  await tiden.tags('smoke', 'regression');                    // tags
  await tiden.attach({ paths: ['/path/to/file'] });           // attach files
  await tiden.attach({ name: 'log.txt', content: 'hello', type: 'text/plain' });

  await tiden.step('Log in', async () => {
    expect(true).toBe(true);
  }, 'redirected to dashboard', 'user=demo');                 // expected result + data

  await tiden.annotate('free-form annotation');               // raw Vitest annotate passthrough
}));
```

Every method is `async` — always `await` them, otherwise the annotation may not reach the
reporter before the test ends. This is the complete set implemented in `vitest/src/vitest.ts`; no
other methods exist.

> **Not available in this reporter:** there is no `tiden.id()` and no `tiden.ignore()` — link
> cases with `addTidenId()` in the title instead, and exclude results with the shared
> `tiden.statusFilter` / `TIDEN_STATUS_FILTER` option. The Playwright reporter's `tiden.*`
> methods are a different (synchronous, non-annotation) API and are not interchangeable with
> this one.

### Test result statuses

| Vitest result | Tiden status |
|---------------|--------------|
| `passed`      | `passed`     |
| `failed`      | `failed`     |
| `skipped`     | `skipped`    |

Failures are classified by the shared commons status logic: assertion failures report as
`failed`, while errors that look like infrastructure problems (network, syntax, type errors)
report as `invalid`.

### Case identity (`signature`)

Each reported result carries a `signature` — the stable, param-free key Tiden uses to recognise
the same logical test case across runs. It is produced by `generateSignature()` from
`@tiden/reporter-commons`, from two inputs:

1. the linked case IDs parsed out of the title (`(Tiden ID: n)`), or nothing when there are none;
2. the test's full structural path from Vitest's `fullName`, split on `' > '`, **including** the
   leaf test title.

Each segment is lowercased with whitespace collapsed to `_`, and segments are joined with `::`;
IDs are joined with `-` and prefixed. Parameters are deliberately excluded — they are hashed
separately, per attempt, so every parameter combination of one case shares one identity.

```
Search > search works across browsers          → search::search_works_across_browsers
Auth > user can login (Tiden ID: 7)            → 7::auth::user_can_login_(tiden_id:_7)
```

> [!IMPORTANT]
> **Deliberate divergence from upstream `vitest-qase-reporter`,** which assigns the raw Vitest
> `fullName` to `signature`. This package uses `generateSignature()` with the same argument
> semantics as [`@tiden/playwright-reporter`](../playwright/README.md) so that a given logical
> case keys identically in both reporters. **Do not revert this to `fullName` when re-syncing
> with upstream** — see the comment on `testResult.signature` in
> `src/modules/resultBuilder.ts`.
>
> One residual difference from the Playwright reporter: there, an explicit suite override feeds
> the signature, and the path starts at the spec file name. Here the signature always comes from
> the structural `fullName` path (Vitest's `fullName` has no file-name segment), so
> `tiden.suite()` changes the reported suite tree without moving the case's identity.

## Network Profiler

The Network Profiler captures outgoing HTTP requests made during test execution and reports them
as request-type steps.

**1. Add the profiler setup file to `vitest.config.ts`:**

```typescript
export default defineConfig({
  test: {
    setupFiles: ['@tiden/vitest-reporter/setup'],
  },
});
```

**2. Enable it in `tiden.config.json`:**

```json
{
  "profilers": ["network"],
  "networkProfiler": {
    "skip_domains": ["analytics.example.com"],
    "track_on_fail": true
  }
}
```

| Option | Description | Default |
|--------|-------------|---------|
| `profilers` | Array of profilers to enable. Use `["network"]` for HTTP capture | `[]` |
| `networkProfiler.skip_domains` | Domains to exclude from profiling | `[]` |
| `networkProfiler.track_on_fail` | Capture response body for failed requests (status >= 400) | `true` |

Requests to the reporter's own `tiden.api.baseUrl` host are always excluded automatically.

> **Limitation:** the setup file attributes captured steps to the currently running test
> sequentially within a worker. `test.concurrent()` and parallel execution inside one worker
> produce incorrect step attribution.

## Sharded CI

`tiden.run.complete` defaults to `true`, so runs complete by default. For sharded CI, create the
run in the first job, thread its ID to the rest via `TIDEN_RUN_ID`, and set
`TIDEN_RUN_COMPLETE=false` on all but the final job. The run ID is printed unconditionally as
`Test run created: #<id>` in the reporter's log output. See the
[Playwright reporter's sharded-CI recipe](../playwright/README.md#sharded-ci-recipe) for a full
worked example — the environment variables are identical, only the test command differs.

## Requirements

- Node.js >= 18
- Vitest >= 3.0.0

## License

Apache License 2.0. See [LICENSE](../LICENSE) for details.
