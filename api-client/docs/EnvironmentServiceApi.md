# EnvironmentServiceApi

All URIs are relative to *https://api.tiden.ai*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**environmentServiceCreateEnvironment**](#environmentservicecreateenvironment) | **POST** /v1/products/{productId}/environments | Creates an environment in a product.|
|[**environmentServiceDeleteEnvironment**](#environmentservicedeleteenvironment) | **DELETE** /v1/environments/{id} | Deletes an environment.|
|[**environmentServiceGetEnvironment**](#environmentservicegetenvironment) | **GET** /v1/environments/{id} | Fetches one environment by id.|
|[**environmentServiceListEnvironments**](#environmentservicelistenvironments) | **GET** /v1/products/{productId}/environments | Lists a product\&#39;s environments.|

# **environmentServiceCreateEnvironment**
> CreateEnvironmentResponse environmentServiceCreateEnvironment(createEnvironmentBody)

Environments (e.g. production, staging) label where test runs and releases happened. slug is the stable identifier reporters and CI reference in CreateTestRun/CreateRelease; those endpoints also auto-create unknown slugs, so explicit creation is only needed to control name/host/type.

### Example

```typescript
import {
    EnvironmentServiceApi,
    Configuration,
    CreateEnvironmentBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new EnvironmentServiceApi(configuration);

let productId: string; // (default to undefined)
let createEnvironmentBody: CreateEnvironmentBody; //

const { status, data } = await apiInstance.environmentServiceCreateEnvironment(
    productId,
    createEnvironmentBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createEnvironmentBody** | **CreateEnvironmentBody**|  | |
| **productId** | [**string**] |  | defaults to undefined|


### Return type

**CreateEnvironmentResponse**

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

# **environmentServiceDeleteEnvironment**
> object environmentServiceDeleteEnvironment()

Permanently removes the environment from the product. Test runs and releases that referenced it keep their recorded slug.

### Example

```typescript
import {
    EnvironmentServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new EnvironmentServiceApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.environmentServiceDeleteEnvironment(
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

# **environmentServiceGetEnvironment**
> GetEnvironmentResponse environmentServiceGetEnvironment()

Returns the environment including its slug, host, type, and origin.

### Example

```typescript
import {
    EnvironmentServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new EnvironmentServiceApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.environmentServiceGetEnvironment(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**GetEnvironmentResponse**

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

# **environmentServiceListEnvironments**
> ListEnvironmentsResponse environmentServiceListEnvironments()

Returns all environments of the product with page_size/page_token pagination.

### Example

```typescript
import {
    EnvironmentServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new EnvironmentServiceApi(configuration);

let productId: string; // (default to undefined)
let paginationPageSize: number; // (optional) (default to undefined)
let paginationPageToken: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.environmentServiceListEnvironments(
    productId,
    paginationPageSize,
    paginationPageToken
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|
| **paginationPageSize** | [**number**] |  | (optional) defaults to undefined|
| **paginationPageToken** | [**string**] |  | (optional) defaults to undefined|


### Return type

**ListEnvironmentsResponse**

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

