import { TestCase, TestError, TestResult } from '@playwright/test/reporter';
import {
  Attachment,
  CompoundError,
  TestResultType,
  TestStepType,
  determineTestStatus,
  generateSignature,
  parseTidenIdFromTitle,
} from '@tiden/reporter-commons';
import { removeTidenIdsFromTitle, resolveFilePath } from '@tiden/reporter-commons/internal';
import { v4 as uuidv4 } from 'uuid';
import { ReporterOptionsType } from './options';
import { StepConverter } from './step-converter';
import { TestCaseMetadata } from './metadata-extractor';

const PROFILER_CONTENT_TYPE = 'application/tiden.profiler-steps+json';
const logMimeType = 'text/plain';

export interface BuildArgs {
  test: TestCase;
  result: TestResult;
  metadata: TestCaseMetadata;
  annotations: {
    ids: number[];
    suites: string[];
  };
  options: ReporterOptionsType;
  isCaptureLogs: boolean;
  tidenIdsRegistry: ReadonlyMap<string, number[]>;
}

export class ResultBuilder {
  /** Files already reported as unresolvable — one warning per file, not per test. */
  private readonly warnedPaths = new Set<string>();

  constructor(
    private readonly stepConverter: StepConverter,
    private readonly rootDir?: string | undefined,
  ) {}

  build(args: BuildArgs): TestResultType | null {
    const { test, result, metadata, annotations, options, isCaptureLogs, tidenIdsRegistry } = args;

    if (metadata.ignore) {
      return null;
    }

    const error = result.error ? transformError(result.errors) : null;

    let suites = annotations.suites.length > 0
      ? annotations.suites
      : (metadata.suite ? [metadata.suite] : transformSuiteTitle(test));

    let message: string | null = null;
    if (metadata.comment !== '') {
      message = metadata.comment;
    }
    if (error) {
      if (message) {
        message += '\n\n';
      } else {
        message = '';
      }
      message += error.message;
    }

    if (options.browser?.addAsParameter) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const browser = (test as any)._projectId ?? null;
      if (browser) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        metadata.parameters[options.browser?.parameterName ?? 'browser'] = browser;
        suites = suites.filter((suite) => suite !== browser);
      }
    }

    if (options.markAsFlaky && result.status === 'passed' && result.retry > 0) {
      metadata.fields['is_flaky'] = 'true';
    }

    // `fields.file_path` is the key the server joins a requirement's repo_file
    // anchors against — without it a case can never be linked by derive. A
    // value the test set for itself wins: it may deliberately point at the
    // source file under test rather than at the spec's own location.
    if (metadata.fields['file_path'] === undefined) {
      const filePath = this.resolveTestFilePath(test);
      if (filePath !== undefined) {
        metadata.fields['file_path'] = filePath;
      }
    }

    const titleParsed = parseTidenIdFromTitle(test.title);
    const testTitle = titleParsed.cleanedTitle || removeTidenIdsFromTitle(test.title);

    let case_id: number | number[] | null;
    if (annotations.ids.length > 0) {
      case_id = annotations.ids.length === 1 ? annotations.ids[0]! : annotations.ids;
    } else if (metadata.ids.length > 0) {
      case_id = metadata.ids.length === 1 ? metadata.ids[0]! : metadata.ids;
    } else if (titleParsed.legacyIds.length > 0) {
      case_id = titleParsed.legacyIds.length === 1 ? titleParsed.legacyIds[0]! : titleParsed.legacyIds;
    } else {
      const registryIds = tidenIdsRegistry.get(test.title);
      case_id = registryIds && registryIds.length > 0 ? registryIds : null;
    }

    let errorForStatus: Error | null = null;
    if (error) {
      errorForStatus = new Error(error.message || 'Test failed');
      if (error.stacktrace) {
        errorForStatus.stack = error.stacktrace;
      }
    }
    const testStatus = determineTestStatus(errorForStatus, result.status);
    const idsForSignature = case_id == null ? null : (Array.isArray(case_id) ? case_id : [case_id]);

    const testResult = {
      attachments: metadata.attachments,
      author: null,
      execution: {
        status: testStatus,
        start_time: result.startTime.valueOf() / 1000,
        end_time: (result.startTime.valueOf() + result.duration) / 1000,
        duration: result.duration,
        stacktrace: error === null
          ? null
          : error.stacktrace === undefined
            ? null
            : error.stacktrace,
        thread: process.ppid.toString() + '-' + result.parallelIndex.toString(),
      },
      fields: metadata.fields,
      id: uuidv4(),
      message,
      muted: false,
      params: metadata.parameters,
      group_params: metadata.groupParams,
      tags: metadata.tags ?? [],
      relations: {
        suite: {
          data: suites
            .filter((suite) => suite !== test.title)
            .map((suite) => ({ title: suite, public_id: null })),
        },
      },
      run_id: null,
      signature: generateSignature(idsForSignature, suites),
      steps: this.stepConverter.transform(result.steps, null),
      case_id,
      // Multi-project mapping was removed; the internal TestResultType model
      // still carries this field, so it's kept here always-null.
      project_case_mapping: null,
      title: metadata.title === '' ? testTitle : metadata.title,
    };

    if (isCaptureLogs) {
      if (result.stdout.length > 0) {
        testResult.attachments.push(convertLogsToAttachments(result.stdout, 'stdout.log'));
      }
      if (result.stderr.length > 0) {
        testResult.attachments.push(convertLogsToAttachments(result.stderr, 'stderr.log'));
      }
    }

    const profilerAttachment = result.attachments.find(
      (a) => a.contentType === PROFILER_CONTENT_TYPE,
    );
    if (profilerAttachment?.body) {
      try {
        const profilerSteps = JSON.parse(profilerAttachment.body.toString()) as TestStepType[];
        testResult.steps = [...testResult.steps, ...profilerSteps];
      } catch {
        // Silent failure — corrupted profiler data must not affect test results
      }
    }

    return testResult as unknown as TestResultType;
  }
  /**
   * The spec file this case lives in, repo-relative, or undefined when it does
   * not resolve under the reporting root. Undefined omits the field rather
   * than reporting an absolute machine path, which could never match an
   * anchor; the warning names the cause once per file.
   */
  private resolveTestFilePath(test: TestCase): string | undefined {
    const file = test.location?.file;
    if (!file) {
      return undefined;
    }
    const resolved = this.rootDir === undefined
      ? resolveFilePath(file)
      : resolveFilePath(file, this.rootDir);
    if (resolved === undefined && !this.warnedPaths.has(file)) {
      this.warnedPaths.add(file);
      console.warn(
        `tiden: ${file} is outside the reporting root, omitting file_path — `
        + 'this test cannot be linked to a requirement by file anchor. '
        + 'Set rootDir (or TIDEN_ROOT_DIR) to the repository root.',
      );
    }
    return resolved;
  }
}

function transformError(testErrors: TestError[]): CompoundError {
  const compound = new CompoundError();
  for (const e of testErrors) {
    if (e.message == undefined) continue;
    compound.addMessage(e.message);
  }
  for (const e of testErrors) {
    if (e.stack == undefined) continue;
    compound.addStacktrace(e.stack);
  }
  return compound;
}

function transformSuiteTitle(test: TestCase): string[] {
  return test.titlePath().filter(Boolean).map((s) => s.replace(/\\/g, '/'));
}

function convertLogsToAttachments(logs: (string | Buffer)[], name: string): Attachment {
  let content = '';
  for (const line of logs) {
    content = content + line.toString();
  }
  return {
    file_name: name,
    mime_type: logMimeType,
    content,
  } as Attachment;
}
