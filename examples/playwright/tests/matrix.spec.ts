import { test, expect } from '@playwright/test';

// One test, run under two Playwright projects. With
// framework.browser.addAsParameter enabled, the project name
// becomes a `browser` parameter and is filtered out of the suite path, so
// Tiden groups both runs as ONE case with two combos.
test('matrix: homepage title is stable', () => {
  expect('Tiden'.length).toBeGreaterThan(0);
});
