# Verdict


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**productId** | **string** |  | [optional] [default to undefined]
**scope** | [**VerdictScope**](VerdictScope.md) |  | [optional] [default to undefined]
**releaseId** | **string** |  | [optional] [default to undefined]
**branchId** | **string** |  | [optional] [default to undefined]
**buildSha** | **string** |  | [optional] [default to undefined]
**commitSha** | **string** |  | [optional] [default to undefined]
**status** | [**VerdictStatus**](VerdictStatus.md) |  | [optional] [default to undefined]
**stateWatermark** | **string** |  | [optional] [default to undefined]
**computedAt** | **string** |  | [optional] [default to undefined]
**invalidatedAt** | **string** |  | [optional] [default to undefined]
**invalidatedReason** | **string** |  | [optional] [default to undefined]
**components** | [**Array&lt;ComponentResult&gt;**](ComponentResult.md) |  | [optional] [default to undefined]
**fixHints** | [**Array&lt;FixHint&gt;**](FixHint.md) |  | [optional] [default to undefined]
**acceptanceRequired** | **boolean** |  | [optional] [default to undefined]
**subjects** | [**Array&lt;SubjectResult&gt;**](SubjectResult.md) |  | [optional] [default to undefined]

## Example

```typescript
import { Verdict } from '@tiden/api-client';

const instance: Verdict = {
    id,
    productId,
    scope,
    releaseId,
    branchId,
    buildSha,
    commitSha,
    status,
    stateWatermark,
    computedAt,
    invalidatedAt,
    invalidatedReason,
    components,
    fixHints,
    acceptanceRequired,
    subjects,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
