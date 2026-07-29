# AuthServiceApi

All URIs are relative to *https://api.tiden.ai*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**authServiceGetCurrentUser**](#authservicegetcurrentuser) | **GET** /v1/auth/me | Returns the authenticated user (whoami).|
|[**authServiceUpdateUserOnboarding**](#authserviceupdateuseronboarding) | **PUT** /v1/auth/onboarding | Updates the caller\&#39;s onboarding progress flags.|

# **authServiceGetCurrentUser**
> GetCurrentUserResponse authServiceGetCurrentUser()

Resolves the caller from the presented credential (API token or session) and returns the user\'s id, email, name, and avatar URL. The CLI uses it to verify that a token is valid and who it belongs to.

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

One-way latches: each of cli_verified, dismissed, and completed stamps its timestamp on the caller\'s onboarding state when true; false leaves the flag unchanged (flags cannot be un-set through this RPC). Returns the resulting onboarding state.

### Example

```typescript
import {
    AuthServiceApi,
    Configuration,
    UpdateUserOnboardingRequest
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new AuthServiceApi(configuration);

let updateUserOnboardingRequest: UpdateUserOnboardingRequest; //UpdateUserOnboardingRequest latches onboarding flags: each true field stamps its timestamp; false leaves the flag unchanged. wizard_step and answers are ordinary mutable state: an unset field is left untouched, a set one replaces the stored value.

const { status, data } = await apiInstance.authServiceUpdateUserOnboarding(
    updateUserOnboardingRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateUserOnboardingRequest** | **UpdateUserOnboardingRequest**| UpdateUserOnboardingRequest latches onboarding flags: each true field stamps its timestamp; false leaves the flag unchanged. wizard_step and answers are ordinary mutable state: an unset field is left untouched, a set one replaces the stored value. | |


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

