# AgentRetrievalServiceApi

All URIs are relative to *https://api.tiden.ai*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**agentRetrievalServiceAdvanceRepoWatermark**](#agentretrievalserviceadvancerepowatermark) | **POST** /v1/products/{productId}/repo-watermark:advance | Advances the drift watermark of one repository.|
|[**agentRetrievalServiceAttributeChangedFiles**](#agentretrievalserviceattributechangedfiles) | **POST** /v1/products/{productId}/requirements/{requirementId}:attribute-changed-files | Attributes a requirement\&#39;s changed files to owning components.|
|[**agentRetrievalServiceDeclareRequirementEdgeIntent**](#agentretrievalservicedeclarerequirementedgeintent) | **POST** /v1/products/{productId}/requirement-edge-intents | Records a deferred graph edge for endpoints not yet on main.|
|[**agentRetrievalServiceGetIssueFixContext**](#agentretrievalservicegetissuefixcontext) | **GET** /v1/products/{productId}/issues/{issueId}/fix-context | Returns everything needed to fix one error, in a single call: the issue, its latest occurrence with symbolicated stack frames, the repository files those frames implicate, where the error is happening by environment, and — for each requirement those files implement — whether a test already covers it.|
|[**agentRetrievalServiceGetRepoWatermark**](#agentretrievalservicegetrepowatermark) | **GET** /v1/products/{productId}/repo-watermark | Returns the drift watermark of one repository.|
|[**agentRetrievalServiceGetRequirementGraph**](#agentretrievalservicegetrequirementgraph) | **GET** /v1/products/{productId}/requirement-graph | Returns the product\&#39;s full requirement graph.|
|[**agentRetrievalServiceGetRequirementTestContext**](#agentretrievalservicegetrequirementtestcontext) | **GET** /v1/products/{productId}/requirements/{requirementId}/test-context | Builds the full test-authoring context pack for one requirement.|
|[**agentRetrievalServiceGraphCoverageGaps**](#agentretrievalservicegraphcoveragegaps) | **GET** /v1/products/{productId}/requirements/graph-coverage-gaps | Filters a requirement set down to those without test coverage.|
|[**agentRetrievalServiceListCoverageGaps**](#agentretrievalservicelistcoveragegaps) | **GET** /v1/products/{productId}/coverage-gaps | Lists requirements with insufficient test coverage.|
|[**agentRetrievalServiceListRequirementAnchors**](#agentretrievalservicelistrequirementanchors) | **GET** /v1/products/{productId}/requirement-anchors | Lists the branch-effective code anchors of all requirements.|
|[**agentRetrievalServicePrepareTestGenerationContext**](#agentretrievalservicepreparetestgenerationcontext) | **POST** /v1/products/{productId}/test-generation-context:prepare | Prepares a batched test-generation context for several requirements.|
|[**agentRetrievalServiceRequirementImpact**](#agentretrievalservicerequirementimpact) | **GET** /v1/products/{productId}/requirements/impact | Computes the requirement blast radius of a set of changed files.|
|[**agentRetrievalServiceRequirementNeighbors**](#agentretrievalservicerequirementneighbors) | **GET** /v1/products/{productId}/requirements/{requirementId}/neighbors | Lists the graph neighbors of one requirement.|
|[**agentRetrievalServiceResolveFeatureContext**](#agentretrievalserviceresolvefeaturecontext) | **GET** /v1/products/{productId}/feature-context | Resolves a coding objective into feature-rooted requirement context.|
|[**agentRetrievalServiceWriteRequirementEdge**](#agentretrievalservicewriterequirementedge) | **POST** /v1/products/{productId}/requirement-edges | Writes one semantic edge into the requirement graph.|

# **agentRetrievalServiceAdvanceRepoWatermark**
> AdvanceRepoWatermarkResponse agentRetrievalServiceAdvanceRepoWatermark(advanceRepoWatermarkBody)

reason baseline inserts the first watermark and never overwrites; empty_sync is a compare-and-set on expected_current_sha (a delta run that found nothing requirement-worthy); bootstrap writes unconditionally (an explicit full re-generation). The sync_merge advance happens server-side when a sync branch merges, and ingest happens inside the codebase agent — both are rejected here. advanced=false means a lost ordering race, never an error: the watermark can under-advance and self-heal, but never move backwards.

### Example

```typescript
import {
    AgentRetrievalServiceApi,
    Configuration,
    AdvanceRepoWatermarkBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new AgentRetrievalServiceApi(configuration);

let productId: string; // (default to undefined)
let advanceRepoWatermarkBody: AdvanceRepoWatermarkBody; //

const { status, data } = await apiInstance.agentRetrievalServiceAdvanceRepoWatermark(
    productId,
    advanceRepoWatermarkBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **advanceRepoWatermarkBody** | **AdvanceRepoWatermarkBody**|  | |
| **productId** | [**string**] |  | defaults to undefined|


### Return type

**AdvanceRepoWatermarkResponse**

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

# **agentRetrievalServiceAttributeChangedFiles**
> AttributeChangedFilesResponse agentRetrievalServiceAttributeChangedFiles(attributeChangedFilesBody)

Maps repo-qualified changed files to components via the main-branch component scopes, declares one idempotent impacts_component edge intent per touched component, and sets requirement.component_id when the files resolve to exactly one component (clears it when they span several). All files must belong to a single repository; unmatched files are returned.

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

Stores an edge intent on the given branch (empty = main) instead of writing the edge immediately; the intent materializes into a real edge when the branch merges to main. Endpoint and edge_type rules match WriteRequirementEdge.

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

# **agentRetrievalServiceGetIssueFixContext**
> GetIssueFixContextResponse agentRetrievalServiceGetIssueFixContext()

Prefer this over stitching together GetIssue, GetIssueEventStats and requirement lookups: it is one round-trip, and it reports which file path matched which requirement so a wrong match is visible rather than silent.

### Example

```typescript
import {
    AgentRetrievalServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new AgentRetrievalServiceApi(configuration);

let productId: string; // (default to undefined)
let issueId: string; // (default to undefined)
let branch: string; //branch scopes the requirement lookup to a branch\'s effective view. \"\" = main. (optional) (default to undefined)
let maxFrames: number; //max_frames bounds how many stack frames come back. <= 0 uses the server default (10); the cap is 50. (optional) (default to undefined)

const { status, data } = await apiInstance.agentRetrievalServiceGetIssueFixContext(
    productId,
    issueId,
    branch,
    maxFrames
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|
| **issueId** | [**string**] |  | defaults to undefined|
| **branch** | [**string**] | branch scopes the requirement lookup to a branch\&#39;s effective view. \&quot;\&quot; &#x3D; main. | (optional) defaults to undefined|
| **maxFrames** | [**number**] | max_frames bounds how many stack frames come back. &lt;&#x3D; 0 uses the server default (10); the cap is 50. | (optional) defaults to undefined|


### Return type

**GetIssueFixContextResponse**

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

# **agentRetrievalServiceGetRepoWatermark**
> GetRepoWatermarkResponse agentRetrievalServiceGetRepoWatermark()

The watermark is the git commit the requirements tree on main reflects the repository up to (\"github.com/org/repo\" canonical id). `tiden intent start` compares it against the repo\'s actual main HEAD to detect drift — commits that reached the code outside the intent loop. An unset watermark means the repository was never reconciled; the client baselines it.

### Example

```typescript
import {
    AgentRetrievalServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new AgentRetrievalServiceApi(configuration);

let productId: string; // (default to undefined)
let repository: string; //Canonical repo id (\"github.com/org/repo\" — the components.repository format), never a local path and never a clone URL. (optional) (default to undefined)

const { status, data } = await apiInstance.agentRetrievalServiceGetRepoWatermark(
    productId,
    repository
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|
| **repository** | [**string**] | Canonical repo id (\&quot;github.com/org/repo\&quot; — the components.repository format), never a local path and never a clone URL. | (optional) defaults to undefined|


### Return type

**GetRepoWatermarkResponse**

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

# **agentRetrievalServiceGetRequirementGraph**
> GetRequirementGraphResponse agentRetrievalServiceGetRequirementGraph()

Returns every graph node (requirements plus component nodes reached via impacts_component edges, discriminated by kind) and every edge with its type, source kind, and confidence — for whole-product visualization or offline analysis.

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

Returns the requirement with its parent/children/siblings, component, linked/proposed/relevant tests, stale-coverage signals, extracted test-oriented fields (acceptance criteria, edge cases, ...), agent memory, and citations, resolved in the branch view (empty branch = main). budget caps the pack\'s approximate token size; truncation_signals reports what was cut to fit.

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
let budget: number; //budget bounds the pack\'s approximate token size: smaller budgets shrink per-list limits and trim long excerpts; <= 0 uses server defaults. (optional) (default to undefined)

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
| **budget** | [**number**] | budget bounds the pack\&#39;s approximate token size: smaller budgets shrink per-list limits and trim long excerpts; &lt;&#x3D; 0 uses server defaults. | (optional) defaults to undefined|


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

Returns the subset of the given requirement_ids that have zero live test links. Typically chained after RequirementImpact or RequirementNeighbors to find the uncovered part of a blast radius.

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

Returns the product\'s branch-effective coverage gaps, ranked for agent triage. Filter by coverage status (none | partial | covered | stale | unknown), component, free-text query, or a feature subtree via root_requirement_id. Paginated via pagination.page_size/page_token.

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

Returns every (requirement_id, repo_path) pair from repo_file source anchors as seen from branch (empty = main), so a client can map file paths to requirements without fetching full requirements.

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

Aggregates a GetRequirementTestContext pack per requirement_id plus codebase hints (framework, test command, style examples) under a shared token_budget. POST is used for the large request body only — the call computes a context and writes nothing.

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

Resolves repo_paths to seed requirements via their repo_file source anchors, then expands the requirement graph up to depth hops (default 3) over the given edge_types (empty = all canonical types). Returns the affected requirement ids, the tests covering any of them, and the affected requirements with no live test links.

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
let repository: string; //repository scopes repo_paths to one repository: the canonical repo id (e.g. \"github.com/acme/backend\") OR a local checkout alias resolved via component repository_aliases — same semantics as ChangedFile.repository.  Anchors carry only a repo-relative path, so identical paths in different repositories (\".github/workflows/ci.yml\", \"Makefile\", \"CLAUDE.md\") collide. When set, a seed is kept only if its requirement\'s component resolves to this repository; requirements with no component still seed (fail-open) and are counted in ImpactCoverage.unverified_repository_seeds.  Empty = no repository filtering (pre-existing behaviour). (optional) (default to undefined)
let minConfidence: number; //min_confidence bounds which edges the traversal may step onto: a NULL confidence always passes (parent edges carry none, so the requirement tree is never pruned), and a derived edge (co_anchored/covers, confidence = 1/fan-out) below the floor is not admitted. Default 0 = no floor, the pre-existing unbounded behaviour — every caller that omits this field sees byte-identical results to before it existed. A caller that wants to bound a hub-file\'s fan-out (e.g. the intent-loop close gate) sets it explicitly; impact-analysis callers that want the deliberately broad radius leave it at 0. (optional) (default to undefined)

const { status, data } = await apiInstance.agentRetrievalServiceRequirementImpact(
    productId,
    repoPaths,
    depth,
    edgeTypes,
    repository,
    minConfidence
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|
| **repoPaths** | **Array&lt;string&gt;** | repo_paths is the set of changed file paths (e.g. from a merged PR). The backend resolves these to seeded requirement IDs via requirement_sources. | (optional) defaults to undefined|
| **depth** | [**number**] | depth controls how many hops the graph traversal expands beyond the seeds. Defaults to 3 on the server if &lt;&#x3D; 0. | (optional) defaults to undefined|
| **edgeTypes** | **Array&lt;string&gt;** | edge_types filters which edge types to traverse. Empty &#x3D; all canonical types. | (optional) defaults to undefined|
| **repository** | [**string**] | repository scopes repo_paths to one repository: the canonical repo id (e.g. \&quot;github.com/acme/backend\&quot;) OR a local checkout alias resolved via component repository_aliases — same semantics as ChangedFile.repository.  Anchors carry only a repo-relative path, so identical paths in different repositories (\&quot;.github/workflows/ci.yml\&quot;, \&quot;Makefile\&quot;, \&quot;CLAUDE.md\&quot;) collide. When set, a seed is kept only if its requirement\&#39;s component resolves to this repository; requirements with no component still seed (fail-open) and are counted in ImpactCoverage.unverified_repository_seeds.  Empty &#x3D; no repository filtering (pre-existing behaviour). | (optional) defaults to undefined|
| **minConfidence** | [**number**] | min_confidence bounds which edges the traversal may step onto: a NULL confidence always passes (parent edges carry none, so the requirement tree is never pruned), and a derived edge (co_anchored/covers, confidence &#x3D; 1/fan-out) below the floor is not admitted. Default 0 &#x3D; no floor, the pre-existing unbounded behaviour — every caller that omits this field sees byte-identical results to before it existed. A caller that wants to bound a hub-file\&#39;s fan-out (e.g. the intent-loop close gate) sets it explicitly; impact-analysis callers that want the deliberately broad radius leave it at 0. | (optional) defaults to undefined|


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

Traverses the requirement graph from requirement_id up to depth hops (default 1) over the given edge_types (empty = all canonical types) and returns the reachable requirement ids.

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

Retrieves the requirement-graph slices relevant to the free-text objective (and optional changed repo_paths): per feature, the root requirement, the touched nodes with their code anchors, the branch-effective coverage of that slice, and the retrieval signals (vector | fts | anchor) that surfaced the seeds. k bounds each retrieval signal\'s breadth.

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

Creates a src->dst edge with exactly one destination endpoint: dst_requirement_id (edge_type depends_on | traces_to) or dst_component_id (edge_type impacts_component). confidence is required — an explicit 0.0 is valid, omitted is not. The edge is attributed to agent_run_id; the created edge id is returned.

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

