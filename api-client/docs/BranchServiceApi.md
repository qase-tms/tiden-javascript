# BranchServiceApi

All URIs are relative to *https://api.tiden.ai*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**branchServiceCreateBranch**](#branchservicecreatebranch) | **POST** /v1/products/{productId}/branches | Creates a copy-on-write branch of a product\&#39;s main line.|
|[**branchServiceDeleteBranch**](#branchservicedeletebranch) | **DELETE** /v1/branches/{id} | Deletes a branch and discards its copy-on-write changes.|
|[**branchServiceGetBranch**](#branchservicegetbranch) | **GET** /v1/branches/{id} | Fetches one branch by id.|
|[**branchServiceGetMergePreview**](#branchservicegetmergepreview) | **GET** /v1/branches/{id}/merge-preview | Previews the effect of merging a branch into main.|
|[**branchServiceListBranches**](#branchservicelistbranches) | **GET** /v1/products/{productId}/branches | Lists a product\&#39;s branches.|
|[**branchServiceMergeBranch**](#branchservicemergebranch) | **POST** /v1/branches/{id}/merge | Merges a branch\&#39;s changes into main and closes the branch.|

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

# **branchServiceListBranches**
> ListBranchesResponse branchServiceListBranches()

Returns every branch including main. Set include_stats to add per-branch change counts vs main (additions/modifications/deletions per entity kind, plus conflicts).

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

const { status, data } = await apiInstance.branchServiceListBranches(
    productId,
    includeStats
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|
| **includeStats** | [**boolean**] | When true, each returned Branch carries BranchChangeStats (per-branch change counts vs main). | (optional) defaults to undefined|


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

