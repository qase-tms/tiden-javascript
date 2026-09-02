import type { Reporter } from 'vitest/reporters';
import type { TestAnnotation } from '@vitest/runner';
import type { TestCase, TestSuite } from 'vitest/node';
import {
  ConfigLoader,
  ConfigType,
  TidenReporter,
  ReporterInterface,
  TestStepType,
  composeOptions,
} from '@tiden/reporter-commons';
import { NetworkProfiler } from '@tiden/reporter-commons/profilers';

import { MetadataAccumulator } from './modules/metadataAccumulator';
import { ProfilerTracker } from './modules/profilerTracker';
import { ResultBuilder } from './modules/resultBuilder';
import { resolveRootDir } from '@tiden/reporter-commons/internal';

export type VitestTidenOptionsType = ConfigType;

export class VitestTidenReporter implements Reporter {
  private reporter: ReporterInterface;
  private profilerTracker: ProfilerTracker;
  private metadataAccumulator: MetadataAccumulator;
  // Base for the spec-file segment of a signature. Undefined means
  // process.cwd(); see OptionsType.rootDir for why a producer may need to
  // pin it explicitly.
  private rootDir: string | undefined;

  constructor(
    options: VitestTidenOptionsType = {},
    configLoader = new ConfigLoader(),
  ) {
    const config = configLoader.load();
    const composedOptions = composeOptions(options, config);

    this.reporter = TidenReporter.getInstance({
      ...composedOptions,
      frameworkPackage: 'vitest',
      frameworkName: 'vitest',
      reporterName: '@tiden/vitest-reporter',
    });

    const profiler = composedOptions.profilers?.includes('network')
      ? new NetworkProfiler({
          skipDomains: composedOptions.networkProfiler?.skip_domains,
          trackOnFail: composedOptions.networkProfiler?.track_on_fail,
        })
      : null;
    this.profilerTracker = new ProfilerTracker(profiler);
    this.metadataAccumulator = new MetadataAccumulator();
    this.rootDir = resolveRootDir(composedOptions.rootDir);
  }

  onTestRunStart?(): void {
    this.reporter.startTestRun();
    this.profilerTracker.enable();
  }

  async onTestRunEnd?(): Promise<void> {
    this.profilerTracker.restore();
    await this.reporter.publish();
  }

  async onTestCaseResult?(testCase: TestCase): Promise<void> {
    const testId = testCase.id;
    const metadata = this.metadataAccumulator.getMetadata(testId);
    const currentSuite = this.metadataAccumulator.getCurrentSuite();
    const localProfilerSteps = this.profilerTracker.getNewSteps();
    const workerProfilerSteps = this.extractWorkerProfilerSteps(testCase);
    const profilerSteps = [...localProfilerSteps, ...workerProfilerSteps];

    const result = ResultBuilder.build({
      testCase,
      metadata,
      currentSuite,
      profilerSteps,
      rootDir: this.rootDir,
    });
    this.metadataAccumulator.clearMetadata(testId);
    await this.reporter.addTestResult(result);
  }

  onTestCaseAnnotate?(testCase: TestCase, annotation: TestAnnotation): void {
    const testId = testCase.id;
    this.metadataAccumulator.parseAnnotation(testId, annotation);
  }

  onTestSuiteReady?(testSuite: TestSuite): void {
    this.metadataAccumulator.setCurrentSuite(testSuite.name);
  }

  onTestSuiteResult?(): void {
    this.metadataAccumulator.clearCurrentSuite();
  }

  private extractWorkerProfilerSteps(testCase: TestCase): TestStepType[] {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      const metaSteps = (testCase.meta() as any)?._tidenProfilerSteps as string | undefined;
      if (metaSteps) {
        return JSON.parse(metaSteps) as TestStepType[];
      }
    } catch {
      // Silent failure — corrupted profiler data should not affect test results
    }
    return [];
  }
}

export default VitestTidenReporter;
