# BranchServiceApi

All URIs are relative to *https://api.tiden.ai*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**branchServiceCreateBranch**](#branchservicecreatebranch) | **POST** /v1/products/{productId}/branches | Creates a copy-on-write branch of a product\&#39;s main line.|
|[**branchServiceDeleteBranch**](#branchservicedeletebranch) | **DELETE** /v1/branches/{id} | Deletes a branch and discards its copy-on-write changes.|
|[**branchServiceGetBranch**](#branchservicegetbranch) | **GET** /v1/branches/{id} | Fetches one branch by id.|
|[**branchServiceGetMergePreview**](#branchservicegetmergepreview) | **GET** /v1/branches/{id}/merge-preview | Previews the effect of merging a branch into main.|
|[**branchServiceListBranchCodeLinks**](#branchservicelistbranchcodelinks) | **GET** /v1/branches/{branchId}/code-links | Lists a branch\&#39;s durable code links (git branches, pull requests).|
|[**branchServiceListBranches**](#branchservicelistbranches) | **GET** /v1/products/{productId}/branches | Lists a product\&#39;s branches.|
|[**branchServiceMergeBranch**](#branchservicemergebranch) | **POST** /v1/branches/{id}/merge | Merges a branch\&#39;s changes into main and closes the branch.|
|[**branchServiceUpdateBranch**](#branchserviceupdatebranch) | **PATCH** /v1/branches/{id} | Updates a branch\&#39;s description and/or created_by_agent.|
|[**branchServiceUpsertBranchCodeLinks**](#branchserviceupsertbranchcodelinks) | **POST** /v1/branches/{branchId}/code-links | Upserts a batch of code links onto a branch.|

# **branchServiceCreateBranch**
> CreateBranchResponse branchServiceCreateBranch(createBranchBody)

The branch starts as a view of main; edits made on it copy entities on write and flow back via MergeBranch. name must be lowercase alphanumeric with hyphens/underscores/slashes, at most 100 characters, and not \"main\". created_by_agent_run_id attributes branches created by an agent run.

### Example

```typescript
import {
    BranchServiceApi,
    Configuration,
    CreateBranchBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new BranchServiceApi(configuration);

let productId: string; // (default to undefined)
let createBranchBody: CreateBranchBody; //

const { status, data } = await apiInstance.branchServiceCreateBranch(
    productId,
    createBranchBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createBranchBody** | **CreateBranchBody**|  | |
| **productId** | [**string**] |  | defaults to undefined|


### Return type

**CreateBranchResponse**

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

# **branchServiceDeleteBranch**
> object branchServiceDeleteBranch()

Permanently drops the branch\'s local requirement/test/component copies and deletion markers; main is unaffected. Deletion history is recorded per discarded requirement. The main branch cannot be deleted.

### Example

```typescript
import {
    BranchServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new BranchServiceApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.branchServiceDeleteBranch(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


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

# **branchServiceGetBranch**
> GetBranchResponse branchServiceGetBranch()

Returns the branch with its status and metadata. Change stats are only populated by ListBranches with include_stats=true.

### Example

```typescript
import {
    BranchServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new BranchServiceApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.branchServiceGetBranch(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**GetBranchResponse**

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

# **branchServiceGetMergePreview**
> GetMergePreviewResponse branchServiceGetMergePreview()

Returns the additions, modifications (with per-field conflict flags), and deletions the merge would apply, for requirements, tests, and components, plus aggregate stats. A conflict means main changed the entity after the branch took its copy. Read-only — nothing is written.

### Example

```typescript
import {
    BranchServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new BranchServiceApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.branchServiceGetMergePreview(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**GetMergePreviewResponse**

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

# **branchServiceListBranchCodeLinks**
> ListBranchCodeLinksResponse branchServiceListBranchCodeLinks()

Returns every link recorded for the branch, pull requests before git branches, then most recently updated first.

### Example

```typescript
import {
    BranchServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new BranchServiceApi(configuration);

let branchId: string; // (default to undefined)

const { status, data } = await apiInstance.branchServiceListBranchCodeLinks(
    branchId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **branchId** | [**string**] |  | defaults to undefined|


### Return type

**ListBranchCodeLinksResponse**

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

# **branchServiceListBranches**
> ListBranchesResponse branchServiceListBranches()

Returns every branch including main. Set include_stats to add per-branch change counts vs main (additions/modifications/deletions per entity kind, plus conflicts). Set include_status to add loop/latest-run/code-link/ intent-capture signals (Branch.loop/.latest_run/.code_links/.intent) — independent of include_stats, each is its own fixed-query-count batch read, so a caller that needs only the branch list is not charged for it.

### Example

```typescript
import {
    BranchServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new BranchServiceApi(configuration);

let productId: string; // (default to undefined)
let includeStats: boolean; //When true, each returned Branch carries BranchChangeStats (per-branch change counts vs main). (optional) (default to undefined)
let includeStatus: boolean; //When true, each returned Branch carries loop/latest-run/code-link/intent status signals (Branch.loop, .latest_run, .code_links, .intent). Kept separate from include_stats: the sidebar branch dropdown calls List without stats and must not pay for this extra work either. (optional) (default to undefined)

const { status, data } = await apiInstance.branchServiceListBranches(
    productId,
    includeStats,
    includeStatus
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|
| **includeStats** | [**boolean**] | When true, each returned Branch carries BranchChangeStats (per-branch change counts vs main). | (optional) defaults to undefined|
| **includeStatus** | [**boolean**] | When true, each returned Branch carries loop/latest-run/code-link/intent status signals (Branch.loop, .latest_run, .code_links, .intent). Kept separate from include_stats: the sidebar branch dropdown calls List without stats and must not pay for this extra work either. | (optional) defaults to undefined|


### Return type

**ListBranchesResponse**

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

# **branchServiceMergeBranch**
> MergeBranchResponse branchServiceMergeBranch(mergeBranchBody)

Applies the branch\'s additions/modifications/deletions to main in one transaction. Every conflicting entity requires a resolutions entry keyed \"req:<uuid>\", \"test:<uuid>\", or \"comp:<uuid>\" with value KEEP_BRANCH or KEEP_MAIN — otherwise the call fails with UNRESOLVED_CONFLICT and nothing is applied. Only open branches can merge; main cannot merge into itself.

### Example

```typescript
import {
    BranchServiceApi,
    Configuration,
    MergeBranchBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new BranchServiceApi(configuration);

let id: string; // (default to undefined)
let mergeBranchBody: MergeBranchBody; //

const { status, data } = await apiInstance.branchServiceMergeBranch(
    id,
    mergeBranchBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **mergeBranchBody** | **MergeBranchBody**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**MergeBranchResponse**

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

# **branchServiceUpdateBranch**
> UpdateBranchResponse branchServiceUpdateBranch(updateBranchBody)

Both request fields are optional: an absent field leaves the branch\'s current value unchanged, a present field (including an empty string) sets it. created_by_agent is validated server-side against a fixed allowlist — an unrecognized value is stored as empty string.

### Example

```typescript
import {
    BranchServiceApi,
    Configuration,
    UpdateBranchBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new BranchServiceApi(configuration);

let id: string; // (default to undefined)
let updateBranchBody: UpdateBranchBody; //

const { status, data } = await apiInstance.branchServiceUpdateBranch(
    id,
    updateBranchBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateBranchBody** | **UpdateBranchBody**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**UpdateBranchResponse**

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

# **branchServiceUpsertBranchCodeLinks**
> UpsertBranchCodeLinksResponse branchServiceUpsertBranchCodeLinks(upsertBranchCodeLinksBody)

Each entry is keyed by (kind, repository, ref): a repeat of an existing key updates url/title/state/base_sha/head_sha instead of duplicating. kind must be \"git_branch\" or \"pull_request\"; state must be \"\", \"open\", \"merged\", or \"closed\". Fails closed on the first invalid entry — nothing is written if any entry is invalid.

### Example

```typescript
import {
    BranchServiceApi,
    Configuration,
    UpsertBranchCodeLinksBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new BranchServiceApi(configuration);

let branchId: string; // (default to undefined)
let upsertBranchCodeLinksBody: UpsertBranchCodeLinksBody; //

const { status, data } = await apiInstance.branchServiceUpsertBranchCodeLinks(
    branchId,
    upsertBranchCodeLinksBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **upsertBranchCodeLinksBody** | **UpsertBranchCodeLinksBody**|  | |
| **branchId** | [**string**] |  | defaults to undefined|


### Return type

**UpsertBranchCodeLinksResponse**

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

