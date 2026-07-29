# AgentServiceApi

All URIs are relative to *https://api.tiden.ai*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**agentServiceCreateAgentConfig**](#agentservicecreateagentconfig) | **POST** /v1/products/{productId}/agent-configs | Creates an agent configuration in a product.|
|[**agentServiceDeleteAgentConfig**](#agentservicedeleteagentconfig) | **DELETE** /v1/agent-configs/{id} | Deletes an agent configuration.|
|[**agentServiceGetAgentConfig**](#agentservicegetagentconfig) | **GET** /v1/agent-configs/{id} | Fetches one agent configuration by id.|
|[**agentServiceListAgentConfigs**](#agentservicelistagentconfigs) | **GET** /v1/products/{productId}/agent-configs | Lists a product\&#39;s agent configurations.|
|[**agentServiceListAgentTypes**](#agentservicelistagenttypes) | **GET** /v1/agent-types | Lists the catalog of available agent types.|

# **agentServiceCreateAgentConfig**
> CreateAgentConfigResponse agentServiceCreateAgentConfig(createAgentConfigBody)

Binds an agent_type to the product with a name, inputs_json matching the type\'s input schema, optional LLM/data credential references, and an optional cron schedule (schedule_cron + schedule_timezone). Runs are started separately via StartAgentRun, the schedule, or a trigger.

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

Permanently removes the config; scheduled executions stop. Not reversible.

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

Returns the config including inputs_json (parse against the agent type\'s input_schema_json), schedule, and credential references.

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

Returns every agent config of the product, including its inputs, optional cron schedule, and credential references (never credential secrets).

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

Returns every code-defined agent capability with its input JSON Schema (input_schema_json), supported LLM providers, per-provider default models, and whether it needs a data credential or produces a branch. The catalog is global — not product-scoped.

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

