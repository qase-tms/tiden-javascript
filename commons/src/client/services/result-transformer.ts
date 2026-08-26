import {
  ParamGroup,
  ResultCreate,
  ResultExecution,
  ResultStep,
  SuiteSegment,
} from '../reporter-api-models';
import {
  Attachment,
  Relation,
  StepStatusEnum,
  StepType,
  TestExecution,
  TestResultType,
  TestStatusEnum,
  TestStepType,
} from '../../models';
import { LoggerInterface } from '../../utils/logger';
import chalk from 'chalk';

const statusMap: Record<TestStatusEnum, string> = {
  [TestStatusEnum.passed]: 'passed',
  [TestStatusEnum.failed]: 'failed',
  [TestStatusEnum.skipped]: 'skipped',
  [TestStatusEnum.disabled]: 'skipped',
  [TestStatusEnum.blocked]: 'blocked',
  [TestStatusEnum.invalid]: 'invalid',
};

const stepStatusMap: Record<StepStatusEnum, 'passed' | 'failed' | 'blocked' | 'skipped' | 'in_progress'> = {
  [StepStatusEnum.passed]: 'passed',
  [StepStatusEnum.failed]: 'failed',
  [StepStatusEnum.blocked]: 'blocked',
  [StepStatusEnum.skipped]: 'skipped',
};

export class ResultTransformer {
  constructor(
    private readonly logger: LoggerInterface,
    private readonly rootSuite: string | undefined,
  ) {}

  async transform(
    result: TestResultType,
    attachmentUploader: (attachment: Attachment) => Promise<string>,
  ): Promise<ResultCreate> {
    const attachments = await this.uploadAttachments(result.attachments, attachmentUploader);
    if (result.preparedAttachments) {
      attachments.push(...result.preparedAttachments);
    }
    const steps = await this.transformSteps(result.steps, result.title, attachmentUploader);
    const params = this.transformParams(result.params);
    const groupParams = this.transformGroupParams(result.group_params, params);
    // No linked case ids → omit the field (previously an explicit null; both
    // decode to an empty repeated field server-side).
    const caseIds: number[] | null = Array.isArray(result.case_id)
      ? (result.case_id.length > 0 ? result.case_id : null)
      : result.case_id !== null ? [result.case_id] : null;

    // Field names/types follow the generated `ResultCreate` contract and are
    // checked against it at test time: JSON is lowerCamelCase and int64s are
    // strings. Nullable internal values are
    // omitted rather than sent as `null` — protojson maps both to the field's
    // zero value, and omitting keeps the generated optional types honest.
    const model: ResultCreate = {
      id: result.id,
      title: result.title,
      execution: this.getExecution(result.execution),
      ...(caseIds ? { testopsIds: caseIds } : {}),
      attachments: attachments,
      steps: steps,
      params: params,
      paramGroups: groupParams,
      suitePath: this.getSuitePath(result.relations),
      ...(result.message != null ? { message: result.message } : {}),
      fields: result.fields,
      defect: false,
      ...(result.signature != null ? { signature: result.signature } : {}),
    };

    if (result.tags && result.tags.length > 0) {
      model.fields = {
        ...model.fields,
        tags: [...new Set(result.tags)].join(','),
      };
    }

    this.logger.logDebug(`Transformed result: ${JSON.stringify(model)}`);

    return model;
  }

  async transformWithDefect(
    result: TestResultType,
    attachmentUploader: (attachment: Attachment) => Promise<string>,
    defect: boolean,
  ): Promise<ResultCreate> {
    const model = await this.transform(result, attachmentUploader);
    model.defect = defect;
    return model;
  }

  private async uploadAttachments(
    attachments: Attachment[],
    uploader: (attachment: Attachment) => Promise<string>,
  ): Promise<string[]> {
    const hashes: string[] = [];
    for (const attachment of attachments) {
      const hash = await uploader(attachment);
      if (hash) hashes.push(hash);
    }
    return hashes;
  }

