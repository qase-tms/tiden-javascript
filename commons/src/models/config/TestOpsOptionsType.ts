/**
 * Per-project configuration for multi-project (testops_multi) mode.
 */
export interface TestOpsProjectConfigType {
  code: string;
  run?: TestOpsRunType;
  environment?: string;
}

/**
 * Multi-project TestOps configuration.
 */
export interface TestOpsMultiConfigType {
  /** Default project for tests without explicit mapping (and for results without any case ID). */
  default_project?: string;
  /** List of project configurations. */
  projects: TestOpsProjectConfigType[];
}

export interface TestOpsOptionsType {
  project: string;
  uploadAttachments?: boolean | undefined;
  api: TestOpsApiType;
  run: TestOpsRunType;
  batch?: TestOpsBatchType;
  defect?: boolean | undefined;
  configurations?: TestOpsConfigurationType | undefined;
  statusFilter?: string[] | undefined;
  clientMeta?: Record<string, string> | undefined;
}

export interface TestOpsConfigurationType {
  values: TestOpsConfigurationValueType[];
}

export interface TestOpsConfigurationValueType {
  name: string;
  value: string;
}

export interface TestOpsRunType {
  id?: number | undefined;
  title?: string;
  description?: string;
  complete?: boolean | undefined;
  branch?: string;
}

export interface TestOpsBatchType {
  size?: number | undefined;
}

export interface TestOpsApiType {
  token: string;
  host?: string | undefined;
}

