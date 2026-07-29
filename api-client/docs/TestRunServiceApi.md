# TestRunServiceApi

All URIs are relative to *https://api.tiden.ai*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**testRunServiceAbortTestRun**](#testrunserviceaborttestrun) | **POST** /v1/products/{productId}/runs/{runSeq}:abort | Aborts a run.|
|[**testRunServiceCompleteTestRun**](#testrunservicecompletetestrun) | **POST** /v1/products/{productId}/runs/{runSeq}:complete | Completes a run and computes its final verdict.|
|[**testRunServiceCreateTestRun**](#testrunservicecreatetestrun) | **POST** /v1/products/{productId}/runs | Creates a test run to report CI results into.|
|[**testRunServiceDeleteTestRun**](#testrunservicedeletetestrun) | **DELETE** /v1/products/{productId}/runs/{runSeq} | Deletes a test run.|
|[**testRunServiceGetRunAttachment**](#testrunservicegetrunattachment) | **GET** /v1/products/{productId}/attachments/{hash} | Resolves an attachment content hash to a download URL.|
|[**testRunServiceGetRunResult**](#testrunservicegetrunresult) | **GET** /v1/products/{productId}/runs/{runSeq}/results/{resultId} | Fetches one reported result by id.|
|[**testRunServiceGetRunSummary**](#testrunservicegetrunsummary) | **GET** /v1/products/{productId}/runs/{runSeq}/summary | Returns per-suite and per-case rollups of a run.|
|[**testRunServiceGetTestRun**](#testrunservicegettestrun) | **GET** /v1/products/{productId}/runs/{runSeq} | Fetches one test run by its sequence number.|
|[**testRunServiceListRunResults**](#testrunservicelistrunresults) | **GET** /v1/products/{productId}/runs/{runSeq}/results | Lists a run\&#39;s reported results.|
|[**testRunServiceListTestRuns**](#testrunservicelisttestruns) | **GET** /v1/products/{productId}/runs | Lists a product\&#39;s test runs.|
|[**testRunServiceReportResults**](#testrunservicereportresults) | **POST** /v1/products/{productId}/runs/{runSeq}/results:report | Reports a batch of test results into a run.|

# **testRunServiceAbortTestRun**
> AbortTestRunResponse testRunServiceAbortTestRun(body)

Terminally cancels a run from new/in_progress; aborting a completed or already-aborted run is rejected. Stats are recomputed so a partial run still shows what was reported.

### Example

```typescript
import {
    TestRunServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new TestRunServiceApi(configuration);

let productId: string; // (default to undefined)
let runSeq: number; // (default to undefined)
let body: object; //

const { status, data } = await apiInstance.testRunServiceAbortTestRun(
    productId,
    runSeq,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **object**|  | |
| **productId** | [**string**] |  | defaults to undefined|
| **runSeq** | [**number**] |  | defaults to undefined|


### Return type

**AbortTestRunResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful response. |  -  |
|**0** | An unexpected error response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **testRunServiceCompleteTestRun**
> CompleteTestRunResponse testRunServiceCompleteTestRun(body)

Recounts stats and derives the terminal status (passed | failed) from the latest attempt per execution. Idempotent: completing an already-completed run returns it unchanged (and retries a stuck or failed live-doc sync); aborted runs cannot be completed. When the product has live documentation enabled, completion triggers reconciliation of the test repository from the run\'s results.

### Example

```typescript
import {
    TestRunServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new TestRunServiceApi(configuration);

let productId: string; // (default to undefined)
let runSeq: number; // (default to undefined)
let body: object; //

const { status, data } = await apiInstance.testRunServiceCompleteTestRun(
    productId,
    runSeq,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **object**|  | |
| **productId** | [**string**] |  | defaults to undefined|
| **runSeq** | [**number**] |  | defaults to undefined|


### Return type

**CompleteTestRunResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful response. |  -  |
|**0** | An unexpected error response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **testRunServiceCreateTestRun**
> CreateTestRunResponse testRunServiceCreateTestRun(createTestRunBody)

The run is the container ReportResults writes into. environment is a slug, auto-created when unknown; branch is the git branch name (CI metadata used for test matching — no Tiden branch is created); title defaults to \"Automated run <RFC3339>\" server-side. The returned run\'s seq_num is the run_seq every other run endpoint addresses.

### Example

```typescript
import {
    TestRunServiceApi,
    Configuration,
    CreateTestRunBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new TestRunServiceApi(configuration);

let productId: string; // (default to undefined)
let createTestRunBody: CreateTestRunBody; //

const { status, data } = await apiInstance.testRunServiceCreateTestRun(
    productId,
    createTestRunBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createTestRunBody** | **CreateTestRunBody**|  | |
| **productId** | [**string**] |  | defaults to undefined|


### Return type

**CreateTestRunResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful response. |  -  |
|**0** | An unexpected error response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **testRunServiceDeleteTestRun**
> object testRunServiceDeleteTestRun()

Permanently removes the run and its reported results. Not reversible.

### Example

```typescript
import {
    TestRunServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new TestRunServiceApi(configuration);

let productId: string; // (default to undefined)
let runSeq: number; // (default to undefined)

const { status, data } = await apiInstance.testRunServiceDeleteTestRun(
    productId,
    runSeq
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|
| **runSeq** | [**number**] |  | defaults to undefined|


### Return type

**object**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful response. |  -  |
|**0** | An unexpected error response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **testRunServiceGetRunAttachment**
> GetRunAttachmentResponse testRunServiceGetRunAttachment()

Resolves a hash uploaded via the reporter multipart route POST /v1/products/{product_id}/attachments:upload to a fresh presigned download URL (15-minute expiry, attachment disposition). Content- addressed: the same hash always names the same bytes within a product. Public so reporter/CLI clients and the SPA (JWT) can both fetch; an unknown hash returns ATTACHMENT_NOT_FOUND (HTTP 404).

### Example

```typescript
import {
    TestRunServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new TestRunServiceApi(configuration);

let productId: string; // (default to undefined)
let hash: string; //sha256 hex content hash (default to undefined)

const { status, data } = await apiInstance.testRunServiceGetRunAttachment(
    productId,
    hash
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|
| **hash** | [**string**] | sha256 hex content hash | defaults to undefined|


### Return type

**GetRunAttachmentResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful response. |  -  |
|**0** | An unexpected error response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **testRunServiceGetRunResult**
> GetRunResultResponse testRunServiceGetRunResult()

Returns the full result including steps, parameters, stacktrace, and attachment hashes (resolve via GetRunAttachment).

### Example

```typescript
import {
    TestRunServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new TestRunServiceApi(configuration);

let productId: string; // (default to undefined)
let runSeq: number; // (default to undefined)
let resultId: string; // (default to undefined)

const { status, data } = await apiInstance.testRunServiceGetRunResult(
    productId,
    runSeq,
    resultId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|
| **runSeq** | [**number**] |  | defaults to undefined|
| **resultId** | [**string**] |  | defaults to undefined|


### Return type

**GetRunResultResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful response. |  -  |
|**0** | An unexpected error response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **testRunServiceGetRunSummary**
> GetRunSummaryResponse testRunServiceGetRunSummary()

Aggregates the whole run into suite stats and case summaries (worst latest-attempt status across parameter combos, attempts, durations) so clients can render the run tree without paginating results.

### Example

```typescript
import {
    TestRunServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new TestRunServiceApi(configuration);

let productId: string; // (default to undefined)
let runSeq: number; // (default to undefined)

const { status, data } = await apiInstance.testRunServiceGetRunSummary(
    productId,
    runSeq
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|
| **runSeq** | [**number**] |  | defaults to undefined|


### Return type

**GetRunSummaryResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful response. |  -  |
|**0** | An unexpected error response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **testRunServiceGetTestRun**
> GetTestRunResponse testRunServiceGetTestRun()

Returns the run with its status, environment, stats (latest-attempt counters), and live-documentation sync state.

### Example

```typescript
import {
    TestRunServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new TestRunServiceApi(configuration);

let productId: string; // (default to undefined)
let runSeq: number; // (default to undefined)

const { status, data } = await apiInstance.testRunServiceGetTestRun(
    productId,
    runSeq
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|
| **runSeq** | [**number**] |  | defaults to undefined|


### Return type

**GetTestRunResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful response. |  -  |
|**0** | An unexpected error response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **testRunServiceListRunResults**
> ListRunResultsResponse testRunServiceListRunResults()

Filter by latest-attempt status, title substring (search), or identity_key (all attempts of one case identity); latest_only collapses retries to the latest attempt per execution. Paginated via pagination.page_size/page_token.

### Example

```typescript
import {
    TestRunServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new TestRunServiceApi(configuration);

let productId: string; // (default to undefined)
let runSeq: number; // (default to undefined)
let status: string; //optional filter (latest attempt status) (optional) (default to undefined)
let search: string; //optional title substring (optional) (default to undefined)
let identityKey: string; //optional: all attempts of one case identity (optional) (default to undefined)
let latestOnly: boolean; //collapse retries (default false = all rows) (optional) (default to undefined)
let paginationPageSize: number; // (optional) (default to undefined)
let paginationPageToken: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.testRunServiceListRunResults(
    productId,
    runSeq,
    status,
    search,
    identityKey,
    latestOnly,
    paginationPageSize,
    paginationPageToken
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|
| **runSeq** | [**number**] |  | defaults to undefined|
| **status** | [**string**] | optional filter (latest attempt status) | (optional) defaults to undefined|
| **search** | [**string**] | optional title substring | (optional) defaults to undefined|
| **identityKey** | [**string**] | optional: all attempts of one case identity | (optional) defaults to undefined|
| **latestOnly** | [**boolean**] | collapse retries (default false &#x3D; all rows) | (optional) defaults to undefined|
| **paginationPageSize** | [**number**] |  | (optional) defaults to undefined|
| **paginationPageToken** | [**string**] |  | (optional) defaults to undefined|


### Return type

**ListRunResultsResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful response. |  -  |
|**0** | An unexpected error response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **testRunServiceListTestRuns**
> ListTestRunsResponse testRunServiceListTestRuns()

Filter by status (new | in_progress | passed | failed | aborted), environment slug, branch name, or title substring via search. Paginated via pagination.page_size/page_token.

### Example

```typescript
import {
    TestRunServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new TestRunServiceApi(configuration);

let productId: string; // (default to undefined)
let status: string; //optional filter (optional) (default to undefined)
let environment: string; //optional environment slug filter (optional) (default to undefined)
let branch: string; //optional branch_name filter (optional) (default to undefined)
let search: string; //optional title substring (optional) (default to undefined)
let paginationPageSize: number; // (optional) (default to undefined)
let paginationPageToken: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.testRunServiceListTestRuns(
    productId,
    status,
    environment,
    branch,
    search,
    paginationPageSize,
    paginationPageToken
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|
| **status** | [**string**] | optional filter | (optional) defaults to undefined|
| **environment** | [**string**] | optional environment slug filter | (optional) defaults to undefined|
| **branch** | [**string**] | optional branch_name filter | (optional) defaults to undefined|
| **search** | [**string**] | optional title substring | (optional) defaults to undefined|
| **paginationPageSize** | [**number**] |  | (optional) defaults to undefined|
| **paginationPageToken** | [**string**] |  | (optional) defaults to undefined|


### Return type

**ListTestRunsResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful response. |  -  |
|**0** | An unexpected error response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **testRunServiceReportResults**
> ReportResultsResponse testRunServiceReportResults(reportResultsBody)

Accepts 1..2000 results per call. The batch is validated up front; on failure nothing is written and per-entry errors are returned (HTTP 400, also attached as google.rpc.Status details for gRPC clients). Each result\'s id is an idempotency key — resends count as duplicates and are skipped, so retrying a batch is safe. Results are matched to repository cases by testops_ids[0], then external_id, then signature (unmatched results are kept). Rejected once the run is completed/aborted (RUN_COMPLETED).

### Example

```typescript
import {
    TestRunServiceApi,
    Configuration,
    ReportResultsBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new TestRunServiceApi(configuration);

let productId: string; // (default to undefined)
let runSeq: number; // (default to undefined)
let reportResultsBody: ReportResultsBody; //

const { status, data } = await apiInstance.testRunServiceReportResults(
    productId,
    runSeq,
    reportResultsBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reportResultsBody** | **ReportResultsBody**|  | |
| **productId** | [**string**] |  | defaults to undefined|
| **runSeq** | [**number**] |  | defaults to undefined|


### Return type

**ReportResultsResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful response. |  -  |
|**0** | An unexpected error response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

