# TestServiceApi

All URIs are relative to *https://api.tiden.ai*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**testServiceCreateTest**](#testservicecreatetest) | **POST** /v1/products/{productId}/tests | Creates a test suite or case.|
|[**testServiceDeleteTest**](#testservicedeletetest) | **DELETE** /v1/tests/{id} | Deletes a test.|
|[**testServiceDeriveTestLinks**](#testservicederivetestlinks) | **POST** /v1/products/{productId}/test-links:derive | Derives test-requirement links from shared file anchors.|
|[**testServiceGetTest**](#testservicegettest) | **GET** /v1/tests/{id} | Fetches one test by id.|
|[**testServiceIngestTests**](#testserviceingesttests) | **POST** /v1/products/{productId}/tests:ingest | Batch-upserts tests from a reporter (live-documentation ingest).|
|[**testServiceLinkRequirement**](#testservicelinkrequirement) | **POST** /v1/tests/{testId}/links | Links a test case to a requirement.|
|[**testServiceListBranchLinkProposals**](#testservicelistbranchlinkproposals) | **GET** /v1/branches/{branchId}/link-proposals | Lists a branch\&#39;s test-requirement link proposals.|
|[**testServiceListLinks**](#testservicelistlinks) | **GET** /v1/tests/{testId}/links | Lists a test\&#39;s requirement links.|
|[**testServiceListTests**](#testservicelisttests) | **GET** /v1/products/{productId}/tests | Lists a product\&#39;s tests.|
|[**testServiceReviewBranchLinkProposals**](#testservicereviewbranchlinkproposals) | **POST** /v1/branches/{branchId}/link-proposals:review | Accepts or rejects branch link proposals.|
|[**testServiceUnlinkRequirement**](#testserviceunlinkrequirement) | **DELETE** /v1/tests/{testId}/links/{requirementId} | Removes a test-requirement link.|
|[**testServiceUpdateTest**](#testserviceupdatetest) | **PUT** /v1/tests/{id} | Updates a test suite or case.|

# **testServiceCreateTest**
> CreateTestResponse testServiceCreateTest(createTestBody)

kind selects \"suite\" | \"case\"; case-only fields (status, steps, execution, ...) are ignored for suites. parent_id nests the test under a suite; branch (empty = main) applies the write copy-on-write. Cases get a product-wide seq_num.

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

On a branch (branch set, non-main) a main-row delete records a copy-on-write deletion marker that applies at merge; on main the row is deleted directly.

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

Matches requirement repo_file anchors against tests\' file_path. Exact-file matches are auto-linked durably (the Quality Gate recomputes); directory-proximity matches are returned as candidates for an agent to confirm via LinkRequirement. Idempotent. When the product spans more than one repository, matching is skipped entirely (multi_repo_skipped=true) — tests carry no repo attribution, so a bare path match could cross-link.

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

Returns the suite or case with steps, parameters, latest execution, and server-populated counts.

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

Idempotent upsert keyed on (product, branch, external_id); branch is auto-created when absent (empty = main). The whole batch (1..1000 entries) is validated up front and applied in one transaction: on validation failure nothing is written and the per-entry errors are returned (HTTP 400, also attached as google.rpc.Status details for gRPC clients). Suites are found-or-created from suite_path; requirement_seq_nums auto-link cases to requirements (main only).

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

Only cases can be linked, and only within one product. With branch empty (main) the durable link is written immediately and idempotently (duplicate links are a no-op) and requirement coverage recomputes. With a branch set, the call records a branch link PROPOSAL instead — reviewed via ReviewBranchLinkProposals and materialized when the branch merges.

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

Returns the link/unlink proposals recorded on the branch, optionally filtered by statuses (proposed | accepted | rejected). Accepted proposals become durable links when the branch merges.

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

On a branch view links resolve through copy-on-write (a COW copy surfaces its main source\'s links; branch-only tests have none) and read_only=true is returned so clients hide link editing.

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

Returns suites and cases as a flat list (parent_id encodes the tree) in the branch view (empty = main), with page_size/page_token pagination.

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

Applies decision (\"accepted\" | \"rejected\"), with an optional review_note, to the given proposal_ids (at least one required). Accepted proposals materialize into durable links at branch merge; rejected ones are dropped.

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

With branch empty (main) the durable link is removed idempotently (removing a non-existent link is a no-op) and requirement coverage recomputes. With a branch set, the call withdraws that branch\'s pending link proposal for the (test, requirement) pair instead of touching main links.

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

Scalar optional fields change only when present. Repeated/struct fields use replacement semantics behind set_* flags (set_tags, set_steps, set_custom_fields, ...): when the flag is true the paired value replaces the stored one entirely (empty clears); when false it is untouched. branch (empty = main) applies the edit copy-on-write.

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

