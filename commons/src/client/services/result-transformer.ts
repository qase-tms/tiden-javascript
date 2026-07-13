import {
  TidenParamGroup,
  TidenResultCreate,
  TidenResultExecution,
  TidenResultStep,
  TidenSuiteSegment,
} from '../models/tiden-result';
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
  ): Promise<TidenResultCreate> {
    const attachments = await this.uploadAttachments(result.attachments, attachmentUploader);
    if (result.preparedAttachments) {
      attachments.push(...result.preparedAttachments);
    }
    const steps = await this.transformSteps(result.steps, result.title, attachmentUploader);
    const params = this.transformParams(result.params);
    const groupParams = this.transformGroupParams(result.group_params, params);

    const model: TidenResultCreate = {
      id: result.id,
      title: result.title,
      execution: this.getExecution(result.execution),
      // Wire field name mirrors api.v1.ResultCreate.testops_ids — kept as-is
      // for API compatibility; see client/models/tiden-result.ts.
      testops_ids: Array.isArray(result.case_id)
        ? (result.case_id.length > 0 ? result.case_id : null)
        : result.case_id !== null ? [result.case_id] : null,
      attachments: attachments,
      steps: steps,
      params: params,
      param_groups: groupParams,
      suite_path: this.getSuitePath(result.relations),
      message: result.message,
      fields: result.fields,
      defect: false,
      signature: result.signature,
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
  ): Promise<TidenResultCreate> {
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
  ): Promise<TidenResultStep[]> {
    return Promise.all(
      steps.map(step => this.transformStep(step, testTitle, attachmentUploader)),
    );
  }

  private async transformStep(
    step: TestStepType,
    testTitle: string,
    attachmentUploader: (attachment: Attachment) => Promise<string>,
  ): Promise<TidenResultStep> {
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

  private createBaseResultStep(attachmentHashes: string[], status: StepStatusEnum): TidenResultStep {
    return {
      data: { action: '' },
      execution: {
        status: stepStatusMap[status],
        attachments: attachmentHashes,
      },
    };
  }

  private processTextStep(step: TestStepType, resultStep: TidenResultStep, testTitle: string): void {
    if (!('action' in step.data) || !resultStep.data) return;

    const stepData = step.data;
    resultStep.data.action = stepData.action || 'Unnamed step';

    if (stepData.action === '') {
      this.logger.log(chalk`{magenta Test '${testTitle}' has empty action in step. The reporter will mark this step as unnamed step.}`);
    }

    if (stepData.expected_result != null) {
      resultStep.data.expected_result = stepData.expected_result;
    }

    if (stepData.data != null) {
      resultStep.data.input_data = stepData.data;
    }
  }

  private processGherkinStep(step: TestStepType, resultStep: TidenResultStep): void {
    if (!('keyword' in step.data) || !resultStep.data) return;
    resultStep.data.action = step.data.keyword;
  }

  private processRequestStep(step: TestStepType, resultStep: TidenResultStep): void {
    if (!('request_method' in step.data) || !resultStep.data) return;
    const stepData = step.data;
    resultStep.data.action = `${stepData.request_method} ${stepData.request_url}`;
  }

  private getExecution(exec: TestExecution): TidenResultExecution {
    return {
      status: statusMap[exec.status],
      start_time: exec.start_time,
      end_time: exec.end_time,
      duration: exec.duration,
      stacktrace: exec.stacktrace,
      thread: exec.thread,
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
  ): TidenParamGroup[] {
    const keys = Object.keys(groupParams);
    if (keys.length === 0) return [];

    for (const [key, value] of Object.entries(groupParams)) {
      if (value) {
        params[key] = value;
      }
    }

    return [{ names: keys }];
  }

  private getSuitePath(relation: Relation | null): TidenSuiteSegment[] {
    const titles = relation?.suite?.data.map(d => d.title) ?? [];
    const path = this.rootSuite ? [this.rootSuite, ...titles] : titles;
    return path.map(title => ({ title }));
  }
}
