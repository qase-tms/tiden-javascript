/* eslint-disable */
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { VitestTidenReporter } from '../src/index';
import VitestTidenReporterDefault from '../src/index';

const reporterMock = {
  startTestRun: jest.fn(),
  publish: jest.fn().mockResolvedValue(undefined),
  addTestResult: jest.fn().mockResolvedValue(undefined),
};

jest.mock('@tiden/reporter-commons', () => {
  const actual = jest.requireActual<typeof import('@tiden/reporter-commons')>('@tiden/reporter-commons');
  return {
    ...actual,
    TidenReporter: {
      getInstance: jest.fn(() => reporterMock),
    },
    composeOptions: jest.fn(() => ({})),
    determineTestStatus: jest.fn((error: unknown, originalStatus: string) => {
      if (error) return 'failed';
      if (originalStatus === 'passed') return 'passed';
      if (originalStatus === 'skipped') return 'skipped';
      return 'failed';
    }),
    ConfigLoader: jest.fn().mockImplementation(() => ({
      load: jest.fn(() => null),
    })),
  };
});

const mkTestCase = (overrides: any = {}) => ({
  name: 'Test',
  id: 'test-id',
  fullName: 'Suite > Test',
  result: jest.fn().mockReturnValue({ state: 'passed', errors: [] }),
  diagnostic: jest.fn().mockReturnValue({ duration: 100 }),
  meta: jest.fn().mockReturnValue({}),
  ...overrides,
}) as any;

