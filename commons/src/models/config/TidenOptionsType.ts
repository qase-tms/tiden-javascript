export interface TidenOptionsType {
  product: string;
  uploadAttachments?: boolean | undefined;
  api: TidenApiType;
  run: TidenRunType;
  batch?: TidenBatchType;
  defect?: boolean | undefined;
  configurations?: TidenConfigurationType | undefined;
  statusFilter?: string[] | undefined;
  clientMeta?: Record<string, string> | undefined;
}

export interface TidenConfigurationType {
  values: TidenConfigurationValueType[];
}

export interface TidenConfigurationValueType {
  name: string;
  value: string;
}

export interface TidenRunType {
  id?: number | undefined;
  title?: string;
  description?: string;
  complete?: boolean | undefined;
  branch?: string;
}

export interface TidenBatchType {
  size?: number | undefined;
}

export interface TidenApiType {
  token: string;
  /** Tiden API base URL, taken verbatim (no self-host URL templating). */
  baseUrl: string;
}
