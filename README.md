# tiden-javascript

Tiden reporters for JavaScript test frameworks. v1 ships the commons layer
and the Playwright and Vitest reporters, reporting into Tiden's Test Runs API.

## Packages

| Package | Description | README |
|---------|-------------|--------|
| [`commons`](commons) — `@tiden/reporter-commons` | Shared reporter core (config, env, API client, formatting). Not installed directly — a dependency of framework reporters. | [commons/README.md](commons/README.md) |
| [`playwright`](playwright) — `@tiden/playwright-reporter` | Playwright reporter. Install this in your test project. | [playwright/README.md](playwright/README.md) |
| [`vitest`](vitest) — `@tiden/vitest-reporter` | Vitest reporter. Install this in your test project. | [vitest/README.md](vitest/README.md) |
| [`api-client`](api-client) — `@tiden/api-client` | Generated OpenAPI client for the Tiden public API. Install this to call the API directly. | [api-client/README.md](api-client/README.md) |

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

For Vitest, install [`@tiden/vitest-reporter`](vitest) instead and register it under
`test.reporters` in `vitest.config.ts`:

```sh
npm install --save-dev @tiden/vitest-reporter
```

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: { reporters: ['default', ['@tiden/vitest-reporter', {}]] },
});
```

See [`vitest/README.md`](vitest/README.md) for its metadata API (`withTiden` / `addTidenId`),
network-profiler setup file, and configuration reference. Both reporters read the same
`tiden.config.json` and `TIDEN_*` environment variables.

## `@tiden/api-client`

Generated OpenAPI client for the Tiden public API (REST, for external consumers: the
`tiden` CLI, reporters, and third-party integrations). It's a standalone axios-based
client for API consumers — separate from, and not a replacement for, the hand-written
reporter facade in `commons/src/client/`.

Auth is a bearer API token (`Authorization: Bearer tfy_...`), created in the app UI or
via the CLI device-code flow.

```sh
npm install @tiden/api-client
```

```typescript
import { Configuration, ProductServiceApi } from '@tiden/api-client';

const configuration = new Configuration({
  accessToken: 'tfy_...', // API token
  // basePath defaults to https://api.tiden.ai; override for self-hosted/local
});

const products = new ProductServiceApi(configuration);
const { data } = await products.productServiceListProducts(workspaceId);
```

See [`api-client/README.md`](api-client/README.md) for the full list of API classes and
[`api-client/docs/`](api-client/docs) for per-endpoint usage examples.

> [!IMPORTANT]
> **Generated — never edit by hand.** This package is generated from the Tiden
> OpenAPI spec and copied in as-is; it arrives here through regeneration PRs
> titled _Regenerate API client from the Tiden OpenAPI spec_. Its version stays
> in lockstep with this repo's shared `vX.Y.Z` release tags — the release
> workflow's version-gate step enforces the match before publishing.

## Releasing

Push a `vX.Y.Z` git tag to release: `.github/workflows/release.yml` builds, tests, and
publishes `@tiden/reporter-commons`, `@tiden/playwright-reporter`, `@tiden/vitest-reporter`,
and `@tiden/api-client` to npm at the versions already set in each package's `package.json`,
using npm's OIDC trusted publishing (no `NPM_TOKEN` secret; provenance attached
automatically).

## Lineage

Forked from [qase-tms/qase-javascript](https://github.com/qase-tms/qase-javascript)
at commit `d77a157020fea088ea323050a36b9bf874ad089d` (Apache-2.0), trimmed to
`commons` (from `qase-javascript-commons`), `playwright` (from `qase-playwright`),
and `vitest` (from `qase-vitest`, ported at the same commit). The wire transport
targets Tiden instead of Qase TestOps, and multi-project (`testops_multi`)
reporting is dropped throughout.
