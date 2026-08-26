import type { AxiosInstance, AxiosResponse } from 'axios';
import type {
  CreateTestRunBody,
  CreateTestRunResponse,
  ReportResultsBody,
  ReportResultsResponse,
} from './reporter-api-models';

const pathSegment = (value: string | number): string => encodeURIComponent(String(value));

/**
 * Purpose-built transport for the three JSON operations used by reporters.
 * Authentication, base URL and timeout are owned by the injected axios
 * instance; this layer owns only the OpenAPI paths and request/response DTOs.
 */
export class ReporterApi {
  constructor(private readonly http: AxiosInstance) {}

  createTestRun(productId: string, body: CreateTestRunBody): Promise<AxiosResponse<CreateTestRunResponse>> {
    return this.http.post<CreateTestRunResponse>(
      `/v1/products/${pathSegment(productId)}/runs`,
      body,
    );
  }

  completeTestRun(productId: string, runSeq: number): Promise<AxiosResponse<unknown>> {
    return this.http.post<unknown>(
      `/v1/products/${pathSegment(productId)}/runs/${pathSegment(runSeq)}:complete`,
      {},
    );
  }

  reportResults(
    productId: string,
    runSeq: number,
    body: ReportResultsBody,
  ): Promise<AxiosResponse<ReportResultsResponse>> {
    return this.http.post<ReportResultsResponse>(
      `/v1/products/${pathSegment(productId)}/runs/${pathSegment(runSeq)}/results:report`,
      body,
    );
  }
}