  private async transformSteps(
    steps: TestStepType[],
    testTitle: string,
    attachmentUploader: (attachment: Attachment) => Promise<string>,
  ): Promise<ResultStep[]> {
    return Promise.all(
      steps.map(step => this.transformStep(step, testTitle, attachmentUploader)),
    );
  }

  private async transformStep(
    step: TestStepType,
    testTitle: string,
    attachmentUploader: (attachment: Attachment) => Promise<string>,
  ): Promise<ResultStep> {
    const attachmentHashes = await this.uploadAttachments(step.attachments, attachmentUploader);
    const resultStep = this.createBaseResultStep(attachmentHashes, step.execution.status);

    if (step.step_type === StepType.TEXT) {
      this.processTextStep(step, resultStep, testTitle);
    } else if (step.step_type === StepType.GHERKIN) {
      this.processGherkinStep(step, resultStep);
    } else if (step.step_type === StepType.REQUEST) {
      this.processRequestStep(step, resultStep);
    }

    if (step.steps.length > 0) {
      resultStep.steps = await this.transformSteps(step.steps, testTitle, attachmentUploader);
    }

    return resultStep;
  }

  private createBaseResultStep(attachmentHashes: string[], status: StepStatusEnum): ResultStep {
    return {
      data: { action: '' },
      execution: {
        status: stepStatusMap[status],
        attachments: attachmentHashes,
      },
    };
  }

  private processTextStep(step: TestStepType, resultStep: ResultStep, testTitle: string): void {
    if (!('action' in step.data) || !resultStep.data) return;

    const stepData = step.data;
    resultStep.data.action = stepData.action || 'Unnamed step';

    if (stepData.action === '') {
      this.logger.log(chalk`{magenta Test '${testTitle}' has empty action in step. The reporter will mark this step as unnamed step.}`);
    }

    if (stepData.expected_result != null) {
      resultStep.data.expectedResult = stepData.expected_result;
    }

    if (stepData.data != null) {
      resultStep.data.inputData = stepData.data;
    }
  }

  private processGherkinStep(step: TestStepType, resultStep: ResultStep): void {
    if (!('keyword' in step.data) || !resultStep.data) return;
    resultStep.data.action = step.data.keyword;
  }

  private processRequestStep(step: TestStepType, resultStep: ResultStep): void {
    if (!('request_method' in step.data) || !resultStep.data) return;
    const stepData = step.data;
    resultStep.data.action = `${stepData.request_method} ${stepData.request_url}`;
  }

  private getExecution(exec: TestExecution): ResultExecution {
    // `duration` is an int64 in the proto, so the generated type carries it as
    // a string (protojson's int64 convention); the timestamps stay numbers
    // (Unix seconds, fractional ms).
    return {
      status: statusMap[exec.status],
      ...(exec.start_time != null ? { startTime: exec.start_time } : {}),
      ...(exec.end_time != null ? { endTime: exec.end_time } : {}),
      ...(exec.duration != null ? { duration: String(exec.duration) } : {}),
      ...(exec.stacktrace != null ? { stacktrace: exec.stacktrace } : {}),
      ...(exec.thread != null ? { thread: exec.thread } : {}),
    };
  }

  private transformParams(params: Record<string, string>): Record<string, string> {
    const transformedParams: Record<string, string> = {};
    for (const [key, value] of Object.entries(params)) {
      if (value != null) {
        transformedParams[key] = String(value);
      }
    }
    return transformedParams;
  }

  private transformGroupParams(
    groupParams: Record<string, string>,
    params: Record<string, string>,
  ): ParamGroup[] {
    const keys = Object.keys(groupParams);
    if (keys.length === 0) return [];

    for (const [key, value] of Object.entries(groupParams)) {
      if (value) {
        params[key] = value;
      }
    }

    return [{ names: keys }];
  }

  private getSuitePath(relation: Relation | null): SuiteSegment[] {
    const titles = relation?.suite?.data.map(d => d.title) ?? [];
    const path = this.rootSuite ? [this.rootSuite, ...titles] : titles;
    return path.map(title => ({ title }));
  }
}
