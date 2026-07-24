# BranchServiceApi

All URIs are relative to *https://api.tiden.ai*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**branchServiceCreateBranch**](#branchservicecreatebranch) | **POST** /v1/products/{productId}/branches | |
|[**branchServiceDeleteBranch**](#branchservicedeletebranch) | **DELETE** /v1/branches/{id} | |
|[**branchServiceGetBranch**](#branchservicegetbranch) | **GET** /v1/branches/{id} | |
|[**branchServiceGetMergePreview**](#branchservicegetmergepreview) | **GET** /v1/branches/{id}/merge-preview | |
|[**branchServiceListBranches**](#branchservicelistbranches) | **GET** /v1/products/{productId}/branches | |
|[**branchServiceMergeBranch**](#branchservicemergebranch) | **POST** /v1/branches/{id}/merge | |

# **branchServiceCreateBranch**
> CreateBranchResponse branchServiceCreateBranch(createBranchBody)


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

