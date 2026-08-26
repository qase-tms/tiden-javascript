/**
 * The reporter-facing slice of the Tiden public API contract.
 *
 * These types intentionally live in reporter-commons so installing a reporter
 * does not pull the full generated API client into the user's dependency tree.
 * `commons/test/client/reporter-api-contract.test.ts` checks this slice against
 * the generated OpenAPI models kept in this repository.
 */
export interface CreateTestRunBody {
  title?: string;
  description?: string;
  environment?: string;
  branch?: string;
  configurations?: Record<string, string>;
  buildSha?: string;
  startedAt?: string;
  clientMeta?: Record<string, string>;
}

export interface ReporterTestRun {
  seqNum?: number;
}

export interface CreateTestRunResponse {
  run?: ReporterTestRun;
}

export interface ParamGroup {
  names?: string[];
}

export interface ResultExecution {
  status?: string;
  startTime?: number;
  endTime?: number;
  duration?: string;
  stacktrace?: string;
  thread?: string;
}

export interface ResultStepData {
  action?: string;
  expectedResult?: string;
  inputData?: string;
  attachments?: string[];
}

export interface ResultStepExecution {
  status?: string;
  startTime?: number;
  endTime?: number;
  duration?: string;
  comment?: string;
  attachments?: string[];
}

export interface StepCode {
  file?: string;
  line?: number;
}

export interface ResultStep {
  type?: string;
  data?: ResultStepData;
  execution?: ResultStepExecution;
  code?: StepCode;
  steps?: ResultStep[];
}

export interface SuiteSegment {
  title?: string;
  externalId?: string;
}

export interface ResultCreate {
  id?: string;
  title?: string;
  signature?: string;
  externalId?: string;
  testopsIds?: number[];
  execution?: ResultExecution;
  fields?: Record<string, string>;
  attachments?: string[];
  steps?: ResultStep[];
  stepsType?: string;
  params?: Record<string, string>;
  paramGroups?: ParamGroup[];
  suitePath?: SuiteSegment[];
  message?: string;
  defect?: boolean;
}

export interface ReportResultsBody {
  results?: ResultCreate[];
}

export interface ReportError {
  index?: number;
  resultId?: string;
  code?: string;
  message?: string;
}

export interface ReportResultsResponse {
  status?: boolean;
  accepted?: string;
  duplicates?: string;
  errors?: ReportError[];
}
