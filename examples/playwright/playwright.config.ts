import { defineConfig } from '@playwright/test';

/**
 * Minimal example config: reporter and credentials are driven entirely by
 * `TIDEN_*` environment variables (see README "Environment variables" table),
 * so nothing secret lives in this file.
 *
 * Two projects:
 * - `default` runs the non-parametrized example tests once each.
 * - `search` runs the single parametrized test in `tests/search.spec.ts`
 *   twice via `repeatEach: 2` (same literal test title both times), so the
 *   reporter's param-free signature groups both attempts into ONE Tiden
 *   case with 2 parameter combos instead of two separate cases.
 */
export default defineConfig({
  testDir: './tests',
  retries: 1,
  use: {
    headless: true,
  },
  reporter: [
    ['list'],
    ['@tiden/playwright-reporter'],
  ],
  projects: [
    { name: 'default', testMatch: /example\.spec\.ts$/ },
    { name: 'search', testMatch: /search\.spec\.ts$/, repeatEach: 2 },
  ],
});
