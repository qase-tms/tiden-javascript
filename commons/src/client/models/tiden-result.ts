/** Wire types for Tiden's ReportResults — mirrors api.v1.ResultCreate. */
export interface TidenResultExecution {
  status: string;
  start_time?: number | null;
  end_time?: number | null;
  duration?: number | null;
  stacktrace?: string | null;
  thread?: string | null;
}

export interface TidenStepExecution {
  status: string;
  start_time?: number | null;
  end_time?: number | null;
  duration?: number | null;
  comment?: string | null;
  attachments?: string[];
}

export interface TidenResultStep {
  data?: { action?: string; expected_result?: string | null; input_data?: string | null };
  execution?: TidenStepExecution;
  steps?: TidenResultStep[];
  code?: { file?: string; line?: number };
}

export interface TidenSuiteSegment { title: string; external_id?: string }
export interface TidenParamGroup { names: string[] }

export interface TidenResultCreate {
  id?: string | null;
  title: string;
  signature?: string | null;
  external_id?: string | null;
  testops_ids?: number[] | null;
  execution: TidenResultExecution;
  fields?: Record<string, string>;
  attachments?: string[];
  steps?: TidenResultStep[];
  params?: Record<string, string>;
  param_groups: TidenParamGroup[];
  suite_path: TidenSuiteSegment[];
  message?: string | null;
  defect?: boolean;
}
