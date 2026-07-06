import test from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';
import { PlaywrightTidenReporter } from './reporter';
import * as path from 'path';
import { getMimeTypes } from '@tiden/reporter-commons';
import { filterPositiveIds } from '@tiden/reporter-commons/internal';

export const ReporterContentType = 'application/tiden.metadata+json';
const defaultContentType = 'application/octet-stream';

export interface MetadataMessage {
  ids?: number[];
  title?: string;
  fields?: Record<string, string>;
  parameters?: Record<string, string>;
  groupParams?: Record<string, string>;
  ignore?: boolean;
  suite?: string;
  comment?: string;
  tags?: string[];
}

/**
 * Set IDs for the test case
 *
 * @param caseId
 * @param name
 * @example
 * test(tiden(1, 'test'), async ({ page }) => {
 *  await page.goto('https://example.com');
 * });
 * @returns {string}
 */
export const tiden = (
  caseId: number | string | number[] | string[],
  name: string,
): string => {
  const caseIds = Array.isArray(caseId) ? caseId : [caseId];
  const ids: number[] = [];

  for (const id of caseIds) {
    if (typeof id === 'number') {
      ids.push(id);
      continue;
    }

    const parsedId = parseInt(id);

    if (!isNaN(parsedId)) {
      ids.push(parsedId);
      continue;
    }

    console.log(`tiden: ID ${id} should be a number`);
  }

  const newName = `${name} (Tiden ID: ${caseIds.join(',')})`;

  const filteredIds = filterPositiveIds(ids);
  if (filteredIds.length > 0) {
    PlaywrightTidenReporter.addIds(filteredIds, newName);
  }

  return newName;
};

/**
 * Set IDs for the test case
 * Use `tiden()` instead. This method is deprecated and kept for reverse compatibility.
 *
 * @param {number | number[]} value
 *
 * @example
 * test('test', async ({ page }) => {
 *    tiden.id(1);
 *    await page.goto('https://example.com');
 * });
 *
 */
tiden.id = function(value: number | number[]) {
  const ids = filterPositiveIds(Array.isArray(value) ? value : [value]);
  if (ids.length > 0) {
    addMetadata({ ids });
  }
  return this;
};

/**
 * Set a title for the test case
 * @param {string} value
 * @example
 * test('test', async ({ page }) => {
 *    tiden.title("Title");
 *    await page.goto('https://example.com');
 * });
 */
tiden.title = function(value: string) {
  addMetadata({
    title: value,
  });
  return this;
};

/**
 * Set fields for the test case
 * @param {Record<string, string>[]} values
 * @example
 * test('test', async ({ page }) => {
 *    tiden.fields({ 'severity': 'high', 'priority': 'medium' });
 *    await page.goto('https://example.com');
 * });
 */
tiden.fields = function(values: Record<string, string>) {
  const stringRecord: Record<string, string> = {};
  for (const [key, value] of Object.entries(values)) {
    stringRecord[String(key)] = String(value);
  }

  addMetadata({
    fields: stringRecord,
  });
  return this;
};

/**
 * Set parameters for the test case.
 *
 * To group parameter combinations under a single test case, use `repeatEach` in
 * your config and access the current repetition via `testInfo.repeatEachIndex`.
 * Do not interpolate parameter values into the test title — each distinct title
 * becomes a separate case in Tiden.
 *
 * @param {Record<string, string>} values
 * @example
 * // playwright.config.ts
 * { name: 'search', testMatch: /search\.spec\.ts$/, repeatEach: 2 }
 *
 * // search.spec.ts
 * const browsers = ['chromium', 'firefox'];
 * test('search works', ({}, testInfo) => {
 *   tiden.parameters({ browser: browsers[testInfo.repeatEachIndex] ?? browsers[0] });
 *   // test logic...
 * });
 */
tiden.parameters = function(values: Record<string, string>) {
  const stringRecord: Record<string, string> = {};
  for (const [key, value] of Object.entries(values)) {
    stringRecord[String(key)] = String(value);
  }

  addMetadata({
    parameters: stringRecord,
  });
  return this;
};

/**
 * Set group parameters for the test case.
 * All parameters will be grouped as a single entity.
 *
 * To group parameter combinations under a single test case, use `repeatEach` in
 * your config and access the current repetition via `testInfo.repeatEachIndex`.
 * Do not interpolate parameter values into the test title — each distinct title
 * becomes a separate case in Tiden.
 *
 * @param {Record<string, string>} values
 * @example
 * // playwright.config.ts
 * { name: 'search', testMatch: /search\.spec\.ts$/, repeatEach: 2 }
 *
 * // search.spec.ts
 * const configs = ['light', 'dark'];
 * test('theme switching', ({}, testInfo) => {
 *   tiden.groupParameters({ theme: configs[testInfo.repeatEachIndex] ?? configs[0] });
 *   // test logic...
 * });
 */
