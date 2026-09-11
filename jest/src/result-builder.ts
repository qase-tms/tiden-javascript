import { AssertionResult } from '@jest/test-result';
import {
  generateSignature,
  determineTestStatus,
  parseTidenIdFromTitle,
  Relation,
  Suite,
  TestResultType,
  TestStepType,
} from '@tiden/reporter-commons';
import { isUsableFilePath, normalizeSpecPath, removeTidenIdsFromTitle, resolveFilePath } from '@tiden/reporter-commons/internal';

const UNRESOLVED_FILE_PATH = (file: string): string =>
  `tiden: ${file} is outside the reporting root, omitting file_path — `
  + 'this test cannot be linked to a requirement by file anchor. '
  + 'Set rootDir (or TIDEN_ROOT_DIR) to the repository root.';

const REJECTED_FILE_PATH = (value: string): string =>
  `tiden: file_path "${value}" was set by the test but is absolute or escapes the `
  + 'reporting root, so it could never match a requirement anchor — deriving from '
  + 'the spec file instead.';

import { v4 as uuidv4 } from 'uuid';

import { Metadata } from './models';

// Jest colourises `failureMessages`; the escape codes are noise in a stacktrace.
// eslint-disable-next-line no-control-regex
const ANSI_REGEXP = /\u001b\[[0-9;]*m/g;

export interface ResultBuilderArgs {
  value: AssertionResult;
  path: string;
  metadata: Metadata;
  profilerSteps: TestStepType[];
  /**
   * Test start time in ms since epoch, captured in the `onTestCaseStart`
   * reporter hook (jest-circus, Jest 29+). `null` when the hook did not fire —
   * which is the case for pending/todo specs, reported only at file-completion
   * time, and for older Jest versions.
   */
  startTimeMs?: number | null;
  /** Base for the spec-file segments; defaults to `process.cwd()`. */
  rootDir?: string | undefined;
}

export class ResultBuilder {
  /** Files already reported as unresolvable — one warning per file. */
  private static readonly warnedPaths = new Set<string>();

  static build({
    value,
    path,
    metadata,
    profilerSteps,
    startTimeMs = null,
    rootDir,
  }: ResultBuilderArgs): TestResultType {
    const parsed = parseTidenIdFromTitle(value.title);
    const filePath = ResultBuilder.normalizePath(path, rootDir);
    const error = ResultBuilder.buildError(value);

    const title = metadata.title ?? (parsed.cleanedTitle || removeTidenIdsFromTitle(value.title));
    const result = new TestResultType(title);

    // The reported id is the API's idempotency key (api.v1.ResultCreate.id) and
    // is validated as a UUID, so it must be generated. Jest's own identifiers
    // (`fullName`, `path::fullName`) are NOT UUIDs; they stay internal keys,
    // used only to correlate `onTestCaseStart` timing with this result. The
    // Vitest port shipped the native id first and every result was rejected
    // with INVALID_RESULT_ID, leaving the run at total=0.
    result.id = uuidv4();

    result.case_id =
      parsed.legacyIds.length === 0
        ? null
        : parsed.legacyIds.length === 1
          ? (parsed.legacyIds[0] ?? null)
          : parsed.legacyIds;

    // Case identity. `generateSignature` is commons' shared rule — the same one
    // the Playwright and Vitest reporters key through — so a given logical case
    // keys identically across all three. The structural path starts at the
    // cwd-relative spec file (matching Playwright's `titlePath()`), then the
    // describe chain, then the leaf test title. It is deliberately param-free.
    // Do NOT replace this with a raw name-based signature when re-syncing with
    // upstream `jest-qase-reporter`.
    const idsForSignature =
      result.case_id == null
        ? null
        : Array.isArray(result.case_id)
          ? result.case_id
          : [result.case_id];
    result.signature = generateSignature(
      idsForSignature,
      ResultBuilder.structuralPath(filePath, value).filter(Boolean),
    );

    result.relations = ResultBuilder.getRelations(filePath, value.ancestorTitles);

    const durationMs = Math.round(value.duration ?? 0);
    result.execution.duration = durationMs;
    result.execution.start_time = startTimeMs === null ? null : startTimeMs / 1000;
    result.execution.end_time = startTimeMs === null ? null : (startTimeMs + durationMs) / 1000;
    result.execution.stacktrace = error?.stack ?? null;
    result.execution.status = determineTestStatus(error ?? null, value.status);

    result.message = error?.message ?? null;

    ResultBuilder.applyMetadata(result, metadata);

    // `fields.file_path` is the key the server joins a requirement's repo_file
    // anchors against — without it a case can never be linked by derive. Set
    // after applyMetadata so a value the test chose for itself wins.
    ResultBuilder.applyFilePath(result.fields, path, rootDir);

    if (profilerSteps.length > 0) {
      result.steps = [...result.steps, ...profilerSteps];
    }

    return result;
  }

  /**
   * Jest reports failures as pre-rendered strings, so an Error is synthesized
   * for commons' `determineTestStatus`.
   *
   * Upstream falls back to the literal 'Runtime exception' when a failure has
   * no `matcherResult` — but that string matches none of commons' assertion
   * patterns, so a plain `throw new Error('boom')` in a test is classified
   * `invalid` instead of `failed`. The first line of `failureMessages` carries
   * the real error text, so it is used instead.
   */
  private static buildError(value: AssertionResult): Error | undefined {
    if (value.status !== 'failed') {
      return undefined;
    }

    const messages = value.failureDetails.map((item, index) => {
      const matcherMessage = (item as { matcherResult?: { message?: unknown } } | null)
        ?.matcherResult?.message;
      if (typeof matcherMessage === 'string' && matcherMessage.length > 0) {
        return ResultBuilder.stripAnsi(matcherMessage);
      }
      return ResultBuilder.firstLine(value.failureMessages[index]) ?? 'Runtime exception';
    });

    const error = new Error(
      messages.filter(Boolean).join('\n\n') ||
        ResultBuilder.firstLine(value.failureMessages[0]) ||
        'Runtime exception',
    );
    error.stack = value.failureMessages.map((m) => ResultBuilder.stripAnsi(m)).join('\n\n');
    return error;
  }

  private static firstLine(message: string | undefined): string | undefined {
    if (message === undefined) {
      return undefined;
    }
    const stripped = ResultBuilder.stripAnsi(message);
    const line = stripped.split('\n').find((candidate) => candidate.trim().length > 0);
    return line?.trim();
  }

  private static stripAnsi(value: string): string {
    return value.replace(ANSI_REGEXP, '');
  }

  private static applyMetadata(result: TestResultType, metadata: Metadata): void {
    if (metadata.comment) {
      result.message = metadata.comment;
    }
    if (metadata.suite) {
      result.relations = { suite: { data: [{ title: metadata.suite, public_id: null }] } };
    }
    if (Object.keys(metadata.fields).length > 0) {
      // Copied, not aliased: file_path is written onto result.fields by the
      // caller, and assigning this object by reference would mutate the
      // metadata the applier holds.
      result.fields = { ...metadata.fields };
    }
    if (Object.keys(metadata.parameters).length > 0) {
      result.params = metadata.parameters;
    }
    if (Object.keys(metadata.groupParams).length > 0) {
      result.group_params = metadata.groupParams;
    }
    if (metadata.tags.length > 0) {
      result.tags = metadata.tags;
    }
    if (metadata.steps.length > 0) {
      result.steps = metadata.steps;
    }
    if (metadata.attachments.length > 0) {
      result.attachments = metadata.attachments;
    }
  }

  /**
   * The case-identity path: spec file segments, the describe chain, then the
   * leaf test title. Mirrors Playwright's `titlePath()` shape.
   */
  static structuralPath(filePath: string, value: AssertionResult): string[] {
    return [
      ...filePath.split('/'),
      ...value.ancestorTitles,
      removeTidenIdsFromTitle(value.title),
    ];
  }

  static getRelations(filePath: string, suites: string[]): Relation {
    const suite: Suite = { data: [] };
    for (const part of filePath.split('/')) {
      suite.data.push({ title: part, public_id: null });
    }
    for (const part of suites) {
      suite.data.push({ title: part, public_id: null });
    }
    return { suite };
  }

  /**
   * The spec file, relative to `rootDir` (default `process.cwd()`).
   *
   * Unlike the vitest reporter, the result is then split on `/` into one
   * signature segment per directory — that is jest's shape and it stays. Only
   * the base is configurable, because two producers reporting the same tests
   * must measure the file from the same root or one test becomes two cases.
   * See qase-tms/tiden-app#445.
   */
  static normalizePath(fullPath: string, rootDir?: string | undefined): string {
    return rootDir ? normalizeSpecPath(fullPath, rootDir) : normalizeSpecPath(fullPath);
  }

  /**
   * Write `fields.file_path`, the key the server joins a requirement's
   * repo_file anchors against.
   *
   * A value the test set for itself wins — it may deliberately name the source
   * file under test — but only when it could ever match an anchor; an absolute
   * or escaping one is dropped for the derived path, because keeping it would
   * fabricate a link that never joins. A file that does not resolve under the
   * reporting root omits the field rather than reporting an absolute machine
   * path; the warning names the cause once per file.
   */
  static applyFilePath(
    fields: Record<string, string>,
    file: string | undefined,
    rootDir?: string | undefined,
  ): void {
    const provided = fields['file_path'];
    if (provided !== undefined) {
      if (isUsableFilePath(provided)) {
        return;
      }
      ResultBuilder.warnOnce(provided, REJECTED_FILE_PATH(provided));
      // Brackets are required (TS4111, noPropertyAccessFromIndexSignature) and
      // the lint rule wants dot access; the compiler wins.
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete fields['file_path'];
    }
    if (!file) {
      return;
    }
    const resolved = resolveFilePath(file, rootDir);
    if (resolved === undefined) {
      ResultBuilder.warnOnce(file, UNRESOLVED_FILE_PATH(file));
      return;
    }
    fields['file_path'] = resolved;
  }

  private static warnOnce(key: string, message: string): void {
    if (ResultBuilder.warnedPaths.has(key)) {
      return;
    }
    ResultBuilder.warnedPaths.add(key);
    console.warn(message);
  }
}
