# IssueServiceApi

All URIs are relative to *https://api.tiden.ai*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**issueServiceConfirmSourceMapUpload**](#issueserviceconfirmsourcemapupload) | **POST** /v1/sourcemaps/{id}:confirm | Finalizes a source-map upload (phase 2 of 2).|
|[**issueServiceCreateSourceMapUpload**](#issueservicecreatesourcemapupload) | **POST** /v1/products/{productId}/sourcemaps | Starts a source-map upload (phase 1 of 2).|

# **issueServiceConfirmSourceMapUpload**
> ConfirmSourceMapUploadResponse issueServiceConfirmSourceMapUpload(body)

Validates the staged object and atomically promotes it to live, so error events carrying the same debug_id resolve to original sources. Returns metadata only — never a download URL (source maps stay private). Billing-exempt: addressed by source-map id (the product-gated entry point is CreateSourceMapUpload); source maps are observability infra, not a billed cap.

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

Creates a pending source-map row keyed by debug_id and returns a presigned PUT URL to a staging key. Upload the raw map bytes to upload_url, then call ConfirmSourceMapUpload with the returned id to promote it.

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

