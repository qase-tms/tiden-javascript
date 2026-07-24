# AgentRunServiceApi

All URIs are relative to *https://api.tiden.ai*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**agentRunServiceCancelAgentRun**](#agentrunservicecancelagentrun) | **POST** /v1/agent-runs/{id}:cancel | |
|[**agentRunServiceGetAgentRun**](#agentrunservicegetagentrun) | **GET** /v1/agent-runs/{id} | |
|[**agentRunServiceListAgentRunEvents**](#agentrunservicelistagentrunevents) | **GET** /v1/agent-runs/{runId}/events | |
|[**agentRunServiceListAgentRuns**](#agentrunservicelistagentruns) | **GET** /v1/agent-configs/{agentConfigId}/runs | |
|[**agentRunServiceStartAgentRun**](#agentrunservicestartagentrun) | **POST** /v1/agent-configs/{agentConfigId}/runs | |
|[**agentRunServiceStreamAgentRun**](#agentrunservicestreamagentrun) | **GET** /v1/agent-runs/{runId}/events:stream | |

# **agentRunServiceCancelAgentRun**
> CancelAgentRunResponse agentRunServiceCancelAgentRun(cancelAgentRunBody)


### Example

```typescript
import {
    AgentRunServiceApi,
    Configuration,
    CancelAgentRunBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new AgentRunServiceApi(configuration);

let id: string; // (default to undefined)
let cancelAgentRunBody: CancelAgentRunBody; //

const { status, data } = await apiInstance.agentRunServiceCancelAgentRun(
    id,
    cancelAgentRunBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **cancelAgentRunBody** | **CancelAgentRunBody**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**CancelAgentRunResponse**

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

# **agentRunServiceGetAgentRun**
> GetAgentRunResponse agentRunServiceGetAgentRun()


### Example

```typescript
import {
    AgentRunServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new AgentRunServiceApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.agentRunServiceGetAgentRun(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**GetAgentRunResponse**

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

# **agentRunServiceListAgentRunEvents**
> ListAgentRunEventsResponse agentRunServiceListAgentRunEvents()


### Example

```typescript
import {
    AgentRunServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new AgentRunServiceApi(configuration);

let runId: string; // (default to undefined)
let pageSize: number; // (optional) (default to undefined)
let pageToken: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.agentRunServiceListAgentRunEvents(
    runId,
    pageSize,
    pageToken
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **runId** | [**string**] |  | defaults to undefined|
| **pageSize** | [**number**] |  | (optional) defaults to undefined|
| **pageToken** | [**string**] |  | (optional) defaults to undefined|


### Return type

**ListAgentRunEventsResponse**

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

# **agentRunServiceListAgentRuns**
> ListAgentRunsResponse agentRunServiceListAgentRuns()


### Example

```typescript
import {
    AgentRunServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new AgentRunServiceApi(configuration);

let agentConfigId: string; // (default to undefined)
let pageSize: number; // (optional) (default to undefined)
let pageToken: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.agentRunServiceListAgentRuns(
    agentConfigId,
    pageSize,
    pageToken
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **agentConfigId** | [**string**] |  | defaults to undefined|
| **pageSize** | [**number**] |  | (optional) defaults to undefined|
| **pageToken** | [**string**] |  | (optional) defaults to undefined|


### Return type

**ListAgentRunsResponse**

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

# **agentRunServiceStartAgentRun**
> StartAgentRunResponse agentRunServiceStartAgentRun(startAgentRunBody)


### Example

```typescript
import {
    AgentRunServiceApi,
    Configuration,
    StartAgentRunBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new AgentRunServiceApi(configuration);

let agentConfigId: string; // (default to undefined)
let startAgentRunBody: StartAgentRunBody; //

const { status, data } = await apiInstance.agentRunServiceStartAgentRun(
    agentConfigId,
    startAgentRunBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **startAgentRunBody** | **StartAgentRunBody**|  | |
| **agentConfigId** | [**string**] |  | defaults to undefined|


### Return type

**StartAgentRunResponse**

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

# **agentRunServiceStreamAgentRun**
> StreamResultOfAgentRunEvent agentRunServiceStreamAgentRun()


### Example

```typescript
import {
    AgentRunServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new AgentRunServiceApi(configuration);

let runId: string; // (default to undefined)
let afterEventId: string; //resume from this event id (cursor); empty starts from the beginning. (optional) (default to undefined)

const { status, data } = await apiInstance.agentRunServiceStreamAgentRun(
    runId,
    afterEventId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **runId** | [**string**] |  | defaults to undefined|
| **afterEventId** | [**string**] | resume from this event id (cursor); empty starts from the beginning. | (optional) defaults to undefined|


### Return type

**StreamResultOfAgentRunEvent**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful response.(streaming responses) |  -  |
|**0** | An unexpected error response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

