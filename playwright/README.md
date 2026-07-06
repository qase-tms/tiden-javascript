# @tiden/playwright-reporter

Playwright reporter for Tiden — reports test results, attachments, and steps from your Playwright
suite into Tiden's Test Runs API.

See the [root README](../README.md#lineage) for this package's fork lineage.

## Features

- Link automated tests to Tiden test cases by ID (`tiden()` wrapper, `tiden.id()`, or method-based
  annotations)
- Rich per-test metadata: title, fields, parameters, grouped parameters, suite, comment, tags
- File and inline attachments, with a step-title helper for expected result / data
- Multi-project mapping (`tiden.projects()` / `tiden.projectsTitle()`)
- Configurable via file, environment variables, or `playwright.config.ts` (in that priority order)
- Network Profiler fixture for automatic HTTP request capture as reported steps
- Sharded-CI support via a shared `TIDEN_RUN_ID`

## Installation

```sh
npm install --save-dev @tiden/playwright-reporter
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

**2. Register the reporter in `playwright.config.ts`:**

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['list'],
    ['@tiden/playwright-reporter', {
      mode: 'tiden',
      tiden: {
        api: { token: process.env.TIDEN_API_TOKEN, baseUrl: process.env.TIDEN_BASE_URL },
        product: process.env.TIDEN_PRODUCT_ID,
      },
    }],
  ],
});
```

**3. Link a test to a Tiden test case:**

```typescript
import { test, expect } from '@playwright/test';
import { tiden } from '@tiden/playwright-reporter';

test(tiden(1, 'User can login with valid credentials'), async ({ page }) => {
  await page.goto('https://example.com');
  expect(await page.title()).toBe('Example Domain');
});
```

**4. Run your tests:**

```sh
npx playwright test
```

## Configuration

The reporter is configured via, in order of priority:

1. **`playwright.config.ts`** reporter options (highest priority)
2. **Environment variables** (`TIDEN_*`)
3. **Config file** (`tiden.config.json`, project root)

### Full `tiden.config.json` example

```json
{
  "mode": "tiden",
  "debug": false,
  "environment": "staging",
  "tiden": {
    "product": "<product uuid>",
    "api": { "token": "tfy_...", "baseUrl": "https://api.tiden.example" },
    "run": { "title": "Playwright run", "complete": true, "branch": "main" },
    "batch": { "size": 200 }
  }
}
```

- `mode` — `report | tiden | off`. Use `tiden` to report to Tiden's Test Runs API.
- `tiden.product` — your Tiden product ID.
- `tiden.api.token` / `tiden.api.baseUrl` — Tiden API credentials and endpoint (full URL, e.g.
  `https://api.tiden.example`, not just a host).
- `tiden.run.complete` — whether this process should mark the run complete when the suite
  finishes. **Defaults to not completing the run** if omitted — see
  [Sharded CI](#sharded-ci-recipe) below for why this matters.

### Environment variables

All options can also be set via environment variables, which take priority over the config file
but are overridden by explicit `playwright.config.ts` reporter options.

| Config key                        | Environment variable                | Description                                                                    |
|------------------------------------|--------------------------------------|----------------------------------------------------------------------------------|
| **Common**                         |                                       |                                                                                    |
| `mode`                              | `TIDEN_MODE`                         | Reporter mode: `report`, `tiden`, or `off`                                       |
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
| `tiden.run.complete`                | `TIDEN_RUN_COMPLETE`                 | Whether this process completes the run when it finishes (no default — see below) |
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

## Annotation API

Import `tiden` from `@tiden/playwright-reporter`. It's a callable function (title wrapper) with
attached methods for per-test metadata:

```typescript
import { test, expect } from '@playwright/test';
import { tiden } from '@tiden/playwright-reporter';

// Wrapper function: link one or more case IDs via the test title
test(tiden(1, 'User can login'), async ({ page }) => { /* ... */ });
test(tiden([1, 2, 3], 'Covers multiple cases'), async ({ page }) => { /* ... */ });

test('User can login', async ({ page }) => {
  tiden.id(1);                                  // link case ID(s), method-based
  tiden.title('User can login');                // override the reported title
  tiden.fields({ severity: 'critical' });        // custom fields
  tiden.parameters({ browser: 'chromium' });     // parameters (varies per test)
  tiden.groupParameters({ browser: 'chromium' });// parameters grouped as one entity
  tiden.suite('Authentication / Login');         // suite override
  tiden.comment('Flaky on Safari');              // free-text comment
  tiden.tags('smoke', 'regression');             // tags
  tiden.ignore();                                // test still runs, result not reported
  tiden.attach({ paths: '/path/to/file' });       // attach a file (or { name, content, contentType })
  tiden.projects({ PROJ1: [1, 2], PROJ2: [3] });  // multi-project mapping

  await test.step(tiden.step('Log in', 'redirected to dashboard'), async () => {
    await page.goto('https://example.com');
  });
});

// Multi-project mapping via title instead of a method call inside the test
test(tiden.projectsTitle('Checkout', { PROJ1: [1], PROJ2: [2] }), async ({ page }) => { /* ... */ });
```

Every method other than the bare `tiden(caseId, name)` call returns `this`, so calls can be
chained. This is the complete set implemented in `playwright/src/playwright.ts` — no other
methods exist beyond what's listed above.

### Native Playwright annotations

As an alternative to the `tiden` object, the reporter also reads Playwright's own
[test annotations](https://playwright.dev/docs/test-annotations) — useful if you want to avoid an
import in test files. Supported annotation `type`s (case-insensitive):

```typescript
test('User can login', {
  annotation: [
    { type: 'TidenId', description: '1,2' },
    { type: 'TidenProjects', description: '{"PROJ1":[1,2],"PROJ2":[3]}' },
    { type: 'TidenSuite', description: 'Authentication / Login' },
  ],
}, async ({ page }) => { /* ... */ });
```

### Test result statuses

| Playwright result | Tiden status |
|--------------------|--------------|
| `passed`           | `passed`     |
| `failed`           | `failed`     |
| `timedOut`         | `failed`     |
| `skipped`          | `skipped`    |
| `interrupted`      | `failed`     |

## Network Profiler

Import `test` from the reporter's fixture instead of `@playwright/test` to capture outgoing HTTP
requests as reported steps:

```typescript
import { test } from '@tiden/playwright-reporter/fixture';
import { expect } from '@playwright/test';
```

Enable it via `"profilers": ["network"]` in `tiden.config.json`; tune with `networkProfiler.skip_domains`
and `networkProfiler.track_on_fail`. Requests to the reporter's own `tiden.api.baseUrl` host are
always excluded automatically.

## Sharded CI recipe

`tiden.run.complete` has **no true-by-default behavior**: if it's left unset, the reporter creates
(or reuses) a run but never calls the complete endpoint. That's what makes a multi-job sharded run
possible — every shard except the last can safely skip completion.

1. **First job** — run a shard with `TIDEN_RUN_COMPLETE=false` and no `TIDEN_RUN_ID` set. The
   reporter creates a new run and, when the suite finishes, leaves it open. To thread the new run
   ID to later jobs, enable debug logging (`TIDEN_DEBUG=true`) and capture the line
   `Test run created: #<id>` from the reporter's log output (console or `TIDEN_LOGGING_FILE=true`
   log file), then publish it as a job output.
2. **Middle jobs** — run each remaining shard with `TIDEN_RUN_ID=<id from step 1>` and
   `TIDEN_RUN_COMPLETE=false`. The reporter reuses the existing run instead of creating a new one
   and still doesn't complete it.
3. **Final job** — run with the same `TIDEN_RUN_ID` and `TIDEN_RUN_COMPLETE=true`. When this
   shard's suite finishes, the reporter calls the run-complete endpoint for the shared run.

```yaml
jobs:
  shard-1:
    runs-on: ubuntu-latest
    outputs:
      run_id: ${{ steps.extract.outputs.run_id }}
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: TIDEN_DEBUG=true TIDEN_RUN_COMPLETE=false npx playwright test --shard=1/3 | tee run.log
      - id: extract
        run: echo "run_id=$(grep -o 'Test run created: #[0-9]*' run.log | grep -o '[0-9]*$')" >> "$GITHUB_OUTPUT"

  shard-2:
    needs: shard-1
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: TIDEN_RUN_ID=${{ needs.shard-1.outputs.run_id }} TIDEN_RUN_COMPLETE=false npx playwright test --shard=2/3

  shard-3:
    needs: [shard-1, shard-2]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: TIDEN_RUN_ID=${{ needs.shard-1.outputs.run_id }} TIDEN_RUN_COMPLETE=true npx playwright test --shard=3/3
```

## Requirements

- Node.js >= 18
- `@playwright/test` >= 1.16.3

## License

Apache License 2.0. See [LICENSE](../LICENSE) for details.
