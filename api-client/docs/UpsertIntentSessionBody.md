# UpsertIntentSessionBody


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**sessionId** | **string** |  | [optional] [default to undefined]
**objective** | **string** |  | [optional] [default to undefined]
**status** | **string** |  | [optional] [default to undefined]
**verdict** | **string** |  | [optional] [default to undefined]
**branchId** | **string** |  | [optional] [default to undefined]
**agent** | **string** |  | [optional] [default to undefined]
**executor** | **string** |  | [optional] [default to undefined]
**gitRepo** | **string** |  | [optional] [default to undefined]
**gitBranch** | **string** |  | [optional] [default to undefined]
**startHead** | **string** |  | [optional] [default to undefined]
**retrievedIds** | [**RetrievedRequirementIds**](RetrievedRequirementIds.md) |  | [optional] [default to undefined]
**radiusDrops** | [**Array&lt;RadiusDrop&gt;**](RadiusDrop.md) |  | [optional] [default to undefined]
**closedReason** | **string** | closed_reason is settable ONLY in a request that also sets (or the row already has) status &#x3D; closed — rejected otherwise. explicit | merged | never-materialized. | [optional] [default to undefined]
**scopeBand** | **string** |  | [optional] [default to undefined]
**progressSnapshot** | **object** | progress_snapshot / close_meta are opaque JSON passthrough (the caller\&#39;s own shape; this service does not interpret them) — same transport as the IntentSession message\&#39;s identically-named fields above. | [optional] [default to undefined]
**closeMeta** | **object** |  | [optional] [default to undefined]

## Example

```typescript
import { UpsertIntentSessionBody } from '@tiden/api-client';

const instance: UpsertIntentSessionBody = {
    sessionId,
    objective,
    status,
    verdict,
    branchId,
    agent,
    executor,
    gitRepo,
    gitBranch,
    startHead,
    retrievedIds,
    radiusDrops,
    closedReason,
    scopeBand,
    progressSnapshot,
    closeMeta,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
