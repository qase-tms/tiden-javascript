import { Reporter, TestCase, TestResult, TestStatus, TestStep } from '@playwright/test/reporter';

import {
  composeOptions,
  ConfigLoader,
  ConfigType,
  TidenReporter,
  ReporterInterface,
  TestStatusEnum,
} from '@tiden/reporter-commons';
import { ReporterOptionsType } from './options';
import { StepIndex } from './step-index';
import { AnnotationExtractor } from './annotation-extractor';
import { StepConverter } from './step-converter';
import { MetadataExtractor } from './metadata-extractor';
import { ResultBuilder } from './result-builder';

export type PlaywrightTidenOptionsType = Omit<ConfigType, 'reporterOptions'> & {
  framework: ReporterOptionsType;
};

/**
 * @class PlaywrightTidenReporter
 * @implements Reporter
 */
export class PlaywrightTidenReporter implements Reporter {
  /**
   * @type {Record<TestStatus, TestStatusEnum>}
   */
  static statusMap: Record<TestStatus, TestStatusEnum> = {
    passed: TestStatusEnum.passed,
    failed: TestStatusEnum.failed,
    skipped: TestStatusEnum.skipped,
    timedOut: TestStatusEnum.failed,
    interrupted: TestStatusEnum.failed,
  };

  /**
   * @type {Map<string, number[]>}
   * @private
   */
  private static tidenIds: Map<string, number[]> = new Map<string, number[]>();

  private stepIndex: StepIndex = new StepIndex();

  private annotationExtractor: AnnotationExtractor = new AnnotationExtractor();

  private stepConverter: StepConverter = new StepConverter(this.stepIndex);

  private metadataExtractor: MetadataExtractor = new MetadataExtractor(this.stepIndex);

  private resultBuilder: ResultBuilder = new ResultBuilder(this.stepConverter);

  /**
   * @type {ReporterInterface}
   * @private
   */
  private reporter: ReporterInterface;

  private options: ReporterOptionsType;

  /**
   * @param {PlaywrightTidenOptionsType} options
   * @param {ConfigLoaderInterface} configLoader
   */
  public constructor(
    options: PlaywrightTidenOptionsType,
    configLoader = new ConfigLoader(),
  ) {
    const config = configLoader.load();
    const { framework, ...composedOptions } = composeOptions(options, config);

    this.options = options.framework ?? {};

    this.reporter = TidenReporter.getInstance({
      ...composedOptions,
      frameworkPackage: '@playwright/test',
      frameworkName: 'playwright',
      reporterName: '@tiden/playwright-reporter',
    });
  }

  /**
   * @param {TestCase} test
   * @param _result
   * @param step
   */
  onStepBegin(test: TestCase, _result: TestResult, step: TestStep): void {
    if (step.category !== 'test.step') {
      return;
    }
    if (this.stepIndex.hasStepCached(step)) {
      return;
    }
    this.stepIndex.cacheStep(step, test);
  }

  public onBegin(): void {
    this.reporter.startTestRun();
  }

  /**
   * @param {TestCase} test
   * @param {TestResult} result
   */
  public async onTestEnd(test: TestCase, result: TestResult) {
    const metadata = this.metadataExtractor.transform(result.attachments);
    const annotations = {
      ids: this.annotationExtractor.extractTidenIds(test.annotations),
      projectMapping: this.annotationExtractor.extractProjectMapping(test.annotations),
      suites: this.annotationExtractor.extractSuite(test.annotations),
    };

    const testResult = this.resultBuilder.build({
      test,
      result,
      metadata,
      annotations,
      options: this.options,
      isCaptureLogs: this.reporter.isCaptureLogs(),
      tidenIdsRegistry: PlaywrightTidenReporter.tidenIds,
    });

    if (testResult) {
      await this.reporter.addTestResult(testResult);
    }
  }

  /**
   * @returns {Promise<void>}
   */
  public async onEnd(): Promise<void> {
    await this.reporter.publish();
  }

  // add this method for supporting old version of the ID-linking API
  public static addIds(ids: number[], title: string): void {
    this.tidenIds.set(title, ids);
  }

  /**
   * @param {TestStep[]} steps
   * @returns {boolean}
   */
  checkChildrenSteps(steps: TestStep[]): boolean {
    return this.stepConverter.hasOnlyLeafCategories(steps);
  }

}
