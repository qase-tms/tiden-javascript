# tiden-javascript

Tiden reporters for JavaScript test frameworks. v1 ships the commons layer
and the Playwright reporter, reporting into Tiden's Test Runs API.

## Packages

| Package | Description | README |
|---------|-------------|--------|
| [`commons`](commons) — `@tiden/reporter-commons` | Shared reporter core (config, env, API client, formatting). Not installed directly — a dependency of framework reporters. | [commons/README.md](commons/README.md) |
| [`playwright`](playwright) — `@tiden/playwright-reporter` | Playwright reporter. Install this in your test project. | [playwright/README.md](playwright/README.md) |
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
> **Generated — never edit by hand.** This package is produced by
> [`qase-tms/tiden-specs`](https://github.com/qase-tms/tiden-specs) from the Tiden
> OpenAPI spec and copied in as-is; regeneration PRs against this repo come from that
> pipeline. Its version is set by `npmVersion` in tiden-specs' `sdk/ts.yml` and must
> stay in lockstep with this repo's shared `vX.Y.Z` release tags — the release
> workflow's version-gate step enforces the match before publishing.

## Releasing

Push a `vX.Y.Z` git tag to release: `.github/workflows/release.yml` builds, tests, and
publishes `@tiden/reporter-commons`, `@tiden/playwright-reporter`, and `@tiden/api-client`
to npm at the versions already set in each package's `package.json`, using npm's OIDC
trusted publishing (no `NPM_TOKEN` secret; provenance attached automatically). One-time
manual prerequisite: the npm `@tiden` scope owner must add this repo as a Trusted
Publisher for all three packages in npm's package settings before the first tag push
that includes each one.

## Lineage

Forked from [qase-tms/qase-javascript](https://github.com/qase-tms/qase-javascript)
at commit `d77a157020fea088ea323050a36b9bf874ad089d` (Apache-2.0), trimmed to
`commons` (from `qase-javascript-commons`) and `playwright` (from
`qase-playwright`). The wire transport targets Tiden instead of Qase TestOps.
