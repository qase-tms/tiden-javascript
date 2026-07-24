# ReleaseServiceApi

All URIs are relative to *https://api.tiden.ai*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**releaseServiceCreateRelease**](#releaseservicecreaterelease) | **POST** /v1/products/{productId}/releases | Create a release from an external source (CI/SDK). Idempotent upsert on (product, version, environment). The environment is matched by slug and auto-created if unknown.|
|[**releaseServiceGetRelease**](#releaseservicegetrelease) | **GET** /v1/releases/{id} | |
|[**releaseServiceListReleases**](#releaseservicelistreleases) | **GET** /v1/products/{productId}/releases | |

# **releaseServiceCreateRelease**
> CreateReleaseResponse releaseServiceCreateRelease(createReleaseBody)


### Example

```typescript
import {
    ReleaseServiceApi,
    Configuration,
    CreateReleaseBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new ReleaseServiceApi(configuration);

let productId: string; // (default to undefined)
let createReleaseBody: CreateReleaseBody; //

const { status, data } = await apiInstance.releaseServiceCreateRelease(
    productId,
    createReleaseBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createReleaseBody** | **CreateReleaseBody**|  | |
| **productId** | [**string**] |  | defaults to undefined|


### Return type

**CreateReleaseResponse**

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

# **releaseServiceGetRelease**
> GetReleaseResponse releaseServiceGetRelease()


### Example

```typescript
import {
    ReleaseServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new ReleaseServiceApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.releaseServiceGetRelease(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**GetReleaseResponse**

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

# **releaseServiceListReleases**
> ListReleasesResponse releaseServiceListReleases()


### Example

```typescript
import {
    ReleaseServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new ReleaseServiceApi(configuration);

let productId: string; // (default to undefined)
let environment: string; //optional environment slug filter (optional) (default to undefined)
let paginationPageSize: number; // (optional) (default to undefined)
let paginationPageToken: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.releaseServiceListReleases(
    productId,
    environment,
    paginationPageSize,
    paginationPageToken
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|
| **environment** | [**string**] | optional environment slug filter | (optional) defaults to undefined|
| **paginationPageSize** | [**number**] |  | (optional) defaults to undefined|
| **paginationPageToken** | [**string**] |  | (optional) defaults to undefined|


### Return type

**ListReleasesResponse**

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