tiden.groupParameters = function(values: Record<string, string>) {
  const stringRecord: Record<string, string> = {};
  for (const [key, value] of Object.entries(values)) {
    stringRecord[String(key)] = String(value);
  }

  addMetadata({
    groupParams: stringRecord,
  });
  return this;
};

/**
 * Attach a file to the test case or the step
 * @param attach
 * @example
 * test('test', async ({ page }) => {
 *   tiden.attach({ name: 'attachment.txt', content: 'Hello, world!', contentType: 'text/plain' });
 *   tiden.attach({ paths: '/path/to/file'});
 *   tiden.attach({ paths: ['/path/to/file', '/path/to/another/file']});
 *   await page.goto('https://example.com');
 *  });
 */
tiden.attach = function(attach: {
  name?: string,
  paths?: string | string[],
  content?: Buffer | string,
  contentType?: string,
}) {
  if (attach.paths !== undefined) {
    const files = Array.isArray(attach.paths) ? attach.paths : [attach.paths];

    for (const file of files) {
      const attachmentName = path.basename(file);
      const contentType: string = getMimeTypes(file);
      addAttachment(attachmentName, contentType, file);
    }

    return this;
  }
  const attachmentName = attach.name ?? 'attachment';
  const contentType = attach.contentType ?? defaultContentType;
  addAttachment(attachmentName, contentType, undefined, attach.content);

  return this;
};

/**
 * Ignore the test case result in Tiden
 * @example
 * test('test', async ({ page }) => {
 *   tiden.ignore();
 *   await page.goto('https://example.com');
 * });
 */
tiden.ignore = function() {
  addMetadata({
    ignore: true,
  });
  return this;
};

/**
 * Set a suite for the test case
 * @param {string} value
 * @example
 * test('test', async ({ page }) => {
 *    tiden.suite("Suite");
 *    await page.goto('https://example.com');
 * });
 */
tiden.suite = function(value: string) {
  addMetadata({
    suite: value,
  });
  return this;
};

/**
 * Set a comment for the test case
 * @param {string} value
 * @example
 * test('test', async ({ page }) => {
 *    tiden.comment("Comment");
 *    await page.goto('https://example.com');
 * });
 */
tiden.comment = function(value: string) {
  addMetadata({
    comment: value,
  });
  return this;
};

/**
 * Set tags for the test case
 * @param {...string} values
 * @example
 * test('test', async ({ page }) => {
 *    tiden.tags('smoke', 'regression');
 *    await page.goto('https://example.com');
 * });
 */
tiden.tags = function(...values: string[]) {
  addMetadata({
    tags: values,
  });
  return this;
};

/**
 * Build a step title with optional expected result and data markers.
 *
 * This is a title decorator, not a step runner: it returns a string meant to be
 * passed to Playwright's `test.step()`. `expectedResult` and `data` are optional.
 *
 * @param action — step title
 * @param expectedResult — optional expected result
 * @param data — optional step data
 * @example
 * test('test', async ({ page }) => {
 *    await test.step(tiden.step('action'), async () => {
 *      await page.goto('https://example.com');
 *    });
 *    await test.step(tiden.step('action', 'expected result', 'data'), async () => {
 *      await page.goto('https://example.com');
 *    });
 * });
 */
tiden.step = function(action: string, expectedResult?: string, data?: string): string {
  return `${action} TidenExpRes:${expectedResult ? `: ${expectedResult}` : ''} TidenData:${data ? `: ${data}` : ''}`;
};


const addMetadata = (metadata: MetadataMessage): void => {
  test.info().attach('tiden-metadata.json', {
    contentType: ReporterContentType,
    body: Buffer.from(JSON.stringify(metadata), 'utf8'),
  }).catch(() => {/**/
  });
};

const addAttachment = (name: string, contentType: string, filePath?: string, body?: string | Buffer) => {
  const stepName = filePath != undefined ? `step_attach_file_${uuidv4()}_${name}` : `step_attach_body_${uuidv4()}_${name}`;

  test.step(stepName, async () => {
    if (filePath) {
      await test.info().attach(stepName, {
        contentType: contentType,
        body: filePath,
      });
    }

    if (body) {
      await test.info().attach(stepName, {
        contentType: contentType,
        body: body,
      });
    }
  }).catch(() => {/**/
  });
};

