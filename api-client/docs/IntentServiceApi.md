# IntentServiceApi

All URIs are relative to *https://api.tiden.ai*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**intentServiceDistillIntent**](#intentservicedistillintent) | **POST** /v1/products/{productId}/intent:distill | |

# **intentServiceDistillIntent**
> DistillIntentResponse intentServiceDistillIntent(distillIntentBody)


### Example

```typescript
import {
    IntentServiceApi,
    Configuration,
    DistillIntentBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new IntentServiceApi(configuration);

let productId: string; //Product whose requirement tree the intent is reconciled against. (default to undefined)
let distillIntentBody: DistillIntentBody; //

const { status, data } = await apiInstance.intentServiceDistillIntent(
    productId,
    distillIntentBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **distillIntentBody** | **DistillIntentBody**|  | |
| **productId** | [**string**] | Product whose requirement tree the intent is reconciled against. | defaults to undefined|


### Return type

**DistillIntentResponse**

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

