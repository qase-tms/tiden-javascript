/* eslint-disable */
import { describe, it, expect, beforeEach } from '@jest/globals';

const reporterMock = {
  startTestRun: jest.fn(),
  addTestResult: jest.fn().mockResolvedValue(undefined),
  publish: jest.fn().mockResolvedValue(undefined),
  isCaptureLogs: jest.fn().mockReturnValue(false),
};

const composeOptionsMock = jest.fn((options: any, config: any) => ({ ...options, ...config }));
const loadMock = jest.fn().mockReturnValue({});

jest.mock('@tiden/reporter-commons', () => {
  const actual =
    jest.requireActual<typeof import('@tiden/reporter-commons')>('@tiden/reporter-commons');
  return {
    ...actual,
    TidenReporter: { getInstance: jest.fn(() => reporterMock) },
    composeOptions: (...args: any[]) => (composeOptionsMock as any)(...args),
    ConfigLoader: jest.fn().mockImplementation(() => ({ load: loadMock })),
  };
});

import { TidenReporter } from '@tiden/reporter-commons';
import { JestTidenReporter } from '../src/reporter';

const SPEC = '/repo/src/login.test.ts';

const mkAssertion = (overrides: any = {}): any => ({
  title: 'logs in',
  fullName: 'Auth logs in',
  ancestorTitles: ['Auth'],
  status: 'passed',
  duration: 10,
  failureDetails: [],
  failureMessages: [],
  ...overrides,
});

const mkReporter = () => new JestTidenReporter(undefined, {} as any, undefined);

beforeEach(() => {
  jest.clearAllMocks();
  loadMock.mockReturnValue({});
});

describe('constructor', () => {
  it('identifies itself as the Jest reporter to commons', () => {
    mkReporter();
    expect(TidenReporter.getInstance).toHaveBeenCalledWith(
      expect.objectContaining({
        frameworkPackage: 'jest',
        frameworkName: 'jest',
        reporterName: '@tiden/jest-reporter',
      }),
    );
  });

  it('composes reporter options first and the config file second, so the file wins', () => {
    // env is folded in last inside commons, giving env > config file > options.
    loadMock.mockReturnValue({ mode: 'tiden' });
    new JestTidenReporter(undefined, { mode: 'off' } as any, undefined);
    expect(composeOptionsMock).toHaveBeenCalledWith({ mode: 'off' }, { mode: 'tiden' });
  });

  it('installs the global.Tiden bridge', () => {
    mkReporter();
    expect((global as any).Tiden).toBeDefined();
  });
});

describe('run lifecycle', () => {
  it('starts the run on onRunStart', () => {
    mkReporter().onRunStart();
    expect(reporterMock.startTestRun).toHaveBeenCalledTimes(1);
  });

  it('publishes exactly once across onRunComplete and onRunnerEnd', async () => {
    // Jest <=29 calls onRunComplete, Jest 30 calls onRunnerEnd, and a version
    // calling both must still produce a single publish.
    const reporter = mkReporter();
    await Promise.all([reporter.onRunComplete(), reporter.onRunnerEnd()]);
    expect(reporterMock.publish).toHaveBeenCalledTimes(1);
  });

  it('returns an awaitable promise from onRunComplete', async () => {
    const reporter = mkReporter();
    await expect(reporter.onRunComplete()).resolves.toBeUndefined();
  });
});