describe('VitestTidenReporter', () => {
  let reporter: VitestTidenReporter;

  beforeEach(() => {
    jest.clearAllMocks();
    reporter = new VitestTidenReporter();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('VitestTidenReporter is the default export', () => {
      expect(VitestTidenReporterDefault).toBe(VitestTidenReporter);
    });
  });

  describe('constructor', () => {
    it('initializes commons reporter with framework metadata', () => {
      const { TidenReporter } = require('@tiden/reporter-commons');
      expect(TidenReporter.getInstance).toHaveBeenCalledWith(expect.objectContaining({
        frameworkPackage: 'vitest',
        frameworkName: 'vitest',
        reporterName: '@tiden/vitest-reporter',
      }));
    });

    it('accepts custom configLoader and calls load() on it', () => {
      const mockConfigLoader = { load: jest.fn().mockReturnValue({ debug: true }) };
      const composeOptionsMock = jest.requireMock('@tiden/reporter-commons').composeOptions;
      new VitestTidenReporter({}, mockConfigLoader as any);
      expect(mockConfigLoader.load).toHaveBeenCalled();
      expect(composeOptionsMock).toHaveBeenCalledWith({}, { debug: true });
    });

    it('passes constructor options to composeOptions', () => {
      const mockConfigLoader = { load: jest.fn().mockReturnValue(null) };
      const composeOptionsMock = jest.requireMock('@tiden/reporter-commons').composeOptions;
      new VitestTidenReporter({ mode: 'off' } as any, mockConfigLoader as any);
      expect(composeOptionsMock).toHaveBeenCalledWith({ mode: 'off' }, null);
    });

    it('initializes metadataAccumulator and profilerTracker', () => {
      expect((reporter as any).metadataAccumulator).toBeDefined();
      expect((reporter as any).profilerTracker).toBeDefined();
    });
  });

  describe('onTestRunStart', () => {
    it('calls commons reporter.startTestRun', () => {
      reporter.onTestRunStart?.();
      expect(reporterMock.startTestRun).toHaveBeenCalled();
    });
  });

  describe('onTestRunEnd', () => {
    it('awaits commons reporter.publish', async () => {
      await reporter.onTestRunEnd?.();
      expect(reporterMock.publish).toHaveBeenCalled();
    });
  });

  describe('onTestCaseAnnotate', () => {
    it('forwards annotations to MetadataAccumulator', () => {
      const tc = mkTestCase();
      reporter.onTestCaseAnnotate?.(tc, { message: 'Tiden Title: From Annotation' } as any);
      const m = (reporter as any).metadataAccumulator.getMetadata('test-id');
      expect(m?.title).toBe('From Annotation');
    });
  });

  describe('onTestSuiteReady / onTestSuiteResult', () => {
    it('sets and clears currentSuite via MetadataAccumulator', () => {
      reporter.onTestSuiteReady?.({ name: 'My Suite' } as any);
      expect((reporter as any).metadataAccumulator.getCurrentSuite()).toBe('My Suite');
      reporter.onTestSuiteResult?.();
      expect((reporter as any).metadataAccumulator.getCurrentSuite()).toBeUndefined();
    });
  });

  describe('rootDir', () => {
    // Regression: rootDir was declared as an option and threaded into the
    // ResultBuilder, but TIDEN_ROOT_DIR never reached it — env is merged
    // inside commons' OptionsResolver, whose result a framework reporter
    // never sees. The setting looked wired and silently did nothing.
    const KEY = 'TIDEN_ROOT_DIR';
    let saved: string | undefined;

    beforeEach(() => {
      saved = process.env[KEY];
      delete process.env[KEY];
    });

    afterEach(() => {
      if (saved === undefined) delete process.env[KEY];
      else process.env[KEY] = saved;
    });

    const signatureFor = async (moduleId: string): Promise<string> => {
      const r = new VitestTidenReporter();
      await r.onTestCaseResult?.(mkTestCase({
        fullName: 'Suite > Test',
        module: { moduleId },
      }));
      const calls = reporterMock.addTestResult.mock.calls;
      return (calls[calls.length - 1]?.[0] as any).signature;
    };

    it('reads TIDEN_ROOT_DIR from the environment', async () => {
      process.env[KEY] = '/repo';
      expect(await signatureFor('/repo/app/frontend/src/a.test.ts'))
        .toBe('app/frontend/src/a.test.ts::suite::test');
    });

    it('falls back to process.cwd() when TIDEN_ROOT_DIR is unset', async () => {
      expect(await signatureFor(`${process.cwd()}/src/a.test.ts`))
        .toBe('src/a.test.ts::suite::test');
    });

    it('ignores an empty TIDEN_ROOT_DIR rather than treating it as a root', async () => {
      process.env[KEY] = '';
      expect(await signatureFor(`${process.cwd()}/src/a.test.ts`))
        .toBe('src/a.test.ts::suite::test');
    });
  });

  describe('onTestCaseResult', () => {
    it('forwards a built result to commons reporter.addTestResult', async () => {
      const tc = mkTestCase({ name: 'Test (Tiden ID: 42)' });
      await reporter.onTestCaseResult?.(tc);
      expect(reporterMock.addTestResult).toHaveBeenCalled();
      const call = (reporterMock.addTestResult.mock.calls[0] as any[])[0];
      expect(call.case_id).toBe(42);
      expect(call.execution.status).toBe('passed');
    });

    it('applies metadata.title from annotation', async () => {
      const tc = mkTestCase({ name: 'Test (Tiden ID: 1)' });
      reporter.onTestCaseAnnotate?.(tc, { message: 'Tiden Title: Override' } as any);
      await reporter.onTestCaseResult?.(tc);
      const call = (reporterMock.addTestResult.mock.calls[0] as any[])[0];
      expect(call.title).toBe('Override');
    });

    it('clears metadata after processing the test case', async () => {
      const tc = mkTestCase();
      reporter.onTestCaseAnnotate?.(tc, { message: 'Tiden Title: x' } as any);
      await reporter.onTestCaseResult?.(tc);
      const m = (reporter as any).metadataAccumulator.getMetadata('test-id');
      expect(m).toBeUndefined();
    });

    it('appends worker profiler steps from testCase.meta()._tidenProfilerSteps', async () => {
      const profilerSteps = [{ id: 'worker-step-1' }];
      const tc = mkTestCase({
        meta: jest.fn().mockReturnValue({ _tidenProfilerSteps: JSON.stringify(profilerSteps) }),
      });
      await reporter.onTestCaseResult?.(tc);
      const call = (reporterMock.addTestResult.mock.calls[0] as any[])[0];
      expect(call.steps.length).toBeGreaterThan(0);
    });

    it('silently swallows malformed worker profiler steps JSON', async () => {
      const tc = mkTestCase({
        meta: jest.fn().mockReturnValue({ _tidenProfilerSteps: 'not-json' }),
      });
      await expect(reporter.onTestCaseResult?.(tc)).resolves.not.toThrow();
    });
  });
});
