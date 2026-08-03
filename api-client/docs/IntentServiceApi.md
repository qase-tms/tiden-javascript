# IntentServiceApi

All URIs are relative to *https://api.tiden.ai*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**intentServiceDistillIntent**](#intentservicedistillintent) | **POST** /v1/products/{productId}/intent:distill | Distills a coding-session transcript into requirement changes.|

# **intentServiceDistillIntent**
> DistillIntentResponse intentServiceDistillIntent(distillIntentBody)

Runs an LLM reconciliation of the transcript against the product\'s requirement tree and writes the created/updated requirements to an intent/YYYY-MM-DD-<slug> branch for review (slug defaults to \"session\"; same-day non-open branch names get a -2..-9 suffix). Requires a usable llm.* workspace credential (credential_id overrides the default). An empty transcript is a readiness probe: configuration is validated and the call reports skipped=true without invoking the LLM.

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

