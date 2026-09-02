import type { TestCase } from 'vitest/node';
import {
  Attachment,
  StepStatusEnum,
  TestResultType,
  TestStepType,
  determineTestStatus,
  generateSignature,
  parseTidenIdFromTitle,
} from '@tiden/reporter-commons';
import { extractAndCleanStep, normalizeSpecPath } from '@tiden/reporter-commons/internal';
import { v4 as uuidv4 } from 'uuid';
import { MetadataShape } from './metadataAccumulator';

export interface BuildArgs {
  testCase: TestCase;
  metadata: MetadataShape | undefined;
  currentSuite: string | undefined;
  profilerSteps: TestStepType[];
  /** Base for the spec-file segment; defaults to `process.cwd()`. */
  rootDir?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ResultBuilder {
  static build(args: BuildArgs): TestResultType {
    const { testCase, metadata, currentSuite, profilerSteps, rootDir } = args;

    const result = testCase.result();
    const parsed = parseTidenIdFromTitle(testCase.name);
    const diagnostic = testCase.diagnostic();

    const testTitle = metadata?.title ?? (parsed.cleanedTitle.replace(/\s+/g, ' ').trim() || testCase.name);
    const testResult = new TestResultType(testTitle);
    // The reported id is the API's idempotency key (api.v1.ResultCreate.id) and
    // is validated as a UUID, so it must be generated — same as the Playwright
    // reporter (playwright/src/result-builder.ts). Vitest's own `testCase.id`
    // ("1971115177_8_1") is NOT a UUID; it stays a purely internal key, used by
    // MetadataAccumulator to correlate annotations with this test.
    testResult.id = uuidv4();

    // Multi-project reporting was dropped in the Tiden fork: the internal
    // TestResultType model still carries project_case_mapping, and it stays at
    // its constructor default (null) here.
    if (parsed.legacyIds.length > 0) {
      testResult.case_id = parsed.legacyIds.length === 1 ? (parsed.legacyIds[0] ?? null) : parsed.legacyIds;
    } else {
      testResult.case_id = null;
    }

    // Case identity, aligned with the Playwright reporter (see
    // playwright/src/result-builder.ts): commons' generateSignature() over the
    // parsed case ids (null when there are none) plus the full structural path
    // *including* the leaf test title, param-free — params are hashed
    // separately at attempt level.
    //
    // The structural path is led by the project-relative spec file, as one
    // segment with its slashes intact. Playwright gets that segment for free
    // from `titlePath()`; Vitest's `fullName` carries only the describe chain,
    // so it is prepended explicitly here. Without it two same-named tests in
    // different files share an identity, and — the reason this was found — the
    // reporter disagreed with the app's own CI transform, which has always
    // emitted the file segment. See qase-tms/tiden-app#445.
    //
    // DELIBERATE DIVERGENCE from upstream vitest-qase-reporter, which assigns
    // the raw Vitest `fullName` here. Do not revert this on an upstream
    // re-sync: it would make the same logical case key differently in the
    // Vitest and Playwright reporters.
    const idsForSignature = testResult.case_id == null
      ? null
      : (Array.isArray(testResult.case_id) ? testResult.case_id : [testResult.case_id]);
    testResult.signature = generateSignature(
      idsForSignature,
      [ResultBuilder.specPath(testCase, rootDir), ...ResultBuilder.splitFullName(testCase)].filter(Boolean),
    );

    const suiteSegments = ResultBuilder.suitePath(testCase, metadata?.suite, currentSuite, rootDir);
    if (suiteSegments.length > 0) {
      testResult.relations = {
        suite: { data: suiteSegments.map((title) => ({ title, public_id: null })) },
      };
    }

    // Vitest's `testCase.diagnostic()` exposes both the absolute `startTime`
    // (ms since epoch) and elapsed `duration` (ms). end_time is derived as
    // start + duration so there is no dependency on the reporter callback delay.
    const durationMs = Math.round(diagnostic?.duration ?? 0);
    if (diagnostic) {
      testResult.execution.start_time = diagnostic.startTime / 1000;
      testResult.execution.end_time = (diagnostic.startTime + durationMs) / 1000;
    } else {
      testResult.execution.start_time = null;
      testResult.execution.end_time = null;
    }
    testResult.execution.duration = durationMs;

    let error: Error | null = null;
    if (result.errors && result.errors.length > 0) {
      const firstError = result.errors[0];
      if (firstError) {
        error = new Error(firstError.message);
        if (firstError.stack) {
          error.stack = firstError.stack;
        }
      }

      testResult.execution.stacktrace = result.errors.map((err) => {
        return err.stack ?? err.message;
      }).join('\n');
      testResult.message = firstError ? firstError.message : 'Test failed';
    }

    testResult.execution.status = determineTestStatus(error, result.state);

    if (result.state === 'skipped') {
      testResult.message = result.note ?? null;
    }

    if (metadata) {
      if (metadata.comment) {
        testResult.message = metadata.comment;
      }
      if (metadata.fields) {
        testResult.fields = metadata.fields;
      }
      if (metadata.parameters) {
        testResult.params = metadata.parameters;
      }
      if (metadata.groupParameters) {
        testResult.group_params = metadata.groupParameters;
      }
      if (metadata.tags && metadata.tags.length > 0) {
        testResult.tags = metadata.tags;
      }
      if (metadata.steps.length > 0) {
        testResult.steps = metadata.steps.map((step) => {
          const stepObj = new TestStepType();
          // Step ids are internal only — commons' ResultTransformer rebuilds
          // every step for the wire (TidenResultStep has no id field), so this
          // is just a local handle. uuidv4() to match the Playwright reporter's
          // step-converter instead of a truncated Math.random().
          stepObj.id = uuidv4();
          const stepData = extractAndCleanStep(step.name);
          stepObj.data = {
            action: stepData.cleanedString,
            expected_result: stepData.expectedResult,
            data: stepData.data,
          };
          stepObj.execution.status = step.status === 'failed' ? StepStatusEnum.failed : StepStatusEnum.passed;
          return stepObj;
        });
      }
      if (metadata.attachments.length > 0) {
        testResult.attachments = metadata.attachments.map((attachment) => {
          const attachmentModel: Attachment = {
            file_name: attachment.name,
            mime_type: attachment.contentType ?? 'application/octet-stream',
            file_path: attachment.path ?? null,
            content: attachment.content ?? '',
            size: attachment.content ? Buffer.byteLength(attachment.content) : 0,
            // Also internal only: attachments go to the API through
            // AttachmentService, which uploads by name/content/path and reports
            // back a hash — this id is never sent. uuidv4() for consistency
            // with the Playwright reporter's metadata-extractor.
            id: uuidv4(),
          };
          return attachmentModel;
        });
      }
    }

    if (metadata?._profilerSteps) {
      testResult.steps = [...testResult.steps, ...metadata._profilerSteps];
    }

    if (profilerSteps.length > 0) {
      testResult.steps = [...testResult.steps, ...profilerSteps];
    }

    return testResult;
  }

  /**
   * Splits a Vitest `fullName` ("Outer > Inner > test title") into its path
   * segments, leaf test title last. Single source of truth for both the
   * reported suite path and the case signature — do not add a second parser.
   *
   * `fullName` covers the describe chain only; the spec file that precedes it
   * in a signature comes from `specPath()`, not from a second parse of this.
   */
  /**
   * The project-relative spec file for this case, '' when Vitest reports no
   * module id (a virtual module, or a hand-built test case in a unit test).
   * One segment, slashes intact — see commons' `normalizeSpecPath`.
   */
  static specPath(testCase: TestCase, rootDir?: string | undefined): string {
    const moduleId = testCase.module?.moduleId;
    if (!moduleId) {
      return '';
    }
    return rootDir ? normalizeSpecPath(moduleId, rootDir) : normalizeSpecPath(moduleId);
  }

  static splitFullName(testCase: TestCase): string[] {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const fullName = testCase.fullName ?? testCase.name;
    return fullName.split(' > ');
  }

  /**
   * The reported suite path, outermost segment first: the spec file, then the
   * describe chain. Mirrors the app-side vitest CI transform, which reports
   * `[relFile, ...describeTitles]`, so a case does not bounce between two tree
   * locations depending on which side reported the run.
   *
   * Two things this deliberately does NOT do any more:
   *
   *   - It no longer prefers `currentSuite` over the derived path. That value
   *     is one describe's `name` from `onTestSuiteReady`, so preferring it
   *     truncated every nested test to its innermost describe ("Outer > Inner
   *     > t" reported as just ["Inner"]) and dropped the file. It survives
   *     only as a fallback for a case with neither a module id nor a describe.
   *   - It no longer round-trips the path through a joined string. The old
   *     code joined the derived chain with ' > ' and the caller split it on
   *     ' - ', which never matched, so a nested path arrived as ONE suite
   *     titled "Outer > Inner".
   *
   * An explicit `tiden.suite()` annotation still replaces the whole computed
   * path, and keeps its ' - ' nesting convention — that string is authored by
   * the user, where the convention is meaningful. `currentSuite` is a literal
   * describe name and is never split: `describe('Feature - edge cases')` is
   * one suite, not two.
   */
  static suitePath(
    testCase: TestCase,
    metadataSuite: string | undefined,
    currentSuite: string | undefined,
    rootDir?: string | undefined,
  ): string[] {
    const clean = (segments: string[]): string[] =>
      segments.map((segment) => segment.trim()).filter(Boolean);

    if (metadataSuite) {
      return clean(metadataSuite.split(' - '));
    }

    const derived = clean([
      ResultBuilder.specPath(testCase, rootDir),
      ...ResultBuilder.splitFullName(testCase).slice(0, -1),
    ]);
    if (derived.length > 0) {
      return derived;
    }

    return currentSuite ? clean([currentSuite]) : [];
  }

  /**
   * @deprecated Not used by `build()` any more, and not the reported suite
   * path — it returns the describe chain joined with ' > ' as a single string,
   * which is what the collapse bug was made of. Use `suitePath()`.
   */
  static extractSuiteFromTestCase(testCase: TestCase): string | undefined {
    const parts = ResultBuilder.splitFullName(testCase);
    if (parts.length > 1) {
      return parts.slice(0, -1).join(' > ');
    }
    return undefined;
  }
}
