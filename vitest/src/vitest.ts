import { TidenStep, getMimeTypes } from '@tiden/reporter-commons';
import path from 'path';

// Type for step function
type StepFunction = () => Promise<void> | void;

// Function to add Tiden ID to test name
export const addTidenId = (name: string, caseIds: number[]): string => {
  return `${name} (Tiden ID: ${caseIds.join(',')})`;
};

// Type for annotate function from Vitest
type AnnotateFunction = (message: string, options?: unknown) => Promise<void>;

// Type for tiden wrapper functions
export interface TidenWrapper {
  annotate(message: string, options?: unknown): Promise<void>;
  title(value: string): Promise<void>;
  comment(value: string): Promise<void>;
  suite(value: string): Promise<void>;
  fields(values: Record<string, string>): Promise<void>;
  parameters(values: Record<string, string>): Promise<void>;
  groupParameters(values: Record<string, string>): Promise<void>;
  tags(...values: string[]): Promise<void>;
  step(name: string, body: StepFunction, expectedResult?: string, data?: string): Promise<void>;
  attach(attach: {
    name?: string;
    type?: string;
    content?: string;
    paths?: string[];
  }): Promise<void>;
}

// Type for test context with tiden
export interface TestContextWithTiden {
  tiden: TidenWrapper;
  annotate: AnnotateFunction;
}

/**
 * Create tiden wrapper for annotate function
 * @param annotate - Vitest annotate function
 * @returns TidenWrapper object with all tiden methods
 */
