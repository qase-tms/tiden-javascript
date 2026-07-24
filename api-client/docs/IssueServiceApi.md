# IssueServiceApi

All URIs are relative to *https://api.tiden.ai*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**issueServiceConfirmSourceMapUpload**](#issueserviceconfirmsourcemapupload) | **POST** /v1/sourcemaps/{id}:confirm | Phase 3: server validates the staged object + atomically promotes to live. Exempt: addressed by source-map id (the product-gated entry point is CreateSourceMapUpload); source maps are observability infra, not a billed cap.|
|[**issueServiceCreateSourceMapUpload**](#issueservicecreatesourcemapupload) | **POST** /v1/products/{productId}/sourcemaps | Phase 1: create a pending row, return a presigned PUT to a staging key.|

# **issueServiceConfirmSourceMapUpload**
> ConfirmSourceMapUploadResponse issueServiceConfirmSourceMapUpload(body)


### Example

```typescript
import {
    IssueServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new IssueServiceApi(configuration);

let id: string; // (default to undefined)
let body: object; //

const { status, data } = await apiInstance.issueServiceConfirmSourceMapUpload(
    id,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **object**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**ConfirmSourceMapUploadResponse**

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

# **issueServiceCreateSourceMapUpload**
> CreateSourceMapUploadResponse issueServiceCreateSourceMapUpload(createSourceMapUploadBody)


### Example

```typescript
import {
    IssueServiceApi,
    Configuration,
    CreateSourceMapUploadBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new IssueServiceApi(configuration);

let productId: string; // (default to undefined)
let createSourceMapUploadBody: CreateSourceMapUploadBody; //

const { status, data } = await apiInstance.issueServiceCreateSourceMapUpload(
    productId,
    createSourceMapUploadBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createSourceMapUploadBody** | **CreateSourceMapUploadBody**|  | |
| **productId** | [**string**] |  | defaults to undefined|


### Return type

**CreateSourceMapUploadResponse**

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

