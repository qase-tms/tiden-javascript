# ComponentServiceApi

All URIs are relative to *https://api.tiden.ai*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**componentServiceCreateComponent**](#componentservicecreatecomponent) | **POST** /v1/products/{productId}/components | Creates a component in a product.|
|[**componentServiceListComponents**](#componentservicelistcomponents) | **GET** /v1/products/{productId}/components | Lists a product\&#39;s components.|
|[**componentServiceUpdateComponent**](#componentserviceupdatecomponent) | **PUT** /v1/components/{id} | Updates a component.|

# **componentServiceCreateComponent**
> CreateComponentResponse componentServiceCreateComponent(createComponentBody)

Components are the product\'s deployment/architectural units. repository (canonical repo id), component_paths (path-prefix scopes within it), and repository_aliases (local checkout paths) scope the component so changed files can be attributed to it. branch (empty = main) writes copy-on-write.

### Example

```typescript
import {
    ComponentServiceApi,
    Configuration,
    CreateComponentBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new ComponentServiceApi(configuration);

let productId: string; // (default to undefined)
let createComponentBody: CreateComponentBody; //

const { status, data } = await apiInstance.componentServiceCreateComponent(
    productId,
    createComponentBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createComponentBody** | **CreateComponentBody**|  | |
| **productId** | [**string**] |  | defaults to undefined|


### Return type

**CreateComponentResponse**

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

# **componentServiceListComponents**
> ListComponentsResponse componentServiceListComponents()

Returns the components in the branch view (empty branch = main), with page_size/page_token pagination.

### Example

```typescript
import {
    ComponentServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new ComponentServiceApi(configuration);

let productId: string; // (default to undefined)
let paginationPageSize: number; // (optional) (default to undefined)
let paginationPageToken: string; // (optional) (default to undefined)
let branch: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.componentServiceListComponents(
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

**ListComponentsResponse**

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

# **componentServiceUpdateComponent**
> UpdateComponentResponse componentServiceUpdateComponent(updateComponentBody)

name/description change only when present — omitted fields keep their stored value. Repository scoping uses explicit flags: set_repository, set_component_paths, and set_repository_aliases must be true for the paired value to be applied (including clearing it); false leaves the stored value untouched. branch (empty = main) writes copy-on-write.

### Example

```typescript
import {
    ComponentServiceApi,
    Configuration,
    UpdateComponentBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new ComponentServiceApi(configuration);

let id: string; // (default to undefined)
let updateComponentBody: UpdateComponentBody; //

const { status, data } = await apiInstance.componentServiceUpdateComponent(
    id,
    updateComponentBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateComponentBody** | **UpdateComponentBody**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**UpdateComponentResponse**

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

