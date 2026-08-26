# IntentSessionServiceApi

All URIs are relative to *https://api.tiden.ai*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**intentSessionServiceGetIntentSession**](#intentsessionservicegetintentsession) | **GET** /v1/products/{productId}/intent-sessions/{sessionId} | Fetches one session by id.|
|[**intentSessionServiceListIntentSessions**](#intentsessionservicelistintentsessions) | **GET** /v1/products/{productId}/intent-sessions | Lists a product\&#39;s sessions, most recently active first.|
|[**intentSessionServiceRecordSessionSettlement**](#intentsessionservicerecordsessionsettlement) | **POST** /v1/products/{productId}/intent-sessions/{sessionId}:settle | Records or amends a session\&#39;s settlement decision.|
|[**intentSessionServiceUpsertIntentSession**](#intentsessionserviceupsertintentsession) | **POST** /v1/products/{productId}/intent-sessions | Creates or patches a session, keyed by the client-generated session id.|

# **intentSessionServiceGetIntentSession**
> GetIntentSessionResponse intentSessionServiceGetIntentSession()


### Example

```typescript
import {
    IntentSessionServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new IntentSessionServiceApi(configuration);

let productId: string; // (default to undefined)
let sessionId: string; // (default to undefined)

const { status, data } = await apiInstance.intentSessionServiceGetIntentSession(
    productId,
    sessionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|
| **sessionId** | [**string**] |  | defaults to undefined|


### Return type

**GetIntentSessionResponse**

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

# **intentSessionServiceListIntentSessions**
> ListIntentSessionsResponse intentSessionServiceListIntentSessions()

Filter by status, git_branch (resolving \"which session, if any, has this branch open\" for cross-machine continuation), or branch_id. Also serves as the capability probe for the whole RPC family: an older server 404s this collection route. effective_status (\"expired\" | \"stale\") filters by the derived-expiry predicate instead of the stored status column — see IntentSession.effective_status — and is rejected together with status.

### Example

```typescript
import {
    IntentSessionServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new IntentSessionServiceApi(configuration);

let productId: string; // (default to undefined)
let status: string; //optional filter — the stored column, verbatim (optional) (default to undefined)
let gitBranch: string; //optional filter — cross-machine \"find my open session\" (optional) (default to undefined)
let branchId: string; //optional filter (optional) (default to undefined)
let paginationPageSize: number; // (optional) (default to undefined)
let paginationPageToken: string; // (optional) (default to undefined)
let effectiveStatus: string; //effective_status is an optional filter selecting by the DERIVED status instead of the stored column: \"expired\" (provisional sessions idle past the provisional TTL) or \"stale\" (materialized sessions idle past the materialized TTL). Mutually exclusive with status. (optional) (default to undefined)

const { status, data } = await apiInstance.intentSessionServiceListIntentSessions(
    productId,
    status,
    gitBranch,
    branchId,
    paginationPageSize,
    paginationPageToken,
    effectiveStatus
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|
| **status** | [**string**] | optional filter — the stored column, verbatim | (optional) defaults to undefined|
| **gitBranch** | [**string**] | optional filter — cross-machine \&quot;find my open session\&quot; | (optional) defaults to undefined|
| **branchId** | [**string**] | optional filter | (optional) defaults to undefined|
| **paginationPageSize** | [**number**] |  | (optional) defaults to undefined|
| **paginationPageToken** | [**string**] |  | (optional) defaults to undefined|
| **effectiveStatus** | [**string**] | effective_status is an optional filter selecting by the DERIVED status instead of the stored column: \&quot;expired\&quot; (provisional sessions idle past the provisional TTL) or \&quot;stale\&quot; (materialized sessions idle past the materialized TTL). Mutually exclusive with status. | (optional) defaults to undefined|


### Return type

**ListIntentSessionsResponse**

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

# **intentSessionServiceRecordSessionSettlement**
> RecordSessionSettlementResponse intentSessionServiceRecordSessionSettlement(recordSessionSettlementBody)

items are merged onto the stored settlement by item_id: resending an item_id replaces its entry (the idempotent retry path after a partial failure), a new item_id appends. nothing_to_distill replaces wholesale and is mutually exclusive with items — sending one clears the other on the stored row; sending both in the same request is rejected. Validation here is structural only (enum membership, non-empty reason, id fields parsing as UUIDs) — the CLI enforces the semantic rules (e.g. judged_ids required when hops-0 is non-empty) since the server has no way to know hops-0.

### Example

```typescript
import {
    IntentSessionServiceApi,
    Configuration,
    RecordSessionSettlementBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new IntentSessionServiceApi(configuration);

let productId: string; // (default to undefined)
let sessionId: string; // (default to undefined)
let recordSessionSettlementBody: RecordSessionSettlementBody; //

const { status, data } = await apiInstance.intentSessionServiceRecordSessionSettlement(
    productId,
    sessionId,
    recordSessionSettlementBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **recordSessionSettlementBody** | **RecordSessionSettlementBody**|  | |
| **productId** | [**string**] |  | defaults to undefined|
| **sessionId** | [**string**] |  | defaults to undefined|


### Return type

**RecordSessionSettlementResponse**

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

# **intentSessionServiceUpsertIntentSession**
> UpsertIntentSessionResponse intentSessionServiceUpsertIntentSession(upsertIntentSessionBody)

Only fields set in the request overwrite; every other column on the existing row is left as-is. Creating a session (the first call for that id) requires objective. status is forward-only (provisional -> materialized -> closed); a closed session rejects any further upsert, including one that doesn\'t touch status. Every call refreshes last_activity_at. radius_drops, if present, are recorded as radius_drop judgements under their supersede key (session_id, phase, sorted requirement_ids).

### Example

```typescript
import {
    IntentSessionServiceApi,
    Configuration,
    UpsertIntentSessionBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new IntentSessionServiceApi(configuration);

let productId: string; // (default to undefined)
let upsertIntentSessionBody: UpsertIntentSessionBody; //

const { status, data } = await apiInstance.intentSessionServiceUpsertIntentSession(
    productId,
    upsertIntentSessionBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **upsertIntentSessionBody** | **UpsertIntentSessionBody**|  | |
| **productId** | [**string**] |  | defaults to undefined|


### Return type

**UpsertIntentSessionResponse**

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

