# QualityGateServiceApi

All URIs are relative to *https://api.tiden.ai*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**qualityGateServiceAcceptRisk**](#qualitygateserviceacceptrisk) | **POST** /v1/products/{productId}/quality-gate:accept-risk | Signs off the residual risk on a soft-signal verdict.|
|[**qualityGateServiceApproveRisk**](#qualitygateserviceapproverisk) | **POST** /v1/products/{productId}/quality-gate:approve-risk | Second-approver sign-off for a pending risk acceptance.|
|[**qualityGateServiceComputeVerdict**](#qualitygateservicecomputeverdict) | **POST** /v1/products/{productId}/quality-gate:compute | Computes and persists a quality-gate verdict.|
|[**qualityGateServiceGetSessionProgress**](#qualitygateservicegetsessionprogress) | **POST** /v1/products/{productId}/quality-gate:session-progress | Returns one intent session\&#39;s per-requirement progress slice.|
|[**qualityGateServiceGetTraceability**](#qualitygateservicegettraceability) | **GET** /v1/products/{productId}/quality-gate/traceability | Returns the traceability matrix behind a verdict.|
|[**qualityGateServiceGetVerdict**](#qualitygateservicegetverdict) | **GET** /v1/products/{productId}/quality-gate | Fetches the latest verdict for a scope.|
|[**qualityGateServiceRecordSessionRiskAcceptances**](#qualitygateservicerecordsessionriskacceptances) | **POST** /v1/products/{productId}/quality-gate:session-acceptances | Records one intent session\&#39;s risk acceptances and test deferrals.|

# **qualityGateServiceAcceptRisk**
> AcceptRiskResponse qualityGateServiceAcceptRisk(acceptRiskBody)

Records a risk acceptance (reason required) for the whole verdict or one component, so a verdict failing only soft signals becomes shippable. Hard-blocked verdicts cannot be accepted. High-severity components need a distinct second approver via ApproveRisk; low-severity ones self-approve. Returns the recomputed verdict reflecting the acceptance.

### Example

```typescript
import {
    QualityGateServiceApi,
    Configuration,
    AcceptRiskBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new QualityGateServiceApi(configuration);

let productId: string; // (default to undefined)
let acceptRiskBody: AcceptRiskBody; //

const { status, data } = await apiInstance.qualityGateServiceAcceptRisk(
    productId,
    acceptRiskBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **acceptRiskBody** | **AcceptRiskBody**|  | |
| **productId** | [**string**] |  | defaults to undefined|


### Return type

**AcceptRiskResponse**

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

# **qualityGateServiceApproveRisk**
> ApproveRiskResponse qualityGateServiceApproveRisk(approveRiskBody)

Approves the acceptance identified by acceptance_id; the approver must be a different user than the one who recorded it. Returns the recomputed verdict.

### Example

```typescript
import {
    QualityGateServiceApi,
    Configuration,
    ApproveRiskBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new QualityGateServiceApi(configuration);

let productId: string; // (default to undefined)
let approveRiskBody: ApproveRiskBody; //

const { status, data } = await apiInstance.qualityGateServiceApproveRisk(
    productId,
    approveRiskBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **approveRiskBody** | **ApproveRiskBody**|  | |
| **productId** | [**string**] |  | defaults to undefined|


### Return type

**ApproveRiskResponse**

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

# **qualityGateServiceComputeVerdict**
> ComputeVerdictResponse qualityGateServiceComputeVerdict(computeVerdictBody)

Computes (or recomputes) the go/no-go verdict for a scope — RELEASE (release_id required), BRANCH (branch name required), or MAIN — and persists an immutable snapshot. Side-effecting, but idempotent on the current data state: recomputing unchanged data yields the same verdict. subject_type/subject_id narrow the returned breakdown to one component/feature/product subject.

### Example

```typescript
import {
    QualityGateServiceApi,
    Configuration,
    ComputeVerdictBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new QualityGateServiceApi(configuration);

let productId: string; // (default to undefined)
let computeVerdictBody: ComputeVerdictBody; //

const { status, data } = await apiInstance.qualityGateServiceComputeVerdict(
    productId,
    computeVerdictBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **computeVerdictBody** | **ComputeVerdictBody**|  | |
| **productId** | [**string**] |  | defaults to undefined|


### Return type

**ComputeVerdictResponse**

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

# **qualityGateServiceGetSessionProgress**
> GetSessionProgressResponse qualityGateServiceGetSessionProgress(getSessionProgressBody)

For the supplied requirement ids (the session\'s slice of interest) on the intent branch\'s merge-preview view, returns each requirement\'s coverage ladder step (no_test → not_run → failing → verified), its linked tests with per-test status and session attribution, a summary, an advisory `ready` flag, and deterministic next actions. Read-only; unknown requirement ids are silently omitted.

### Example

```typescript
import {
    QualityGateServiceApi,
    Configuration,
    GetSessionProgressBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new QualityGateServiceApi(configuration);

let productId: string; // (default to undefined)
let getSessionProgressBody: GetSessionProgressBody; //

const { status, data } = await apiInstance.qualityGateServiceGetSessionProgress(
    productId,
    getSessionProgressBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **getSessionProgressBody** | **GetSessionProgressBody**|  | |
| **productId** | [**string**] |  | defaults to undefined|


### Return type

**GetSessionProgressResponse**

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

# **qualityGateServiceGetTraceability**
> GetTraceabilityResponse qualityGateServiceGetTraceability()

Returns the requirement-by-test-case slice (grouped by component) the verdict was computed over, for the matrix page and audit. subject_type/subject_id filter the matrix to one component or feature.

### Example

```typescript
import {
    QualityGateServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new QualityGateServiceApi(configuration);

let productId: string; // (default to undefined)
let scope: 'VERDICT_SCOPE_UNSPECIFIED' | 'VERDICT_SCOPE_RELEASE' | 'VERDICT_SCOPE_BRANCH' | 'VERDICT_SCOPE_MAIN'; // - VERDICT_SCOPE_RELEASE: canonical, against main-live entities of a release build  - VERDICT_SCOPE_BRANCH: pre-merge preview, against the merge-preview projection  - VERDICT_SCOPE_MAIN: current main, not tied to a release (latest exec per test) (optional) (default to 'VERDICT_SCOPE_UNSPECIFIED')
let releaseId: string; // (optional) (default to undefined)
let branch: string; // (optional) (default to undefined)
let subjectType: string; //filter the matrix to one subject (\"component\"|\"feature\") (optional) (default to undefined)
let subjectId: string; //paired with subject_type (optional) (default to undefined)

const { status, data } = await apiInstance.qualityGateServiceGetTraceability(
    productId,
    scope,
    releaseId,
    branch,
    subjectType,
    subjectId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|
| **scope** | [**&#39;VERDICT_SCOPE_UNSPECIFIED&#39; | &#39;VERDICT_SCOPE_RELEASE&#39; | &#39;VERDICT_SCOPE_BRANCH&#39; | &#39;VERDICT_SCOPE_MAIN&#39;**]**Array<&#39;VERDICT_SCOPE_UNSPECIFIED&#39; &#124; &#39;VERDICT_SCOPE_RELEASE&#39; &#124; &#39;VERDICT_SCOPE_BRANCH&#39; &#124; &#39;VERDICT_SCOPE_MAIN&#39;>** |  - VERDICT_SCOPE_RELEASE: canonical, against main-live entities of a release build  - VERDICT_SCOPE_BRANCH: pre-merge preview, against the merge-preview projection  - VERDICT_SCOPE_MAIN: current main, not tied to a release (latest exec per test) | (optional) defaults to 'VERDICT_SCOPE_UNSPECIFIED'|
| **releaseId** | [**string**] |  | (optional) defaults to undefined|
| **branch** | [**string**] |  | (optional) defaults to undefined|
| **subjectType** | [**string**] | filter the matrix to one subject (\&quot;component\&quot;|\&quot;feature\&quot;) | (optional) defaults to undefined|
| **subjectId** | [**string**] | paired with subject_type | (optional) defaults to undefined|


### Return type

**GetTraceabilityResponse**

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

# **qualityGateServiceGetVerdict**
> GetVerdictResponse qualityGateServiceGetVerdict()

Returns the latest non-invalidated verdict for the (scope, ref). On a blocked verdict, clients read the structured per-subject criterion breakdown and agent-actionable fix hints from here.

### Example

```typescript
import {
    QualityGateServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new QualityGateServiceApi(configuration);

let productId: string; // (default to undefined)
let scope: 'VERDICT_SCOPE_UNSPECIFIED' | 'VERDICT_SCOPE_RELEASE' | 'VERDICT_SCOPE_BRANCH' | 'VERDICT_SCOPE_MAIN'; // - VERDICT_SCOPE_RELEASE: canonical, against main-live entities of a release build  - VERDICT_SCOPE_BRANCH: pre-merge preview, against the merge-preview projection  - VERDICT_SCOPE_MAIN: current main, not tied to a release (latest exec per test) (optional) (default to 'VERDICT_SCOPE_UNSPECIFIED')
let releaseId: string; // (optional) (default to undefined)
let branch: string; // (optional) (default to undefined)
let subjectType: string; //filter the result to one subject (\"component\"|\"feature\"|\"product\") (optional) (default to undefined)
let subjectId: string; //paired with subject_type (optional) (default to undefined)

const { status, data } = await apiInstance.qualityGateServiceGetVerdict(
    productId,
    scope,
    releaseId,
    branch,
    subjectType,
    subjectId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] |  | defaults to undefined|
| **scope** | [**&#39;VERDICT_SCOPE_UNSPECIFIED&#39; | &#39;VERDICT_SCOPE_RELEASE&#39; | &#39;VERDICT_SCOPE_BRANCH&#39; | &#39;VERDICT_SCOPE_MAIN&#39;**]**Array<&#39;VERDICT_SCOPE_UNSPECIFIED&#39; &#124; &#39;VERDICT_SCOPE_RELEASE&#39; &#124; &#39;VERDICT_SCOPE_BRANCH&#39; &#124; &#39;VERDICT_SCOPE_MAIN&#39;>** |  - VERDICT_SCOPE_RELEASE: canonical, against main-live entities of a release build  - VERDICT_SCOPE_BRANCH: pre-merge preview, against the merge-preview projection  - VERDICT_SCOPE_MAIN: current main, not tied to a release (latest exec per test) | (optional) defaults to 'VERDICT_SCOPE_UNSPECIFIED'|
| **releaseId** | [**string**] |  | (optional) defaults to undefined|
| **branch** | [**string**] |  | (optional) defaults to undefined|
| **subjectType** | [**string**] | filter the result to one subject (\&quot;component\&quot;|\&quot;feature\&quot;|\&quot;product\&quot;) | (optional) defaults to undefined|
| **subjectId** | [**string**] | paired with subject_type | (optional) defaults to undefined|


### Return type

**GetVerdictResponse**

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

# **qualityGateServiceRecordSessionRiskAcceptances**
> RecordSessionRiskAcceptancesResponse qualityGateServiceRecordSessionRiskAcceptances(recordSessionRiskAcceptancesBody)

Persists the close-policy ledger of a single intent session as agent_artifact provenance rows on that session\'s draft requirement. A re-run REPLACES this session\'s records for the same requirement set — keyed by (phase, session, requirement set), deliberately NOT by criterion, so a corrected criterion supersedes the earlier judgement instead of leaving two contradicting ones. Every other row on the draft is carried over.  ORDERING: this endpoint rewrites the draft\'s whole source array. A caller that also writes sources to the same draft (the CLI\'s close extends the session_reconcile row in its own PUT) MUST call this FIRST and then RE-FETCH the requirement before building that write — a request assembled from a snapshot taken before this call silently erases the rows this call wrote.  Validation is STRUCTURAL only: a known criterion, non-empty single-line evidence, a known follow-up kind, requirement refs that resolve on the intent branch, and a draft that lives there. The server never judges whether a reason is a good one — that judgment belongs to the agent\'s instructions and to the human reading merge-preview.

### Example

```typescript
import {
    QualityGateServiceApi,
    Configuration,
    RecordSessionRiskAcceptancesBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new QualityGateServiceApi(configuration);

let productId: string; // (default to undefined)
let recordSessionRiskAcceptancesBody: RecordSessionRiskAcceptancesBody; //

const { status, data } = await apiInstance.qualityGateServiceRecordSessionRiskAcceptances(
    productId,
    recordSessionRiskAcceptancesBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **recordSessionRiskAcceptancesBody** | **RecordSessionRiskAcceptancesBody**|  | |
| **productId** | [**string**] |  | defaults to undefined|


### Return type

**RecordSessionRiskAcceptancesResponse**

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

