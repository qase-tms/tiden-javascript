# TestRunServiceApi

All URIs are relative to *https://api.tiden.ai*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**testRunServiceAbortTestRun**](#testrunserviceaborttestrun) | **POST** /v1/products/{productId}/runs/{runSeq}:abort | |
|[**testRunServiceCompleteTestRun**](#testrunservicecompletetestrun) | **POST** /v1/products/{productId}/runs/{runSeq}:complete | |
|[**testRunServiceCreateTestRun**](#testrunservicecreatetestrun) | **POST** /v1/products/{productId}/runs | |
|[**testRunServiceDeleteTestRun**](#testrunservicedeletetestrun) | **DELETE** /v1/products/{productId}/runs/{runSeq} | |
|[**testRunServiceGetRunAttachment**](#testrunservicegetrunattachment) | **GET** /v1/products/{productId}/attachments/{hash} | Resolves a content-hash (uploaded via the reporter multipart route POST /v1/products/{product_id}/attachments:upload) to a presigned download URL. Public so reporter/CLI clients and the SPA (JWT) can both fetch; ATTACHMENT_NOT_FOUND (→ 404) for an unknown hash — the drawer renders \&quot;attachment unavailable\&quot; on that.|
|[**testRunServiceGetRunResult**](#testrunservicegetrunresult) | **GET** /v1/products/{productId}/runs/{runSeq}/results/{resultId} | |
|[**testRunServiceGetRunSummary**](#testrunservicegetrunsummary) | **GET** /v1/products/{productId}/runs/{runSeq}/summary | |
|[**testRunServiceGetTestRun**](#testrunservicegettestrun) | **GET** /v1/products/{productId}/runs/{runSeq} | |
|[**testRunServiceListRunResults**](#testrunservicelistrunresults) | **GET** /v1/products/{productId}/runs/{runSeq}/results | |
|[**testRunServiceListTestRuns**](#testrunservicelisttestruns) | **GET** /v1/products/{productId}/runs | |
|[**testRunServiceReportResults**](#testrunservicereportresults) | **POST** /v1/products/{productId}/runs/{runSeq}/results:report | |

# **testRunServiceAbortTestRun**
> AbortTestRunResponse testRunServiceAbortTestRun(body)


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

