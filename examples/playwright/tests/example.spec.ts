import { test, expect } from '@playwright/test';
import { tiden } from '@tiden/playwright-reporter';

test('user can add numbers', () => {
  expect(1 + 1).toBe(2);
});

test('user sees failure with steps', async () => {
  await test.step(tiden.step('prepare input'), async () => {
    expect(true).toBe(true);
  });
  await test.step(tiden.step('assert the wrong thing', 'should equal 4'), async () => {
    expect(2 + 2).toBe(5);
  });
});

test('flaky settles on retry', ({}, testInfo) => {
  // Fails on attempt 1 (retry === 0), passes on the retry (retry === 1),
  // thanks to `retries: 1` in playwright.config.ts.
  expect(testInfo.retry).toBeGreaterThan(0);
});

test('captures an attachment', async ({}, testInfo) => {
  await testInfo.attach('note.txt', { body: 'hello from e2e', contentType: 'text/plain' });
  expect(true).toBe(true);
});
