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
  /** @deprecated use `baseUrl` — kept until the `host`-based env plumbing is fully renamed. */
  host?: string | undefined;
  /** Tiden API base URL, taken verbatim (no qase.io/self-host URL templating). */
  baseUrl?: string | undefined;
}

