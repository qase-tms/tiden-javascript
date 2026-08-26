# RequirementServiceApi

All URIs are relative to *https://api.tiden.ai*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**requirementServiceAttributeRequirementComponents**](#requirementserviceattributerequirementcomponents) | **POST** /v1/products/{productId}/requirement-components:derive | Derives requirement-component attribution from each requirement\&#39;s own repo_file anchors.|
|[**requirementServiceCreateRequirement**](#requirementservicecreaterequirement) | **POST** /v1/products/{productId}/requirements | Creates a requirement.|
|[**requirementServiceDeleteRequirement**](#requirementservicedeleterequirement) | **DELETE** /v1/requirements/{id} | Deletes a requirement.|
|[**requirementServiceGetRequirement**](#requirementservicegetrequirement) | **GET** /v1/requirements/{id} | Fetches one requirement by id.|
|[**requirementServiceListRequirements**](#requirementservicelistrequirements) | **GET** /v1/products/{productId}/requirements | Lists a product\&#39;s requirements.|
|[**requirementServiceUpdateRequirement**](#requirementserviceupdaterequirement) | **PUT** /v1/requirements/{id} | Updates a requirement.|

# **requirementServiceAttributeRequirementComponents**
> AttributeRequirementComponentsResponse requirementServiceAttributeRequirementComponents()

Mirrors the test-side attributeTestComponents: a requirement whose anchors resolve to exactly one component gets that component_id set; anchors spanning more than one component, or owned by none (including a repository-ambiguous anchor path), leave the requirement untouched. Only NULL component_id rows are written — an explicit or previously-derived attribution is never overwritten. Idempotent.

### Example

```typescript
import {
    RequirementServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new RequirementServiceApi(configuration);

let productId: string; // (default to undefined)

const { status, data } = await apiInstance.requirementServiceAttributeRequirementComponents(
    productId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|


### Return type

**AttributeRequirementComponentsResponse**

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

# **requirementServiceCreateRequirement**
> CreateRequirementResponse requirementServiceCreateRequirement(createRequirementBody)

Creates the requirement under parent_id (empty = root) on branch (empty = main; a missing branch name is auto-created and edits stay copy-on-write until merge). Optional status/priority/type classify it; sources attach provenance (repo files, documentation URLs, manual input). Returns the requirement with its product-wide seq_num.

### Example

```typescript
import {
    RequirementServiceApi,
    Configuration,
    CreateRequirementBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new RequirementServiceApi(configuration);

let productId: string; // (default to undefined)
let createRequirementBody: CreateRequirementBody; //

const { status, data } = await apiInstance.requirementServiceCreateRequirement(
    productId,
    createRequirementBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createRequirementBody** | **CreateRequirementBody**|  | |
| **productId** | [**string**] |  | defaults to undefined|


### Return type

**CreateRequirementResponse**

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

# **requirementServiceDeleteRequirement**
> DeleteRequirementResponse requirementServiceDeleteRequirement()

On a branch (branch set, non-main) a main-row delete records a copy-on-write deletion marker that applies at merge; on main the row is deleted directly. Returns history_id, which the web-only RestoreRequirement RPC accepts to undo the delete.

### Example

```typescript
import {
    RequirementServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new RequirementServiceApi(configuration);

let id: string; // (default to undefined)
let branch: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.requirementServiceDeleteRequirement(
    id,
    branch
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|
| **branch** | [**string**] |  | (optional) defaults to undefined|


### Return type

**DeleteRequirementResponse**

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

# **requirementServiceGetRequirement**
> GetRequirementResponse requirementServiceGetRequirement()

Returns the requirement including its sources and branch status.

### Example

```typescript
import {
    RequirementServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new RequirementServiceApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.requirementServiceGetRequirement(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**GetRequirementResponse**

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

# **requirementServiceListRequirements**
> ListRequirementsResponse requirementServiceListRequirements()

Returns the flat requirement list (parent_id encodes the tree) in the branch view (empty = main), paginated. Set include_sources to embed each requirement\'s full provenance sources — agents need them for source-based identity matching; otherwise only source_count is populated.

### Example

```typescript
import {
    RequirementServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new RequirementServiceApi(configuration);

let productId: string; // (default to undefined)
let paginationPageSize: number; // (optional) (default to undefined)
let paginationPageToken: string; // (optional) (default to undefined)
let branch: string; // (optional) (default to undefined)
let includeSources: boolean; //When true, each returned requirement carries its full sources list (not just source_count). Agents need this for source-based identity matching (e.g. github_local_id / jira_issue anchors); the web UI leaves it off. (optional) (default to undefined)

const { status, data } = await apiInstance.requirementServiceListRequirements(
    productId,
    paginationPageSize,
    paginationPageToken,
    branch,
    includeSources
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|
| **paginationPageSize** | [**number**] |  | (optional) defaults to undefined|
| **paginationPageToken** | [**string**] |  | (optional) defaults to undefined|
| **branch** | [**string**] |  | (optional) defaults to undefined|
| **includeSources** | [**boolean**] | When true, each returned requirement carries its full sources list (not just source_count). Agents need this for source-based identity matching (e.g. github_local_id / jira_issue anchors); the web UI leaves it off. | (optional) defaults to undefined|


### Return type

**ListRequirementsResponse**

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

# **requirementServiceUpdateRequirement**
> UpdateRequirementResponse requirementServiceUpdateRequirement(updateRequirementBody)

Only fields present on the request change; omitted optional fields keep their stored value. branch (empty = main) applies the edit copy-on-write. sources_update replaces the requirement\'s source set, or unions it with anchor-key dedup when merge=true (the agent-write mode).

### Example

```typescript
import {
    RequirementServiceApi,
    Configuration,
    UpdateRequirementBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new RequirementServiceApi(configuration);

let id: string; // (default to undefined)
let updateRequirementBody: UpdateRequirementBody; //

const { status, data } = await apiInstance.requirementServiceUpdateRequirement(
    id,
    updateRequirementBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateRequirementBody** | **UpdateRequirementBody**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**UpdateRequirementResponse**

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

