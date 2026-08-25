# IssueServiceApi

All URIs are relative to *https://api.tiden.ai*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**issueServiceBulkUpdateIssueStatus**](#issueservicebulkupdateissuestatus) | **POST** /v1/products/{productId}/issues:bulkSetStatus | Sets the same status on many issues at once. Every id must belong to the given product.|
|[**issueServiceConfirmSourceMapUpload**](#issueserviceconfirmsourcemapupload) | **POST** /v1/sourcemaps/{id}:confirm | Finalizes a source-map upload (phase 2 of 2).|
|[**issueServiceCreateSourceMapUpload**](#issueservicecreatesourcemapupload) | **POST** /v1/products/{productId}/sourcemaps | Starts a source-map upload (phase 1 of 2).|
|[**issueServiceGetIssue**](#issueservicegetissue) | **GET** /v1/issues/{id} | Gets one issue together with its most recent occurrence.|
|[**issueServiceGetIssueEvent**](#issueservicegetissueevent) | **GET** /v1/issues/{id}/events/{eventId} | Gets one occurrence of an issue with symbolicated stack frames.|
|[**issueServiceGetIssueEventStats**](#issueservicegetissueeventstats) | **GET** /v1/issues/{id}/stats | Returns occurrence statistics for one issue: counts bucketed over time plus a per-environment split.|
|[**issueServiceListIssueEvents**](#issueservicelistissueevents) | **GET** /v1/issues/{id}/events | Lists an issue\&#39;s individual occurrences, most recent first.|
|[**issueServiceListIssues**](#issueservicelistissues) | **GET** /v1/products/{productId}/issues | Lists a product\&#39;s issues, most recently active first.|
|[**issueServiceListReleaseIssues**](#issueservicelistreleaseissues) | **GET** /v1/releases/{releaseId}/issues | Returns the issues attributable to a release: those first seen in it, plus a count of every issue seen during it. The post-deploy regression check.|
|[**issueServiceUpdateIssueStatus**](#issueserviceupdateissuestatus) | **POST** /v1/issues/{id}:setStatus | Sets one issue\&#39;s status to unresolved, resolved, or ignored.|

# **issueServiceBulkUpdateIssueStatus**
> BulkUpdateIssueStatusResponse issueServiceBulkUpdateIssueStatus(bulkUpdateIssueStatusBody)


### Example

```typescript
import {
    IssueServiceApi,
    Configuration,
    BulkUpdateIssueStatusBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new IssueServiceApi(configuration);

let productId: string; // (default to undefined)
let bulkUpdateIssueStatusBody: BulkUpdateIssueStatusBody; //

const { status, data } = await apiInstance.issueServiceBulkUpdateIssueStatus(
    productId,
    bulkUpdateIssueStatusBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **bulkUpdateIssueStatusBody** | **BulkUpdateIssueStatusBody**|  | |
| **productId** | [**string**] |  | defaults to undefined|


### Return type

**BulkUpdateIssueStatusResponse**

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

# **issueServiceConfirmSourceMapUpload**
> ConfirmSourceMapUploadResponse issueServiceConfirmSourceMapUpload(body)

Validates the staged object and atomically promotes it to live, so error events carrying the same debug_id resolve to original sources. Returns metadata only — never a download URL (source maps stay private).

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

# **issueServiceGetIssue**
> GetIssueResponse issueServiceGetIssue()

The occurrence carries server-resolved (symbolicated) stack frames with the surrounding source lines, which is what identifies the code to fix.

### Example

```typescript
import {
    IssueServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new IssueServiceApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.issueServiceGetIssue(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**GetIssueResponse**

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

# **issueServiceGetIssueEvent**
> GetIssueEventResponse issueServiceGetIssueEvent()

Use this when the occurrence that matters is not the most recent one — for example the production occurrence of an issue whose latest event came from staging.

### Example

```typescript
import {
    IssueServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new IssueServiceApi(configuration);

let id: string; //issue id (default to undefined)
let eventId: string; //issue_events.id (row id, not the SDK event_id) (default to undefined)

const { status, data } = await apiInstance.issueServiceGetIssueEvent(
    id,
    eventId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | issue id | defaults to undefined|
| **eventId** | [**string**] | issue_events.id (row id, not the SDK event_id) | defaults to undefined|


### Return type

**GetIssueEventResponse**

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

# **issueServiceGetIssueEventStats**
> GetIssueEventStatsResponse issueServiceGetIssueEventStats()

An issue carries no environment of its own — environment lives on each occurrence — so this is how you tell a production outage from dev noise.

### Example

```typescript
import {
    IssueServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new IssueServiceApi(configuration);

let id: string; //issue id (default to undefined)

const { status, data } = await apiInstance.issueServiceGetIssueEventStats(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | issue id | defaults to undefined|


### Return type

**GetIssueEventStatsResponse**

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

# **issueServiceListIssueEvents**
> ListIssueEventsResponse issueServiceListIssueEvents()

Stack frames are not resolved here — fetch a single occurrence for those.

### Example

```typescript
import {
    IssueServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new IssueServiceApi(configuration);

let id: string; //issue id (default to undefined)
let paginationPageSize: number; // (optional) (default to undefined)
let paginationPageToken: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.issueServiceListIssueEvents(
    id,
    paginationPageSize,
    paginationPageToken
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | issue id | defaults to undefined|
| **paginationPageSize** | [**number**] |  | (optional) defaults to undefined|
| **paginationPageToken** | [**string**] |  | (optional) defaults to undefined|


### Return type

**ListIssueEventsResponse**

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

# **issueServiceListIssues**
> ListIssuesResponse issueServiceListIssues()

An issue is a group of error events sharing a fingerprint. Filter by status, environment, release, component, platform, level, and a trailing last-seen window; sort by last_seen (default), first_seen, or times_seen. Results are paginated with an opaque keyset cursor carried in pagination.page_token.

### Example

```typescript
import {
    IssueServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new IssueServiceApi(configuration);

let productId: string; // (default to undefined)
let status: string; //unresolved|resolved|ignored, \"\" = all (optional) (default to undefined)
let environmentId: string; //optional filter (optional) (default to undefined)
let releaseId: string; //optional filter (optional) (default to undefined)
let sort: string; //last_seen|first_seen|times_seen (optional) (default to undefined)
let paginationPageSize: number; // (optional) (default to undefined)
let paginationPageToken: string; // (optional) (default to undefined)
let componentId: string; //optional: filter by attributed component (optional) (default to undefined)
let platforms: Array<string>; //optional: filter by platform (platform dropdown, OR within) (optional) (default to undefined)
let levels: Array<string>; //optional: filter by level (token bar, OR within) (optional) (default to undefined)
let period: string; //optional last-seen window: 3m|1h|12h|1d|7d|30d (\"\" = all time) (optional) (default to undefined)
let search: string; //optional: case-insensitive match on title/culprit (optional) (default to undefined)
let signal: string; //optional saved-view predicate: blocking|spiking|new|regressed (optional) (default to undefined)

const { status, data } = await apiInstance.issueServiceListIssues(
    productId,
    status,
    environmentId,
    releaseId,
    sort,
    paginationPageSize,
    paginationPageToken,
    componentId,
    platforms,
    levels,
    period,
    search,
    signal
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|
| **status** | [**string**] | unresolved|resolved|ignored, \&quot;\&quot; &#x3D; all | (optional) defaults to undefined|
| **environmentId** | [**string**] | optional filter | (optional) defaults to undefined|
| **releaseId** | [**string**] | optional filter | (optional) defaults to undefined|
| **sort** | [**string**] | last_seen|first_seen|times_seen | (optional) defaults to undefined|
| **paginationPageSize** | [**number**] |  | (optional) defaults to undefined|
| **paginationPageToken** | [**string**] |  | (optional) defaults to undefined|
| **componentId** | [**string**] | optional: filter by attributed component | (optional) defaults to undefined|
| **platforms** | **Array&lt;string&gt;** | optional: filter by platform (platform dropdown, OR within) | (optional) defaults to undefined|
| **levels** | **Array&lt;string&gt;** | optional: filter by level (token bar, OR within) | (optional) defaults to undefined|
| **period** | [**string**] | optional last-seen window: 3m|1h|12h|1d|7d|30d (\&quot;\&quot; &#x3D; all time) | (optional) defaults to undefined|
| **search** | [**string**] | optional: case-insensitive match on title/culprit | (optional) defaults to undefined|
| **signal** | [**string**] | optional saved-view predicate: blocking|spiking|new|regressed | (optional) defaults to undefined|


### Return type

**ListIssuesResponse**

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

# **issueServiceListReleaseIssues**
> ListReleaseIssuesResponse issueServiceListReleaseIssues()


### Example

```typescript
import {
    IssueServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new IssueServiceApi(configuration);

let releaseId: string; // (default to undefined)

const { status, data } = await apiInstance.issueServiceListReleaseIssues(
    releaseId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **releaseId** | [**string**] |  | defaults to undefined|


### Return type

**ListReleaseIssuesResponse**

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

# **issueServiceUpdateIssueStatus**
> UpdateIssueStatusResponse issueServiceUpdateIssueStatus(updateIssueStatusBody)

Every transition is recorded with its actor and is reversible. A resolved issue that recurs is reopened automatically and stamped as a regression.

### Example

```typescript
import {
    IssueServiceApi,
    Configuration,
    UpdateIssueStatusBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new IssueServiceApi(configuration);

let id: string; // (default to undefined)
let updateIssueStatusBody: UpdateIssueStatusBody; //

const { status, data } = await apiInstance.issueServiceUpdateIssueStatus(
    id,
    updateIssueStatusBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateIssueStatusBody** | **UpdateIssueStatusBody**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**UpdateIssueStatusResponse**

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

