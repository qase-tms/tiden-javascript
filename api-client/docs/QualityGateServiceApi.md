# QualityGateServiceApi

All URIs are relative to *https://api.tiden.ai*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**qualityGateServiceAcceptRisk**](#qualitygateserviceacceptrisk) | **POST** /v1/products/{productId}/quality-gate:accept-risk | Record a sign-off on a 🟡 (soft-signal) verdict so it becomes shippable. Hard-blocked (🔴) verdicts can\&#39;t be accepted. High-severity components need a distinct 2nd approver (ApproveRisk); low-severity self-approve.|
|[**qualityGateServiceApproveRisk**](#qualitygateserviceapproverisk) | **POST** /v1/products/{productId}/quality-gate:approve-risk | Second-approver sign-off for a pending acceptance (must differ from the recorder).|
|[**qualityGateServiceComputeVerdict**](#qualitygateservicecomputeverdict) | **POST** /v1/products/{productId}/quality-gate:compute | Compute (or recompute) the verdict for a release or branch scope and persist an immutable snapshot. Side-effecting; the engine is idempotent on the current data state (CAS on publish).|
|[**qualityGateServiceGetTraceability**](#qualitygateservicegettraceability) | **GET** /v1/products/{productId}/quality-gate/traceability | The traceability-matrix slice the verdict was computed over (req x case by component), for the matrix page and audit.|
|[**qualityGateServiceGetVerdict**](#qualitygateservicegetverdict) | **GET** /v1/products/{productId}/quality-gate | Latest non-invalidated verdict for a (scope, ref). On no-go the agent reads the structured component/criterion breakdown + fix hints from here.|

# **qualityGateServiceAcceptRisk**
> AcceptRiskResponse qualityGateServiceAcceptRisk(acceptRiskBody)


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

# **qualityGateServiceGetTraceability**
> GetTraceabilityResponse qualityGateServiceGetTraceability()


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

