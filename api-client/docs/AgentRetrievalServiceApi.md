# AgentRetrievalServiceApi

All URIs are relative to *https://api.tiden.ai*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**agentRetrievalServiceAttributeChangedFiles**](#agentretrievalserviceattributechangedfiles) | **POST** /v1/products/{productId}/requirements/{requirementId}:attribute-changed-files | |
|[**agentRetrievalServiceDeclareRequirementEdgeIntent**](#agentretrievalservicedeclarerequirementedgeintent) | **POST** /v1/products/{productId}/requirement-edge-intents | |
|[**agentRetrievalServiceGetRequirementGraph**](#agentretrievalservicegetrequirementgraph) | **GET** /v1/products/{productId}/requirement-graph | |
|[**agentRetrievalServiceGetRequirementTestContext**](#agentretrievalservicegetrequirementtestcontext) | **GET** /v1/products/{productId}/requirements/{requirementId}/test-context | |
|[**agentRetrievalServiceGraphCoverageGaps**](#agentretrievalservicegraphcoveragegaps) | **GET** /v1/products/{productId}/requirements/graph-coverage-gaps | |
|[**agentRetrievalServiceListCoverageGaps**](#agentretrievalservicelistcoveragegaps) | **GET** /v1/products/{productId}/coverage-gaps | |
|[**agentRetrievalServiceListRequirementAnchors**](#agentretrievalservicelistrequirementanchors) | **GET** /v1/products/{productId}/requirement-anchors | |
|[**agentRetrievalServicePrepareTestGenerationContext**](#agentretrievalservicepreparetestgenerationcontext) | **POST** /v1/products/{productId}/test-generation-context:prepare | |
|[**agentRetrievalServiceRequirementImpact**](#agentretrievalservicerequirementimpact) | **GET** /v1/products/{productId}/requirements/impact | |
|[**agentRetrievalServiceRequirementNeighbors**](#agentretrievalservicerequirementneighbors) | **GET** /v1/products/{productId}/requirements/{requirementId}/neighbors | |
|[**agentRetrievalServiceResolveFeatureContext**](#agentretrievalserviceresolvefeaturecontext) | **GET** /v1/products/{productId}/feature-context | |
|[**agentRetrievalServiceWriteRequirementEdge**](#agentretrievalservicewriterequirementedge) | **POST** /v1/products/{productId}/requirement-edges | |

# **agentRetrievalServiceAttributeChangedFiles**
> AttributeChangedFilesResponse agentRetrievalServiceAttributeChangedFiles(attributeChangedFilesBody)


### Example

```typescript
import {
    AgentRetrievalServiceApi,
    Configuration,
    AttributeChangedFilesBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new AgentRetrievalServiceApi(configuration);

let productId: string; // (default to undefined)
let requirementId: string; // (default to undefined)
let attributeChangedFilesBody: AttributeChangedFilesBody; //

const { status, data } = await apiInstance.agentRetrievalServiceAttributeChangedFiles(
    productId,
    requirementId,
    attributeChangedFilesBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **attributeChangedFilesBody** | **AttributeChangedFilesBody**|  | |
| **productId** | [**string**] |  | defaults to undefined|
| **requirementId** | [**string**] |  | defaults to undefined|


### Return type

**AttributeChangedFilesResponse**

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

# **agentRetrievalServiceDeclareRequirementEdgeIntent**
> DeclareRequirementEdgeIntentResponse agentRetrievalServiceDeclareRequirementEdgeIntent(declareRequirementEdgeIntentBody)


### Example

```typescript
import {
    AgentRetrievalServiceApi,
    Configuration,
    DeclareRequirementEdgeIntentBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new AgentRetrievalServiceApi(configuration);

let productId: string; // (default to undefined)
let declareRequirementEdgeIntentBody: DeclareRequirementEdgeIntentBody; //

const { status, data } = await apiInstance.agentRetrievalServiceDeclareRequirementEdgeIntent(
    productId,
    declareRequirementEdgeIntentBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **declareRequirementEdgeIntentBody** | **DeclareRequirementEdgeIntentBody**|  | |
| **productId** | [**string**] |  | defaults to undefined|


### Return type

**DeclareRequirementEdgeIntentResponse**

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

# **agentRetrievalServiceGetRequirementGraph**
> GetRequirementGraphResponse agentRetrievalServiceGetRequirementGraph()


### Example

```typescript
import {
    AgentRetrievalServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new AgentRetrievalServiceApi(configuration);

let productId: string; // (default to undefined)

const { status, data } = await apiInstance.agentRetrievalServiceGetRequirementGraph(
    productId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|


### Return type

**GetRequirementGraphResponse**

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

# **agentRetrievalServiceGetRequirementTestContext**
> GetRequirementTestContextResponse agentRetrievalServiceGetRequirementTestContext()


### Example

```typescript
import {
    AgentRetrievalServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new AgentRetrievalServiceApi(configuration);

let productId: string; // (default to undefined)
let requirementId: string; // (default to undefined)
let branch: string; // (optional) (default to undefined)
let budget: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.agentRetrievalServiceGetRequirementTestContext(
    productId,
    requirementId,
    branch,
    budget
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|
| **requirementId** | [**string**] |  | defaults to undefined|
| **branch** | [**string**] |  | (optional) defaults to undefined|
| **budget** | [**number**] |  | (optional) defaults to undefined|


### Return type

**GetRequirementTestContextResponse**

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

# **agentRetrievalServiceGraphCoverageGaps**
> GraphCoverageGapsResponse agentRetrievalServiceGraphCoverageGaps()


### Example

```typescript
import {
    AgentRetrievalServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new AgentRetrievalServiceApi(configuration);

let productId: string; // (default to undefined)
let requirementIds: Array<string>; //requirement_ids is the set to check for coverage. Typically the result of RequirementImpact or RequirementNeighbors. (optional) (default to undefined)

const { status, data } = await apiInstance.agentRetrievalServiceGraphCoverageGaps(
    productId,
    requirementIds
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|
| **requirementIds** | **Array&lt;string&gt;** | requirement_ids is the set to check for coverage. Typically the result of RequirementImpact or RequirementNeighbors. | (optional) defaults to undefined|


### Return type

**GraphCoverageGapsResponse**

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

# **agentRetrievalServiceListCoverageGaps**
> ListCoverageGapsResponse agentRetrievalServiceListCoverageGaps()


### Example

```typescript
import {
    AgentRetrievalServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new AgentRetrievalServiceApi(configuration);

let productId: string; // (default to undefined)
let branch: string; // (optional) (default to undefined)
let coverageStatuses: Array<string>; // (optional) (default to undefined)
let componentId: string; // (optional) (default to undefined)
let query: string; // (optional) (default to undefined)
let paginationPageSize: number; // (optional) (default to undefined)
let paginationPageToken: string; // (optional) (default to undefined)
let rootRequirementId: string; //scope gaps to a feature subtree (root + descendants) (optional) (default to undefined)

const { status, data } = await apiInstance.agentRetrievalServiceListCoverageGaps(
    productId,
    branch,
    coverageStatuses,
    componentId,
    query,
    paginationPageSize,
    paginationPageToken,
    rootRequirementId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|
| **branch** | [**string**] |  | (optional) defaults to undefined|
| **coverageStatuses** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **componentId** | [**string**] |  | (optional) defaults to undefined|
| **query** | [**string**] |  | (optional) defaults to undefined|
| **paginationPageSize** | [**number**] |  | (optional) defaults to undefined|
| **paginationPageToken** | [**string**] |  | (optional) defaults to undefined|
| **rootRequirementId** | [**string**] | scope gaps to a feature subtree (root + descendants) | (optional) defaults to undefined|


### Return type

**ListCoverageGapsResponse**

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

# **agentRetrievalServiceListRequirementAnchors**
> ListRequirementAnchorsResponse agentRetrievalServiceListRequirementAnchors()


### Example

```typescript
import {
    AgentRetrievalServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new AgentRetrievalServiceApi(configuration);

let productId: string; // (default to undefined)
let branch: string; //empty = main (optional) (default to undefined)

const { status, data } = await apiInstance.agentRetrievalServiceListRequirementAnchors(
    productId,
    branch
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|
| **branch** | [**string**] | empty &#x3D; main | (optional) defaults to undefined|


### Return type

**ListRequirementAnchorsResponse**

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

# **agentRetrievalServicePrepareTestGenerationContext**
> PrepareTestGenerationContextResponse agentRetrievalServicePrepareTestGenerationContext(prepareTestGenerationContextBody)


### Example

```typescript
import {
    AgentRetrievalServiceApi,
    Configuration,
    PrepareTestGenerationContextBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new AgentRetrievalServiceApi(configuration);

let productId: string; // (default to undefined)
let prepareTestGenerationContextBody: PrepareTestGenerationContextBody; //

const { status, data } = await apiInstance.agentRetrievalServicePrepareTestGenerationContext(
    productId,
    prepareTestGenerationContextBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **prepareTestGenerationContextBody** | **PrepareTestGenerationContextBody**|  | |
| **productId** | [**string**] |  | defaults to undefined|


### Return type

**PrepareTestGenerationContextResponse**

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

# **agentRetrievalServiceRequirementImpact**
> RequirementImpactResponse agentRetrievalServiceRequirementImpact()


### Example

```typescript
import {
    AgentRetrievalServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new AgentRetrievalServiceApi(configuration);

let productId: string; // (default to undefined)
let repoPaths: Array<string>; //repo_paths is the set of changed file paths (e.g. from a merged PR). The backend resolves these to seeded requirement IDs via requirement_sources. (optional) (default to undefined)
let depth: number; //depth controls how many hops the graph traversal expands beyond the seeds. Defaults to 3 on the server if <= 0. (optional) (default to undefined)
let edgeTypes: Array<string>; //edge_types filters which edge types to traverse. Empty = all canonical types. (optional) (default to undefined)

const { status, data } = await apiInstance.agentRetrievalServiceRequirementImpact(
    productId,
    repoPaths,
    depth,
    edgeTypes
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|
| **repoPaths** | **Array&lt;string&gt;** | repo_paths is the set of changed file paths (e.g. from a merged PR). The backend resolves these to seeded requirement IDs via requirement_sources. | (optional) defaults to undefined|
| **depth** | [**number**] | depth controls how many hops the graph traversal expands beyond the seeds. Defaults to 3 on the server if &lt;&#x3D; 0. | (optional) defaults to undefined|
| **edgeTypes** | **Array&lt;string&gt;** | edge_types filters which edge types to traverse. Empty &#x3D; all canonical types. | (optional) defaults to undefined|


### Return type

**RequirementImpactResponse**

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

# **agentRetrievalServiceRequirementNeighbors**
> RequirementNeighborsResponse agentRetrievalServiceRequirementNeighbors()


### Example

```typescript
import {
    AgentRetrievalServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new AgentRetrievalServiceApi(configuration);

let productId: string; // (default to undefined)
let requirementId: string; // (default to undefined)
let depth: number; //depth controls how many hops to traverse (default 1 if <= 0). (optional) (default to undefined)
let edgeTypes: Array<string>; //edge_types filters which edge types to traverse. Empty = all canonical types. (optional) (default to undefined)

const { status, data } = await apiInstance.agentRetrievalServiceRequirementNeighbors(
    productId,
    requirementId,
    depth,
    edgeTypes
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|
| **requirementId** | [**string**] |  | defaults to undefined|
| **depth** | [**number**] | depth controls how many hops to traverse (default 1 if &lt;&#x3D; 0). | (optional) defaults to undefined|
| **edgeTypes** | **Array&lt;string&gt;** | edge_types filters which edge types to traverse. Empty &#x3D; all canonical types. | (optional) defaults to undefined|


### Return type

**RequirementNeighborsResponse**

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

# **agentRetrievalServiceResolveFeatureContext**
> ResolveFeatureContextResponse agentRetrievalServiceResolveFeatureContext()


### Example

```typescript
import {
    AgentRetrievalServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new AgentRetrievalServiceApi(configuration);

let productId: string; // (default to undefined)
let branch: string; //empty = main (optional) (default to undefined)
let text: string; //text is the free-text coding objective to resolve into feature context. (optional) (default to undefined)
let repoPaths: Array<string>; //repo_paths are optional changed file paths that seed anchor retrieval. (optional) (default to undefined)
let k: number; //k bounds each retrieval signal\'s breadth (server default when <= 0). (optional) (default to undefined)

const { status, data } = await apiInstance.agentRetrievalServiceResolveFeatureContext(
    productId,
    branch,
    text,
    repoPaths,
    k
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|
| **branch** | [**string**] | empty &#x3D; main | (optional) defaults to undefined|
| **text** | [**string**] | text is the free-text coding objective to resolve into feature context. | (optional) defaults to undefined|
| **repoPaths** | **Array&lt;string&gt;** | repo_paths are optional changed file paths that seed anchor retrieval. | (optional) defaults to undefined|
| **k** | [**number**] | k bounds each retrieval signal\&#39;s breadth (server default when &lt;&#x3D; 0). | (optional) defaults to undefined|


### Return type

**ResolveFeatureContextResponse**

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

# **agentRetrievalServiceWriteRequirementEdge**
> WriteRequirementEdgeResponse agentRetrievalServiceWriteRequirementEdge(writeRequirementEdgeBody)


### Example

```typescript
import {
    AgentRetrievalServiceApi,
    Configuration,
    WriteRequirementEdgeBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new AgentRetrievalServiceApi(configuration);

let productId: string; // (default to undefined)
let writeRequirementEdgeBody: WriteRequirementEdgeBody; //

const { status, data } = await apiInstance.agentRetrievalServiceWriteRequirementEdge(
    productId,
    writeRequirementEdgeBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **writeRequirementEdgeBody** | **WriteRequirementEdgeBody**|  | |
| **productId** | [**string**] |  | defaults to undefined|


### Return type

**WriteRequirementEdgeResponse**

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

