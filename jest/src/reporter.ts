import { Config, Reporter, Test, TestResult } from '@jest/reporters';
import { TestCaseResult } from '@jest/test-result';
import type { Circus } from '@jest/types';
import {
  composeOptions,
  ConfigLoader,
  ConfigType,
  TidenReporter,
  ReporterInterface,
  Attachment,
  TestStepType,
} from '@tiden/reporter-commons';
import { NetworkProfiler } from '@tiden/reporter-commons/profilers';

import { MetadataApplier } from './metadata-applier';
import { ProfilerTracker } from './profiler-tracker';
import { ResultBuilder } from './result-builder';
import { Tiden } from './global';

export type JestTidenOptionsType = ConfigType;

/**
 * Statuses Jest reports for specs that never executed. These bypass
 * `onTestCaseResult` in some Jest versions, so they are swept out of
 * `onTestResult` instead.
 */
const NON_EXECUTED_STATUSES = new Set(['pending', 'todo', 'skipped', 'disabled']);

/**
 * @class JestTidenReporter
 * @implements Reporter
 */
export class JestTidenReporter implements Reporter {
  private reporter: ReporterInterface;
  private profilerTracker: ProfilerTracker;
  private metadataApplier: MetadataApplier;

  /**
   * Start times captured in `onTestCaseStart`, keyed `${path}::${fullName}`.
   * Jest's `TestCaseResult` exposes only a duration, so the absolute start has
   * to be reconstructed from the start hook.
   */
  private testCaseStartTimes = new Map<string, number>();

  /**
   * Keys already reported from `onTestCaseResult`, so the `onTestResult` sweep
   * does not report the same spec twice.
   */
  private reportedKeys = new Set<string>();

  /** Memoised so the run publishes exactly once across both publish hooks. */
  private publishOperation?: Promise<void>;

  /**
   * Jest constructs reporters as `(globalConfig, reporterOptions, context)`.
   * The trailing `configLoader` is a test seam, matching the sibling reporters.
   */
  public constructor(
    _globalConfig?: Config.GlobalConfig,
    options: JestTidenOptionsType = {},
    _context?: unknown,
    configLoader = new ConfigLoader(),
  ) {
    const config = configLoader.load();
    // Later arguments win, so the config file overrides reporter options, and
    // commons' OptionsResolver folds env in last: env > config file > options.
    // Upstream jest-qase-reporter has the inverse order; do not port it.
    const composedOptions = composeOptions(options, config);

    this.reporter = TidenReporter.getInstance({
      ...composedOptions,
      frameworkPackage: 'jest',
      frameworkName: 'jest',
      reporterName: '@tiden/jest-reporter',
    });

    const profiler = composedOptions.profilers?.includes('network')
      ? new NetworkProfiler({
          skipDomains: composedOptions.networkProfiler?.skip_domains,
          trackOnFail: composedOptions.networkProfiler?.track_on_fail,
        })
      : null;
    this.profilerTracker = new ProfilerTracker(profiler);
    this.metadataApplier = new MetadataApplier();

    // @ts-expect-error - global.Tiden is dynamically added at runtime
    global.Tiden = new Tiden(this);
  }

  public onRunStart(): void {
    this.reporter.startTestRun();
    this.profilerTracker.enable();
  }

  public onTestCaseStart(test: Test, testCaseStartInfo: Circus.TestCaseStartInfo): void {
    const startedAt = testCaseStartInfo.startedAt ?? Date.now();
    this.testCaseStartTimes.set(
      JestTidenReporter.startTimeKey(test.path, testCaseStartInfo.fullName),
      startedAt,
    );
  }

  public onTestCaseResult(test: Test, testCaseResult: TestCaseResult): void {
    const key = JestTidenReporter.startTimeKey(test.path, testCaseResult.fullName);
    this.reportedKeys.add(key);

    if (this.metadataApplier.get().ignore) {
      this.metadataApplier.reset();
      return;
    }

    const startTimeMs = this.testCaseStartTimes.get(key) ?? null;
    this.testCaseStartTimes.delete(key);

    const result = ResultBuilder.build({
      value: testCaseResult,
      path: test.path,
      metadata: this.metadataApplier.get(),
      profilerSteps: this.profilerTracker.getNewSteps(),
      startTimeMs,
    });

    this.metadataApplier.reset();
    void this.reporter.addTestResult(result);
  }

  /**
   * Skipped and todo specs never run, so depending on the Jest version they may
   * never reach `onTestCaseResult`. They are swept from the file result here.
   * Anything already reported per-case is filtered out, so a `test.skip` that
   * did reach both hooks is still reported exactly once.
   */
  public onTestResult(_test: Test, result: TestResult): void {
    result.testResults.forEach((value) => {
      if (!NON_EXECUTED_STATUSES.has(value.status)) {
        return;
      }
      const key = JestTidenReporter.startTimeKey(result.testFilePath, value.fullName);
      if (this.reportedKeys.has(key)) {
        return;
      }
      this.reportedKeys.add(key);

      const model = ResultBuilder.build({
        value,
        path: result.testFilePath,
        metadata: MetadataApplier.empty(),
        profilerSteps: [],
      });
      void this.reporter.addTestResult(model);
    });
  }

  public getLastError(): void {
    // Nothing to report; the reporter never fails the Jest run.
  }

  /**
   * `onRunComplete` is the Jest <= 29 hook name and `onRunnerEnd` the Jest 30
   * one. Both are implemented so the reporter spans the peer range, and both
   * return the same memoised promise so the run publishes exactly once even
   * when a Jest version calls both.
   */
  public onRunComplete(): Promise<void> {
    return this.publish();
  }

  public onRunnerEnd(): Promise<void> {
    return this.publish();
  }

  private publish(): Promise<void> {
    if (!this.publishOperation) {
      this.profilerTracker.restore();
      this.publishOperation = this.reporter.publish();
    }
    return this.publishOperation;
  }

  private static startTimeKey(path: string, fullName: string): string {
    return `${path}::${fullName}`;
  }

  public addTitle(title: string): void {
    this.metadataApplier.applyTitle(title);
  }

  public addIgnore(): void {
    this.metadataApplier.applyIgnore();
  }

  public addComment(value: string): void {
    this.metadataApplier.applyComment(value);
  }

  public addSuite(value: string): void {
    this.metadataApplier.applySuite(value);
  }

  public addFields(values: Record<string, string>): void {
    this.metadataApplier.applyFields(values);
  }

  public addParameters(values: Record<string, string>): void {
    this.metadataApplier.applyParameters(values);
  }

  public addGroupParams(values: Record<string, string>): void {
    this.metadataApplier.applyGroupParams(values);
  }

  public addTags(values: string[]): void {
    this.metadataApplier.applyTags(values);
  }

  public addStep(step: TestStepType): void {
    this.metadataApplier.applyStep(step);
  }

  public addAttachment(attachment: Attachment): void {
    this.metadataApplier.applyAttachment(attachment);
  }
}