describe('onTestCaseResult', () => {
  it('reports a result with the captured start time', () => {
    const reporter = mkReporter();
    reporter.onTestCaseStart({ path: SPEC } as any, {
      fullName: 'Auth logs in',
      startedAt: 1_700_000_000_000,
    } as any);
    reporter.onTestCaseResult({ path: SPEC } as any, mkAssertion({ duration: 1000 }));

    expect(reporterMock.addTestResult).toHaveBeenCalledTimes(1);
    const result = reporterMock.addTestResult.mock.calls[0]![0] as any;
    expect(result.execution.start_time).toBe(1_700_000_000);
    expect(result.execution.end_time).toBe(1_700_000_001);
  });

  it('skips a test marked with tiden.ignore() and clears the flag', () => {
    const reporter = mkReporter();
    reporter.addIgnore();
    reporter.onTestCaseResult({ path: SPEC } as any, mkAssertion());
    expect(reporterMock.addTestResult).not.toHaveBeenCalled();

    reporter.onTestCaseResult({ path: SPEC } as any, mkAssertion({ fullName: 'Auth other' }));
    expect(reporterMock.addTestResult).toHaveBeenCalledTimes(1);
  });

  it('resets metadata between tests', () => {
    const reporter = mkReporter();
    reporter.addTitle('First');
    reporter.onTestCaseResult({ path: SPEC } as any, mkAssertion());
    reporter.onTestCaseResult({ path: SPEC } as any, mkAssertion({ fullName: 'Auth second' }));

    expect((reporterMock.addTestResult.mock.calls[0]![0] as any).title).toBe('First');
    expect((reporterMock.addTestResult.mock.calls[1]![0] as any).title).toBe('logs in');
  });
});

describe('onTestResult sweep for non-executed specs', () => {
  const mkFileResult = (results: any[]) => ({ testFilePath: SPEC, testResults: results });

  it('reports skipped and todo specs that never reached the per-case hook', () => {
    const reporter = mkReporter();
    reporter.onTestResult({ path: SPEC } as any, mkFileResult([
      mkAssertion({ status: 'pending', fullName: 'Auth pending', duration: null }),
      mkAssertion({ status: 'todo', fullName: 'Auth todo', duration: null }),
    ]) as any);

    expect(reporterMock.addTestResult).toHaveBeenCalledTimes(2);
    const statuses = reporterMock.addTestResult.mock.calls.map(
      (c: any) => c[0].execution.status,
    );
    expect(statuses).toEqual(['skipped', 'disabled']);
  });

  it('does not re-report a skipped spec already seen by onTestCaseResult', () => {
    // jest-circus fires onTestCaseResult for pending specs too; upstream
    // reports those twice.
    const reporter = mkReporter();
    const skipped = mkAssertion({ status: 'pending', fullName: 'Auth pending', duration: null });
    reporter.onTestCaseResult({ path: SPEC } as any, skipped);
    reporter.onTestResult({ path: SPEC } as any, mkFileResult([skipped]) as any);

    expect(reporterMock.addTestResult).toHaveBeenCalledTimes(1);
  });

  it('ignores executed specs in the sweep', () => {
    const reporter = mkReporter();
    reporter.onTestResult({ path: SPEC } as any, mkFileResult([
      mkAssertion({ status: 'passed' }),
      mkAssertion({ status: 'failed', fullName: 'Auth fails' }),
    ]) as any);

    expect(reporterMock.addTestResult).not.toHaveBeenCalled();
  });
});

describe('metadata mutators', () => {
  it('feed the applier that the result builder reads', () => {
    const reporter = mkReporter();
    reporter.addComment('note');
    reporter.addSuite('Suite');
    reporter.addFields({ severity: 'high' });
    reporter.addParameters({ browser: 'chrome' });
    reporter.addGroupParams({ shard: '1' });
    reporter.addTags(['smoke']);
    reporter.onTestCaseResult({ path: SPEC } as any, mkAssertion());

    const result = reporterMock.addTestResult.mock.calls[0]![0] as any;
    expect(result.message).toBe('note');
    expect(result.relations.suite.data[0].title).toBe('Suite');
    expect(result.fields).toEqual({ severity: 'high' });
    expect(result.params).toEqual({ browser: 'chrome' });
    expect(result.group_params).toEqual({ shard: '1' });
    expect(result.tags).toEqual(['smoke']);
  });
});

describe('getLastError', () => {
  it('never fails the Jest run', () => {
    expect(mkReporter().getLastError()).toBeUndefined();
  });
});
