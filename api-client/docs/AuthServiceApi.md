# AuthServiceApi

All URIs are relative to *https://api.tiden.ai*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**authServiceGetCurrentUser**](#authservicegetcurrentuser) | **GET** /v1/auth/me | |
|[**authServiceUpdateUserOnboarding**](#authserviceupdateuseronboarding) | **PUT** /v1/auth/onboarding | |

# **authServiceGetCurrentUser**
> GetCurrentUserResponse authServiceGetCurrentUser()


### Example

```typescript
import {
    AuthServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new AuthServiceApi(configuration);

const { status, data } = await apiInstance.authServiceGetCurrentUser();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**GetCurrentUserResponse**

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

# **authServiceUpdateUserOnboarding**
> UpdateUserOnboardingResponse authServiceUpdateUserOnboarding(updateUserOnboardingRequest)


### Example

```typescript
import {
    AuthServiceApi,
    Configuration,
    UpdateUserOnboardingRequest
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new AuthServiceApi(configuration);

let updateUserOnboardingRequest: UpdateUserOnboardingRequest; //

const { status, data } = await apiInstance.authServiceUpdateUserOnboarding(
    updateUserOnboardingRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateUserOnboardingRequest** | **UpdateUserOnboardingRequest**|  | |


### Return type

**UpdateUserOnboardingResponse**

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

