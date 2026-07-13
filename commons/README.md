# @tiden/reporter-commons

Shared reporter core for Tiden's JavaScript test framework reporters: config loading
(`tiden.config.json`), environment-variable resolution (`TIDEN_*`), the Tiden API client, result
formatting, status mapping/filtering, and the HTTP network profiler.

See the [root README](https://github.com/qase-tms/tiden-javascript/blob/main/README.md#lineage) for this package's fork lineage.

## Who uses this

This package is **not meant to be installed or configured directly** in a test project — it's a
dependency of framework-specific reporters (currently [`@tiden/playwright-reporter`](https://github.com/qase-tms/tiden-javascript/blob/main/playwright/README.md)).
Install and configure the reporter for your framework instead; it composes this package's config
loader, env resolver, and API client internally.

## Configuration & environment variables

The `tiden.config.json` schema and the full `TIDEN_*` environment variable table (which this
package's `env-enum.ts` defines and every consuming reporter shares) are documented once, in the
consumer-facing [`playwright/README.md`](https://github.com/qase-tms/tiden-javascript/blob/main/playwright/README.md#configuration) — see that file
for the config example, the env-var reference table, and the note on how these variables line up
with the `tiden` CLI's own environment variables.

## If you're building a new reporter

If you're adding a reporter for another framework, this package provides the pieces you'll wire
up: `ConfigLoader` (file), `envToConfig`/`envValidationSchema` (env), `TidenReporter` (orchestrator
with fallback handling), `RunReporter` / `ReportReporter` (the two reporting modes), and
`TidenApiClient` (the Tiden Test Runs API client). Read the source under `src/` — there is no
separate contributor guide yet.

## License

Apache License 2.0. See [LICENSE](https://github.com/qase-tms/tiden-javascript/blob/main/LICENSE) for details.
