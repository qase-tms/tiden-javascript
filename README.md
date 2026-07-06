# tiden-javascript

Tiden reporters for JavaScript test frameworks. v1 ships the commons layer
and the Playwright reporter, reporting into Tiden's Test Runs API.

## Packages

| Package | Description | README |
|---------|-------------|--------|
| [`commons`](commons) — `@tiden/reporter-commons` | Shared reporter core (config, env, API client, formatting). Not installed directly — a dependency of framework reporters. | [commons/README.md](commons/README.md) |
| [`playwright`](playwright) — `@tiden/playwright-reporter` | Playwright reporter. Install this in your test project. | [playwright/README.md](playwright/README.md) |

## Quickstart

```sh
npm install --save-dev @tiden/playwright-reporter
```

Create `tiden.config.json` in your project root:

```json
{
  "mode": "tiden",
  "tiden": {
    "product": "<product uuid>",
    "api": { "token": "tfy_...", "baseUrl": "https://api.tiden.example" }
  }
}
```

Register the reporter in `playwright.config.ts`:

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['list'], ['@tiden/playwright-reporter']],
});
```

See [`playwright/README.md`](playwright/README.md) for the full configuration reference (env
vars, annotation API, sharded-CI recipe) and [`commons/README.md`](commons/README.md) for the
shared config/env layer.

## Lineage

Forked from [qase-tms/qase-javascript](https://github.com/qase-tms/qase-javascript)
at commit `d77a157020fea088ea323050a36b9bf874ad089d` (Apache-2.0), trimmed to
`commons` (from `qase-javascript-commons`) and `playwright` (from
`qase-playwright`). The wire transport targets Tiden instead of Qase TestOps.
