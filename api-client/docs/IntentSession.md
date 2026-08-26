# IntentSession

IntentSession is the server-side record of a coding-agent intent session: the objective, its git/branch provenance, verdict, and the settlement decision recorded against it. RPCs live entirely in api.public.v1.IntentSessionService (the carve rule: messages stay here).

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**productId** | **string** |  | [optional] [default to undefined]
**branchId** | **string** |  | [optional] [default to undefined]
**objective** | **string** |  | [optional] [default to undefined]
**status** | **string** |  | [optional] [default to undefined]
**closedReason** | **string** |  | [optional] [default to undefined]
**scopeBand** | **string** |  | [optional] [default to undefined]
**agent** | **string** |  | [optional] [default to undefined]
**executor** | **string** |  | [optional] [default to undefined]
**gitRepo** | **string** |  | [optional] [default to undefined]
**gitBranch** | **string** |  | [optional] [default to undefined]
**startHead** | **string** |  | [optional] [default to undefined]
**retrievedIds** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**verdict** | **string** |  | [optional] [default to undefined]
**verdictAt** | **string** |  | [optional] [default to undefined]
**progressSnapshot** | **object** |  | [optional] [default to undefined]
**closeMeta** | **object** |  | [optional] [default to undefined]
**settlement** | [**IntentSessionSettlement**](IntentSessionSettlement.md) |  | [optional] [default to undefined]
**startedAt** | **string** |  | [optional] [default to undefined]
**lastActivityAt** | **string** |  | [optional] [default to undefined]
**effectiveStatus** | **string** | effective_status is computed at read time, never persisted and never written by a background job: equals status normally; \&quot;expired\&quot; when status&#x3D;provisional and now - last_activity_at exceeds the server\&#39;s provisional TTL; \&quot;stale\&quot; when status&#x3D;materialized and it exceeds the materialized TTL. A closed session is always exactly \&quot;closed\&quot;. The INTENT_UNDISTILLED merge guard deliberately does not consult this field. | [optional] [default to undefined]

## Example

```typescript
import { IntentSession } from '@tiden/api-client';

const instance: IntentSession = {
    id,
    productId,
    branchId,
    objective,
    status,
    closedReason,
    scopeBand,
    agent,
    executor,
    gitRepo,
    gitBranch,
    startHead,
    retrievedIds,
    verdict,
    verdictAt,
    progressSnapshot,
    closeMeta,
    settlement,
    startedAt,
    lastActivityAt,
    effectiveStatus,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
