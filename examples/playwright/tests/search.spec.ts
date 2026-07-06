import { test, expect } from '@playwright/test';
import { tiden } from '@tiden/playwright-reporter';

// Runs twice, courtesy of the `search` project's `repeatEach: 2` in
// playwright.config.ts — same literal test title both times (Playwright would
// reject two `test()` calls sharing a title within one project), so the
// reporter's param-free signature groups the two attempts into ONE Tiden case
// with 2 parameter combos (browser=chromium / browser=firefox) instead of two
// separate cases.
const browsers = ['chromium', 'firefox'];

test('search works across browsers', ({}, testInfo) => {
  const browser = browsers[testInfo.repeatEachIndex] ?? browsers[0]!;
  tiden.parameters({ browser });
  expect(browser.length).toBeGreaterThan(0);
});
