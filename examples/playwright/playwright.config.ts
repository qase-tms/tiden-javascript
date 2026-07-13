import { defineConfig } from '@playwright/test';

/**
 * Minimal example config: reporter and credentials are driven entirely by
 * `TIDEN_*` environment variables (see README "Environment variables" table),
 * so nothing secret lives in this file.
 *
 * Four projects:
 * - `default` runs the non-parametrized example tests once each.
 * - `search` runs the single parametrized test in `tests/search.spec.ts`
 *   twice via `repeatEach: 2` (same literal test title both times), so the
 *   reporter's param-free signature groups both attempts into ONE Tiden
 *   case with 2 parameter combos instead of two separate cases.
 * - `chromium-demo` / `firefox-demo` both run the single test in
 *   `tests/matrix.spec.ts` — a *browser matrix* rather than `repeatEach`.
 *   With the reporter's `framework.browser.addAsParameter` option below, it
 *   folds each project's name into a `browser` parameter and drops it from
 *   the suite path, so the two project runs group into ONE Tiden case with
 *   2 combos, same end result as the `search` project's `repeatEach`
 *   approach but driven by Playwright's own project matrix instead of a
 *   manual `tiden.parameters()` call. (Note: the option is flat under
 *   `framework` in the reporter's own tuple options — NOT nested under an
 *   additional `playwright` key, despite `playwright/src/configSchema.ts`
 *   suggesting otherwise; that schema is dead code, unused by the actual
 *   `reporter.ts`/`result-builder.ts` option-consuming path. Verified live:
 *   the nested form silently no-ops and splits into two cases.)
 *
 * Each project's `testMatch` is scoped to its own spec file so the new
 * matrix projects don't pick up `example.spec.ts`/`search.spec.ts` and vice
 * versa — confirm with `npx playwright test --list`.
 */
export default defineConfig({
  testDir: './tests',
  retries: 1,
  use: {
    headless: true,
  },
  reporter: [
    ['list'],
    ['@tiden/playwright-reporter', { framework: { browser: { addAsParameter: true } } }],
  ],
  projects: [
    { name: 'default', testMatch: /example\.spec\.ts$/ },
    { name: 'search', testMatch: /search\.spec\.ts$/, repeatEach: 2 },
    { name: 'chromium-demo', testMatch: /matrix\.spec\.ts$/ },
    { name: 'firefox-demo', testMatch: /matrix\.spec\.ts$/ },
  ],
});
