# AgentServiceApi

All URIs are relative to *https://api.tiden.ai*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**agentServiceCreateAgentConfig**](#agentservicecreateagentconfig) | **POST** /v1/products/{productId}/agent-configs | |
|[**agentServiceDeleteAgentConfig**](#agentservicedeleteagentconfig) | **DELETE** /v1/agent-configs/{id} | |
|[**agentServiceGetAgentConfig**](#agentservicegetagentconfig) | **GET** /v1/agent-configs/{id} | |
|[**agentServiceListAgentConfigs**](#agentservicelistagentconfigs) | **GET** /v1/products/{productId}/agent-configs | |
|[**agentServiceListAgentTypes**](#agentservicelistagenttypes) | **GET** /v1/agent-types | |

# **agentServiceCreateAgentConfig**
> CreateAgentConfigResponse agentServiceCreateAgentConfig(createAgentConfigBody)


### Example

```typescript
import {
    AgentServiceApi,
    Configuration,
    CreateAgentConfigBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new AgentServiceApi(configuration);

let productId: string; // (default to undefined)
let createAgentConfigBody: CreateAgentConfigBody; //

const { status, data } = await apiInstance.agentServiceCreateAgentConfig(
    productId,
    createAgentConfigBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createAgentConfigBody** | **CreateAgentConfigBody**|  | |
| **productId** | [**string**] |  | defaults to undefined|


### Return type

**CreateAgentConfigResponse**

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

# **agentServiceDeleteAgentConfig**
> object agentServiceDeleteAgentConfig()


### Example

```typescript
import {
    AgentServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new AgentServiceApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.agentServiceDeleteAgentConfig(
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

# **agentServiceGetAgentConfig**
> GetAgentConfigResponse agentServiceGetAgentConfig()


### Example

```typescript
import {
    AgentServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new AgentServiceApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.agentServiceGetAgentConfig(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**GetAgentConfigResponse**

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

# **agentServiceListAgentConfigs**
> ListAgentConfigsResponse agentServiceListAgentConfigs()


### Example

```typescript
import {
    AgentServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new AgentServiceApi(configuration);

let productId: string; // (default to undefined)

const { status, data } = await apiInstance.agentServiceListAgentConfigs(
    productId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|


### Return type

**ListAgentConfigsResponse**

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

# **agentServiceListAgentTypes**
> ListAgentTypesResponse agentServiceListAgentTypes()


### Example

```typescript
import {
    AgentServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new AgentServiceApi(configuration);

const { status, data } = await apiInstance.agentServiceListAgentTypes();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ListAgentTypesResponse**

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