const createTidenWrapper = (annotate: AnnotateFunction): TidenWrapper => {
  return {
    async annotate(message: string, options?: unknown) {
      return await annotate(message, options);
    },

    /**
     * Set a title for the test case
     * @param {string} value
     * @example
     * test('test', withTiden(async ({ tiden }) => {
     *    await tiden.title("Title");
     *     expect(true).toBe(true);
     * }));
     */
    async title(value: string): Promise<void> {
      return await annotate(`Tiden Title: ${value}`, { type: 'tiden-title', body: value });
    },


    /**
     * Add a comment to the test case
     * @param {string} value
     * @example
     * test('test', withTiden(async ({ tiden }) => {
     *    await tiden.comment("Comment");
     *     expect(true).toBe(true);
     * }));
     */
    async comment(value: string): Promise<void> {
      return await annotate(`Tiden Comment: ${value}`, { type: 'tiden-comment', body: value });
    },

    /**
     * Set a suite for the test case
     * @param {string} value
     * @example
     * test('test', withTiden(async ({ tiden }) => {
     *    await tiden.suite("Suite");
     *     expect(true).toBe(true);
     * }));
     */
    async suite(value: string): Promise<void> {
      return await annotate(`Tiden Suite: ${value}`, { type: 'tiden-suite', body: value });
    },

    /**
     * Set fields for the test case
     * @param {Record<string, string>} values
     * @example
     * test('test', withTiden(async ({ tiden }) => {
     *    await tiden.fields({field: "value"});
     *     expect(true).toBe(true);
     * }));
     */
    async fields(values: Record<string, string>): Promise<void> {
      return await annotate(`Tiden Fields: ${JSON.stringify(values)}`, { type: 'tiden-fields', body: JSON.stringify(values) });
    },

    /**
     * Set parameters for the test case
     * @param {Record<string, string>} values
     * @example
     * test('test', withTiden(async ({ tiden }) => {
     *    await tiden.parameters({param: "value"});
     *     expect(true).toBe(true);
     * }));
     */
    async parameters(values: Record<string, string>): Promise<void> {
      return await annotate(`Tiden Parameters: ${JSON.stringify(values)}`, { type: 'tiden-parameters', body: JSON.stringify(values) });
    },

    /**
     * Set group parameters for the test case
     * @param {Record<string, string>} values
     * @example
     * test('test', withTiden(async ({ tiden }) => {
     *    await tiden.groupParameters({param: "value"});
     *     expect(true).toBe(true);
     * }));
     */
    async groupParameters(values: Record<string, string>): Promise<void> {
      return await annotate(`Tiden Group Parameters: ${JSON.stringify(values)}`, { type: 'tiden-group-parameters', body: JSON.stringify(values) });
    },

    /**
     * Set tags for the test case
     * @param {...string} values
     * @example
     * test('test', withTiden(async ({ tiden }) => {
     *    await tiden.tags('smoke', 'regression');
     *     expect(true).toBe(true);
     * }));
     */
    async tags(...values: string[]): Promise<void> {
      return await annotate(`Tiden Tags: ${values.join(',')}`, { type: 'tiden-tags', body: JSON.stringify(values) });
    },

    /**
     * Add a step to the test case
     * @param name
     * @param body
     * @param expectedResult
     * @param data
     * @example
     * test('test', withTiden(async ({ tiden }) => {
     *    await tiden.step("Step", () => {
     *      expect(true).toBe(true);
     *    });
     *     expect(true).toBe(true);
     * }));
     * @example
     * test('test', withTiden(async ({ tiden }) => {
     *    await tiden.step("Step", () => {
     *      expect(true).toBe(true);
     *    }, "Expected result", "Input data");
     *     expect(true).toBe(true);
     * }));
     */
    async step(name: string, body: StepFunction, expectedResult?: string, data?: string): Promise<void> {
      const stepName = expectedResult || data
        ? `${name} TidenExpRes:${expectedResult ? `: ${expectedResult}` : ''} TidenData:${data ? `: ${data}` : ''}`
        : name;
      await annotate(`Tiden Step Start: ${stepName}`, { type: 'tiden-step-start', body: stepName });
      try {
        const runningStep = new TidenStep(stepName);
        await runningStep.run(body, async (step) => {
          const stepName = 'action' in step.data ? step.data.action : 'name' in step.data ? step.data.name : `${step.data.request_method} ${step.data.request_url}`;
          await annotate(`Tiden Step: ${stepName}`, { type: 'tiden-step', body: stepName });
        });
        await annotate(`Tiden Step End: ${stepName}`, { type: 'tiden-step-end', body: stepName });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        await annotate(`Tiden Step Failed: ${stepName} - ${errorMessage}`, { type: 'tiden-step-failed', body: `${stepName} - ${errorMessage}` });
        throw error;
      }
    },

    /**
     * Add an attachment to the test case
     * @param attach
     * @example
     * test('test', withTiden(async ({ tiden }) => {
     *   await tiden.attach({ name: 'attachment.txt', content: 'Hello, world!', type: 'text/plain' });
     *   await tiden.attach({ paths: ['/path/to/file', '/path/to/another/file']});
     *     expect(true).toBe(true);
     * }));
     */
    async attach(attach: {
      name?: string;
      type?: string;
      content?: string;
      paths?: string[];
    }): Promise<void> {
      if (attach.paths) {
        for (const file of attach.paths) {
          const attachmentName = path.basename(file);
          const contentType: string = getMimeTypes(file);

          await annotate(`Tiden Attachment: ${attachmentName}`, {
            type: 'tiden-attachment',
            body: attachmentName,
            attachment: {
              path: file,
              contentType: contentType
            }
          });
        }
        return;
      }

      if (attach.content) {
        await annotate(`Tiden Attachment: ${attach.name ?? 'attachment'}`, {
          type: 'tiden-attachment',
          body: attach.content,
          attachment: {
            contentType: attach.type ?? 'application/octet-stream',
            body: attach.content
          }
        });
      }
    }
  };
};

/**
 * Higher-order function that extends test context with tiden functions
 * @param testFn - Test function that receives context with tiden
 * @returns Wrapped test function
 * @example
 * test('hello world', withTiden(async ({ tiden, annotate }) => {
 *   await tiden.title("My Test Title");
 *   await tiden.comment("This is a test comment");
 *
 *   if (condition) {
 *     await tiden.annotate('this should\'ve errored', 'error');
 *   }
 * }));
 */
export const withTiden = <T extends unknown[]>(
  testFn: (context: TestContextWithTiden & T[0]) => unknown
) => {
  return async (context: T[0] & { annotate: AnnotateFunction }) => {
    const tiden = createTidenWrapper(context.annotate);
    return await testFn({ ...context, tiden } as TestContextWithTiden & T[0]);
  };
};
