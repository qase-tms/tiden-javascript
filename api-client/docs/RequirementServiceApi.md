# RequirementServiceApi

All URIs are relative to *https://api.tiden.ai*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**requirementServiceCreateRequirement**](#requirementservicecreaterequirement) | **POST** /v1/products/{productId}/requirements | |
|[**requirementServiceDeleteRequirement**](#requirementservicedeleterequirement) | **DELETE** /v1/requirements/{id} | |
|[**requirementServiceGetRequirement**](#requirementservicegetrequirement) | **GET** /v1/requirements/{id} | |
|[**requirementServiceListRequirements**](#requirementservicelistrequirements) | **GET** /v1/products/{productId}/requirements | |
|[**requirementServiceUpdateRequirement**](#requirementserviceupdaterequirement) | **PUT** /v1/requirements/{id} | |

# **requirementServiceCreateRequirement**
> CreateRequirementResponse requirementServiceCreateRequirement(createRequirementBody)


### Example

```typescript
import {
    RequirementServiceApi,
    Configuration,
    CreateRequirementBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new RequirementServiceApi(configuration);

let productId: string; // (default to undefined)
let createRequirementBody: CreateRequirementBody; //

const { status, data } = await apiInstance.requirementServiceCreateRequirement(
    productId,
    createRequirementBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createRequirementBody** | **CreateRequirementBody**|  | |
| **productId** | [**string**] |  | defaults to undefined|


### Return type

**CreateRequirementResponse**

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

# **requirementServiceDeleteRequirement**
> DeleteRequirementResponse requirementServiceDeleteRequirement()


### Example

```typescript
import {
    RequirementServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new RequirementServiceApi(configuration);

let id: string; // (default to undefined)
let branch: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.requirementServiceDeleteRequirement(
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

**DeleteRequirementResponse**

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

# **requirementServiceGetRequirement**
> GetRequirementResponse requirementServiceGetRequirement()


### Example

```typescript
import {
    RequirementServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new RequirementServiceApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.requirementServiceGetRequirement(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**GetRequirementResponse**

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

# **requirementServiceListRequirements**
> ListRequirementsResponse requirementServiceListRequirements()


### Example

```typescript
import {
    RequirementServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new RequirementServiceApi(configuration);

let productId: string; // (default to undefined)
let paginationPageSize: number; // (optional) (default to undefined)
let paginationPageToken: string; // (optional) (default to undefined)
let branch: string; // (optional) (default to undefined)
let includeSources: boolean; //When true, each returned requirement carries its full sources list (not just source_count). Agents need this for source-based identity matching (e.g. github_local_id / jira_issue anchors); the web UI leaves it off. (optional) (default to undefined)

const { status, data } = await apiInstance.requirementServiceListRequirements(
    productId,
    paginationPageSize,
    paginationPageToken,
    branch,
    includeSources
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|
| **paginationPageSize** | [**number**] |  | (optional) defaults to undefined|
| **paginationPageToken** | [**string**] |  | (optional) defaults to undefined|
| **branch** | [**string**] |  | (optional) defaults to undefined|
| **includeSources** | [**boolean**] | When true, each returned requirement carries its full sources list (not just source_count). Agents need this for source-based identity matching (e.g. github_local_id / jira_issue anchors); the web UI leaves it off. | (optional) defaults to undefined|


### Return type

**ListRequirementsResponse**

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

# **requirementServiceUpdateRequirement**
> UpdateRequirementResponse requirementServiceUpdateRequirement(updateRequirementBody)


### Example

```typescript
import {
    RequirementServiceApi,
    Configuration,
    UpdateRequirementBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new RequirementServiceApi(configuration);

let id: string; // (default to undefined)
let updateRequirementBody: UpdateRequirementBody; //

const { status, data } = await apiInstance.requirementServiceUpdateRequirement(
    id,
    updateRequirementBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateRequirementBody** | **UpdateRequirementBody**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**UpdateRequirementResponse**

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

