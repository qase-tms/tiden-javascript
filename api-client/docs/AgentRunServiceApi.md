# AgentRunServiceApi

All URIs are relative to *https://api.tiden.ai*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**agentRunServiceCancelAgentRun**](#agentrunservicecancelagentrun) | **POST** /v1/agent-runs/{id}:cancel | Cancels a pending or running agent run.|
|[**agentRunServiceGetAgentRun**](#agentrunservicegetagentrun) | **GET** /v1/agent-runs/{id} | Fetches one agent run by id.|
|[**agentRunServiceListAgentRunEvents**](#agentrunservicelistagentrunevents) | **GET** /v1/agent-runs/{runId}/events | Lists the event log of an agent run.|
|[**agentRunServiceListAgentRuns**](#agentrunservicelistagentruns) | **GET** /v1/agent-configs/{agentConfigId}/runs | Lists the runs of an agent configuration.|
|[**agentRunServiceStartAgentRun**](#agentrunservicestartagentrun) | **POST** /v1/agent-configs/{agentConfigId}/runs | Starts a run of an agent configuration.|
|[**agentRunServiceStreamAgentRun**](#agentrunservicestreamagentrun) | **GET** /v1/agent-runs/{runId}/events:stream | Streams an agent run\&#39;s events as they happen.|

# **agentRunServiceCancelAgentRun**
> CancelAgentRunResponse agentRunServiceCancelAgentRun(cancelAgentRunBody)

Transitions the run to \"cancelled\" and records the reason (default \"cancelled by user\"). Only pending/running runs transition; a run that already finished is returned unchanged, so the call is safe to retry.

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

Returns the run with its status, trigger, timing, LLM token/cost counters, error summary, the branch it produced (if any), and the structured result when the run reported one.

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

Returns the run\'s timestamped events (level, kind, message, structured data) with page_size/page_token pagination — the polling alternative to StreamAgentRun.

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

Returns the config\'s runs, newest first, with page_size/page_token pagination.

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

Enqueues a new run (status \"pending\") and notifies the agent worker to pick it up; the call returns without waiting for execution. Fails when the config is disabled. inputs_override_json overrides the config\'s inputs_json for this run only, without persisting it. Follow progress via GetAgentRun or ListAgentRunEvents.

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

Server-streams AgentRunEvent messages for the run, resuming after after_event_id when set (empty streams from the beginning). Over REST the gateway delivers the stream as chunked newline-delimited JSON.

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

