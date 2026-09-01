# tiden-javascript

Tiden reporters for JavaScript test frameworks. v1 ships the commons layer
and the Playwright, Vitest and Jest reporters, reporting into Tiden's Test Runs API.

## Packages

| Package | Description | README |
|---------|-------------|--------|
| [`commons`](commons) — `@tiden/reporter-commons` | Shared reporter core (config, env, narrow API transport, formatting). Not installed directly — a dependency of framework reporters. | [commons/README.md](commons/README.md) |
| [`playwright`](playwright) — `@tiden/playwright-reporter` | Playwright reporter. Install this in your test project. | [playwright/README.md](playwright/README.md) |
| [`vitest`](vitest) — `@tiden/vitest-reporter` | Vitest reporter. Install this in your test project. | [vitest/README.md](vitest/README.md) |
| [`jest`](jest) — `@tiden/jest-reporter` | Jest reporter. Install this in your test project. | [jest/README.md](jest/README.md) |
| [`api-client`](api-client) | Private generated OpenAPI snapshot used to check the reporter contract at build time. It is not published to npm. | — |

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
network-profiler setup file, and configuration reference.

For Jest, install [`@tiden/jest-reporter`](jest) and register it under `reporters` in
`jest.config.js`:

```sh
npm install --save-dev @tiden/jest-reporter
```

```javascript
module.exports = {
  reporters: ['default', ['@tiden/jest-reporter', {}]],
};
```

See [`jest/README.md`](jest/README.md) for its metadata API (`tiden.*`, which requires
`--runInBand`) and configuration reference. All three reporters read the same
`tiden.config.json` and `TIDEN_*` environment variables.

## API contract strategy

The reporters use only three JSON operations: create a run, report a result batch, and
complete a run. Their purpose-built runtime transport and DTOs live in `commons/src/client/`
instead of pulling the full generated API client into every reporter installation.

The `api-client/` workspace is retained as an unpublished generated snapshot. A compile-time
contract test compares the reporter DTOs with its OpenAPI-generated models, while wire tests
verify paths, bearer auth, payload casing, int64 encoding, error handling, and retries. This
keeps drift protection without making `@tiden/api-client` a public runtime dependency.

## Releasing

Push a `vX.Y.Z` git tag to release: `.github/workflows/release.yml` builds, tests, and
publishes `@tiden/reporter-commons`, `@tiden/playwright-reporter`,
`@tiden/vitest-reporter`, and `@tiden/jest-reporter` to npm at the versions already set in each
package's `package.json`,
using npm's OIDC trusted publishing (no `NPM_TOKEN` secret; provenance attached automatically).
The private `api-client/` snapshot is never published.

## Lineage

Forked from [qase-tms/qase-javascript](https://github.com/qase-tms/qase-javascript)
at commit `d77a157020fea088ea323050a36b9bf874ad089d` (Apache-2.0), trimmed to
`commons` (from `qase-javascript-commons`), `playwright` (from `qase-playwright`),
`vitest` (from `qase-vitest`), and `jest` (from `qase-jest`), all ported at the
same commit. The wire transport
targets Tiden instead of Qase TestOps, and multi-project (`testops_multi`)
reporting is dropped throughout.
