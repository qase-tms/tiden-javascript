import path from 'path';
import { getMimeTypes, TidenStep, StepFunction } from '@tiden/reporter-commons';
import { v4 as uuidv4 } from 'uuid';

/**
 * Link a test to one or more Tiden cases by encoding the ids into its title.
 *
 * This is the only metadata channel that survives Jest's worker boundary — the
 * title travels with the result itself. Every `tiden.*` helper below goes
 * through `global.Tiden`, which only reaches the reporter when tests and
 * reporter share a process (`--runInBand` / `maxWorkers=1`).
 *
 * @example test(tiden(1, 'Login flow'), () => { ... });
 */
export const tiden = (
  caseId: number | string | number[] | string[],
  name: string,
): string => {
  const caseIds = Array.isArray(caseId) ? caseId : [caseId];

  return `${name} (Tiden ID: ${caseIds.join(',')})`;
};

/**
 * Set a title for the test case
 * @param {string} value
 * @example
 * test('test', () => {
 *    tiden.title("Title");
 *     expect(true).toBe(true);
 * });
 */
tiden.title = (value: string): void => {
  // @ts-expect-error - global.Tiden is dynamically added at runtime
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  global.Tiden.title(value);
};

/**
 * Ignore the test case
 * @example
 * test('test', () => {
 *    tiden.ignore();
 *     expect(true).toBe(true);
 * });
 */
tiden.ignore = (): void => {
  // @ts-expect-error - global.Tiden is dynamically added at runtime
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  global.Tiden.ignore();
};

/**
 * Add a comment to the test case
 * @param {string} value
 * @example
 * test('test', () => {
 *    tiden.comment("Comment");
 *     expect(true).toBe(true);
 * });
 */
tiden.comment = (value: string): void => {
  // @ts-expect-error - global.Tiden is dynamically added at runtime
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  global.Tiden.comment(value);
};

/**
 * Set a suite for the test case
 * @param {string} value
 * @example
 * test('test', () => {
 *    tiden.suite("Suite");
 *     expect(true).toBe(true);
 * });
 */
tiden.suite = (value: string): void => {
  // @ts-expect-error - global.Tiden is dynamically added at runtime
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  global.Tiden.suite(value);
};

/**
 * Set fields for the test case
 * @param {Record<string, string>} values
 * @example
 * test('test', () => {
 *    tiden.fields({field: "value"});
 *     expect(true).toBe(true);
 * });
 */
tiden.fields = (values: Record<string, string>): void => {
  // @ts-expect-error - global.Tiden is dynamically added at runtime
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  global.Tiden.fields(values);
};

/**
 * Set parameters for the test case
 * @param {Record<string, string>} values
 * @example
 * test('test', () => {
 *    tiden.parameters({param: "value"});
 *     expect(true).toBe(true);
 * });
 */
tiden.parameters = (values: Record<string, string>): void => {
  // @ts-expect-error - global.Tiden is dynamically added at runtime
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  global.Tiden.parameters(values);
};

/**
 * Set group params for the test case
 * @param {Record<string, string>} values
 * @example
 * test('test', () => {
 *    tiden.groupParameters({param: "value"});
 *     expect(true).toBe(true);
 * });
 */
tiden.groupParameters = (values: Record<string, string>): void => {
  // @ts-expect-error - global.Tiden is dynamically added at runtime
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  global.Tiden.groupParams(values);
};

/**
 * Set tags for the test case
 * @param {...string} values
 * @example
 * test('test', () => {
 *    tiden.tags('smoke', 'regression');
 *     expect(true).toBe(true);
 * });
 */
tiden.tags = (...values: string[]): void => {
  // @ts-expect-error - global.Tiden is dynamically added at runtime
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  global.Tiden.tags(values);
};

/**
 * Add a step to the test case
 * @param name
 * @param body
 * @param expectedResult
 * @param data
 * @example
 * test('test', async () => {
 *    await tiden.step("Step", () => {
 *      expect(true).toBe(true);
 *    });
 * });
 * @example
 * test('test', async () => {
 *    await tiden.step("Step", () => {
 *      expect(true).toBe(true);
 *    }, "Expected result", "Input data");
 * });
 */
tiden.step = async (
  name: string,
  body: StepFunction,
  expectedResult?: string,
  data?: string,
): Promise<void> => {
  // The expected result and input data are encoded into the step name because
  // there is no richer channel; MetadataApplier splits them back out.
  const stepName =
    expectedResult || data
      ? `${name} TidenExpRes:${expectedResult ? `: ${expectedResult}` : ''} TidenData:${data ? `: ${data}` : ''}`
      : name;
  const runningStep = new TidenStep(stepName);
  // eslint-disable-next-line @typescript-eslint/require-await
  await runningStep.run(body, async (step) => {
    // @ts-expect-error - global.Tiden is dynamically added at runtime
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
    return global.Tiden.step(step);
  });
};

/**
 * Add an attachment to the test case
 * @param attach
 * @example
 * test('test', () => {
 *   tiden.attach({ name: 'attachment.txt', content: 'Hello, world!', type: 'text/plain' });
 *   tiden.attach({ paths: ['/path/to/file', '/path/to/another/file']});
 * });
 */
tiden.attach = (attach: {
  name?: string;
  type?: string;
  content?: string;
  paths?: string[];
}): void => {
  if (attach.paths) {
    for (const file of attach.paths) {
      const attachmentName = path.basename(file);
      const contentType: string = getMimeTypes(file);

      // @ts-expect-error - global.Tiden is dynamically added at runtime
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      global.Tiden.attachment({
        file_path: file,
        size: 0,
        id: uuidv4(),
        file_name: attachmentName,
        mime_type: contentType,
        content: '',
      });
    }
    return;
  }

  if (attach.content) {
    // @ts-expect-error - global.Tiden is dynamically added at runtime
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    global.Tiden.attachment({
      file_path: null,
      size: attach.content.length,
      id: uuidv4(),
      file_name: attach.name ?? 'attachment',
      mime_type: attach.type ?? 'application/octet-stream',
      content: attach.content,
    });
  }
};
