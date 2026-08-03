# WorkspaceServiceApi

All URIs are relative to *https://api.tiden.ai*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**workspaceServiceListWorkspaces**](#workspaceservicelistworkspaces) | **GET** /v1/workspaces | Lists the workspaces the caller belongs to.|

# **workspaceServiceListWorkspaces**
> ListWorkspacesResponse workspaceServiceListWorkspaces()

Returns each workspace with its slug and organization id, paginated via pagination.page_size/page_token. The CLI uses it to resolve which workspace an API token operates in.

### Example

```typescript
import {
    WorkspaceServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new WorkspaceServiceApi(configuration);

let paginationPageSize: number; // (optional) (default to undefined)
let paginationPageToken: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.workspaceServiceListWorkspaces(
    paginationPageSize,
    paginationPageToken
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **paginationPageSize** | [**number**] |  | (optional) defaults to undefined|
| **paginationPageToken** | [**string**] |  | (optional) defaults to undefined|


### Return type

**ListWorkspacesResponse**

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

