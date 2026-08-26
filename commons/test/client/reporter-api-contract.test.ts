import type { CreateTestRunBody as GeneratedCreateTestRunBody } from '../../../api-client/model/create-test-run-body';
import type { CreateTestRunResponse as GeneratedCreateTestRunResponse } from '../../../api-client/model/create-test-run-response';
import type { ParamGroup as GeneratedParamGroup } from '../../../api-client/model/param-group';
import type { ReportError as GeneratedReportError } from '../../../api-client/model/report-error';
import type { ReportResultsBody as GeneratedReportResultsBody } from '../../../api-client/model/report-results-body';
import type { ReportResultsResponse as GeneratedReportResultsResponse } from '../../../api-client/model/report-results-response';
import type { ResultCreate as GeneratedResultCreate } from '../../../api-client/model/result-create';
import type { ResultExecution as GeneratedResultExecution } from '../../../api-client/model/result-execution';
import type { ResultStep as GeneratedResultStep } from '../../../api-client/model/result-step';
import type { ResultStepData as GeneratedResultStepData } from '../../../api-client/model/result-step-data';
import type { ResultStepExecution as GeneratedResultStepExecution } from '../../../api-client/model/result-step-execution';
import type { StepCode as GeneratedStepCode } from '../../../api-client/model/step-code';
import type { SuiteSegment as GeneratedSuiteSegment } from '../../../api-client/model/suite-segment';
import type { TestRun as GeneratedTestRun } from '../../../api-client/model/test-run';
import type {
  CreateTestRunBody,
  CreateTestRunResponse,
  ParamGroup,
  ReportError,
  ReporterTestRun,
  ReportResultsBody,
  ReportResultsResponse,
  ResultCreate,
  ResultExecution,
  ResultStep,
  ResultStepData,
  ResultStepExecution,
  StepCode,
  SuiteSegment,
} from '../../src/client/reporter-api-models';

type SameKeys<A, B> = [keyof A] extends [keyof B]
  ? [keyof B] extends [keyof A] ? true : false
  : false;

type SameShape<A, B> = SameKeys<A, B> extends true
  ? [A] extends [B] ? [B] extends [A] ? true : false : false
  : false;

type SameSlice<A, B> = [keyof A] extends [keyof B]
  ? [A] extends [Pick<B, keyof A & keyof B>]
    ? [Pick<B, keyof A & keyof B>] extends [A] ? true : false
    : false
  : false;

// The tuple makes OpenAPI drift a TypeScript compilation failure. Runtime
// contract tests separately verify paths, auth and JSON serialization.
type ContractChecks = [
  SameShape<CreateTestRunBody, GeneratedCreateTestRunBody>,
  SameSlice<CreateTestRunResponse, GeneratedCreateTestRunResponse>,
  SameSlice<ReporterTestRun, GeneratedTestRun>,
  SameShape<ParamGroup, GeneratedParamGroup>,
  SameShape<ResultExecution, GeneratedResultExecution>,
  SameShape<ResultStepData, GeneratedResultStepData>,
  SameShape<ResultStepExecution, GeneratedResultStepExecution>,
  SameShape<StepCode, GeneratedStepCode>,
  SameShape<ResultStep, GeneratedResultStep>,
  SameShape<SuiteSegment, GeneratedSuiteSegment>,
  SameShape<ResultCreate, GeneratedResultCreate>,
  SameShape<ReportResultsBody, GeneratedReportResultsBody>,
  SameShape<ReportError, GeneratedReportError>,
  SameShape<ReportResultsResponse, GeneratedReportResultsResponse>,
];

const contractChecks: ContractChecks = [
  true, true, true, true, true, true, true,
  true, true, true, true, true, true, true,
];

describe('reporter API model contract', () => {
  it('matches the generated OpenAPI model slice', () => {
    expect(contractChecks).not.toContain(false);
  });
});
