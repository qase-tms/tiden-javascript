# TestServiceApi

All URIs are relative to *https://api.tiden.ai*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**testServiceCreateTest**](#testservicecreatetest) | **POST** /v1/products/{productId}/tests | |
|[**testServiceDeleteTest**](#testservicedeletetest) | **DELETE** /v1/tests/{id} | |
|[**testServiceDeriveTestLinks**](#testservicederivetestlinks) | **POST** /v1/products/{productId}/test-links:derive | DeriveTestLinks matches requirement repo_file anchors against tests\&#39; file_path: exact-file matches are auto-linked (durable, moves the gate), directory-proximity matches are returned for an agent to confirm via LinkRequirement. Idempotent.|
|[**testServiceGetTest**](#testservicegettest) | **GET** /v1/tests/{id} | |
|[**testServiceIngestTests**](#testserviceingesttests) | **POST** /v1/products/{productId}/tests:ingest | IngestTests is the reporter-friendly batch upsert endpoint. Idempotent on (product, branch, external_id). Server-validates the entire batch upfront, then either applies all changes or returns 422 with the per-entry errors. Max 1000 tests per call (enforced server-side).|
|[**testServiceLinkRequirement**](#testservicelinkrequirement) | **POST** /v1/tests/{testId}/links | |
|[**testServiceListBranchLinkProposals**](#testservicelistbranchlinkproposals) | **GET** /v1/branches/{branchId}/link-proposals | |
|[**testServiceListLinks**](#testservicelistlinks) | **GET** /v1/tests/{testId}/links | |
|[**testServiceListTests**](#testservicelisttests) | **GET** /v1/products/{productId}/tests | |
|[**testServiceReviewBranchLinkProposals**](#testservicereviewbranchlinkproposals) | **POST** /v1/branches/{branchId}/link-proposals:review | |
|[**testServiceUnlinkRequirement**](#testserviceunlinkrequirement) | **DELETE** /v1/tests/{testId}/links/{requirementId} | |
|[**testServiceUpdateTest**](#testserviceupdatetest) | **PUT** /v1/tests/{id} | |

# **testServiceCreateTest**
> CreateTestResponse testServiceCreateTest(createTestBody)


### Example

```typescript
import {
    TestServiceApi,
    Configuration,
    CreateTestBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new TestServiceApi(configuration);

let productId: string; // (default to undefined)
let createTestBody: CreateTestBody; //

const { status, data } = await apiInstance.testServiceCreateTest(
    productId,
    createTestBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createTestBody** | **CreateTestBody**|  | |
| **productId** | [**string**] |  | defaults to undefined|


### Return type

**CreateTestResponse**

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

# **testServiceDeleteTest**
> object testServiceDeleteTest()


### Example

```typescript
import {
    TestServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new TestServiceApi(configuration);

let id: string; // (default to undefined)
let branch: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.testServiceDeleteTest(
    id,
    branch
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|
| **branch** | [**string**] |  | (optional) defaults to undefined|


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

# **testServiceDeriveTestLinks**
> DeriveTestLinksResponse testServiceDeriveTestLinks(body)


### Example

```typescript
import {
    TestServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new TestServiceApi(configuration);

let productId: string; // (default to undefined)
let body: object; //

const { status, data } = await apiInstance.testServiceDeriveTestLinks(
    productId,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **object**|  | |
| **productId** | [**string**] |  | defaults to undefined|


### Return type

**DeriveTestLinksResponse**

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

# **testServiceGetTest**
> GetTestResponse testServiceGetTest()


### Example

```typescript
import {
    TestServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new TestServiceApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.testServiceGetTest(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**GetTestResponse**

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

# **testServiceIngestTests**
> IngestTestsResponse testServiceIngestTests(ingestTestsBody)


### Example

```typescript
import {
    TestServiceApi,
    Configuration,
    IngestTestsBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new TestServiceApi(configuration);

let productId: string; // (default to undefined)
let ingestTestsBody: IngestTestsBody; //

const { status, data } = await apiInstance.testServiceIngestTests(
    productId,
    ingestTestsBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ingestTestsBody** | **IngestTestsBody**|  | |
| **productId** | [**string**] |  | defaults to undefined|


### Return type

**IngestTestsResponse**

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

# **testServiceLinkRequirement**
> object testServiceLinkRequirement(linkRequirementBody)


### Example

```typescript
import {
    TestServiceApi,
    Configuration,
    LinkRequirementBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new TestServiceApi(configuration);

let testId: string; // (default to undefined)
let linkRequirementBody: LinkRequirementBody; //

const { status, data } = await apiInstance.testServiceLinkRequirement(
    testId,
    linkRequirementBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **linkRequirementBody** | **LinkRequirementBody**|  | |
| **testId** | [**string**] |  | defaults to undefined|


### Return type

**object**

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

# **testServiceListBranchLinkProposals**
> ListBranchLinkProposalsResponse testServiceListBranchLinkProposals()


### Example

```typescript
import {
    TestServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new TestServiceApi(configuration);

let branchId: string; // (default to undefined)
let statuses: Array<string>; // (optional) (default to undefined)

const { status, data } = await apiInstance.testServiceListBranchLinkProposals(
    branchId,
    statuses
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **branchId** | [**string**] |  | defaults to undefined|
| **statuses** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|


### Return type

**ListBranchLinkProposalsResponse**

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

# **testServiceListLinks**
> ListLinksResponse testServiceListLinks()


### Example

```typescript
import {
    TestServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new TestServiceApi(configuration);

let testId: string; // (default to undefined)
let branch: string; //when set, links are read-only via COW (optional) (default to undefined)

const { status, data } = await apiInstance.testServiceListLinks(
    testId,
    branch
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **testId** | [**string**] |  | defaults to undefined|
| **branch** | [**string**] | when set, links are read-only via COW | (optional) defaults to undefined|


### Return type

**ListLinksResponse**

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

# **testServiceListTests**
> ListTestsResponse testServiceListTests()


### Example

```typescript
import {
    TestServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new TestServiceApi(configuration);

let productId: string; // (default to undefined)
let paginationPageSize: number; // (optional) (default to undefined)
let paginationPageToken: string; // (optional) (default to undefined)
let branch: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.testServiceListTests(
    productId,
    paginationPageSize,
    paginationPageToken,
    branch
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|
| **paginationPageSize** | [**number**] |  | (optional) defaults to undefined|
| **paginationPageToken** | [**string**] |  | (optional) defaults to undefined|
| **branch** | [**string**] |  | (optional) defaults to undefined|


### Return type

**ListTestsResponse**

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

# **testServiceReviewBranchLinkProposals**
> ReviewBranchLinkProposalsResponse testServiceReviewBranchLinkProposals(reviewBranchLinkProposalsBody)


### Example

```typescript
import {
    TestServiceApi,
    Configuration,
    ReviewBranchLinkProposalsBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new TestServiceApi(configuration);

let branchId: string; // (default to undefined)
let reviewBranchLinkProposalsBody: ReviewBranchLinkProposalsBody; //

const { status, data } = await apiInstance.testServiceReviewBranchLinkProposals(
    branchId,
    reviewBranchLinkProposalsBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reviewBranchLinkProposalsBody** | **ReviewBranchLinkProposalsBody**|  | |
| **branchId** | [**string**] |  | defaults to undefined|


### Return type

**ReviewBranchLinkProposalsResponse**

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

# **testServiceUnlinkRequirement**
> object testServiceUnlinkRequirement()


### Example

```typescript
import {
    TestServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new TestServiceApi(configuration);

let testId: string; // (default to undefined)
let requirementId: string; // (default to undefined)
let branch: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.testServiceUnlinkRequirement(
    testId,
    requirementId,
    branch
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **testId** | [**string**] |  | defaults to undefined|
| **requirementId** | [**string**] |  | defaults to undefined|
| **branch** | [**string**] |  | (optional) defaults to undefined|


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

# **testServiceUpdateTest**
> UpdateTestResponse testServiceUpdateTest(updateTestBody)


### Example

```typescript
import {
    TestServiceApi,
    Configuration,
    UpdateTestBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new TestServiceApi(configuration);

let id: string; // (default to undefined)
let updateTestBody: UpdateTestBody; //

const { status, data } = await apiInstance.testServiceUpdateTest(
    id,
    updateTestBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateTestBody** | **UpdateTestBody**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**UpdateTestResponse**

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

