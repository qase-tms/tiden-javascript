# Issue


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**productId** | **string** |  | [optional] [default to undefined]
**title** | **string** |  | [optional] [default to undefined]
**culprit** | **string** |  | [optional] [default to undefined]
**level** | **string** |  | [optional] [default to undefined]
**platform** | **string** |  | [optional] [default to undefined]
**status** | **string** |  | [optional] [default to undefined]
**timesSeen** | **string** |  | [optional] [default to undefined]
**firstSeen** | **string** |  | [optional] [default to undefined]
**lastSeen** | **string** |  | [optional] [default to undefined]
**firstReleaseId** | **string** |  | [optional] [default to undefined]
**lastReleaseId** | **string** |  | [optional] [default to undefined]
**componentId** | **string** |  | [optional] [default to undefined]
**resolvedAt** | **string** | Most recent transition to resolved. KEPT through an automatic regression reopen (it is the \&quot;was resolved at\&quot; the UI renders); cleared on any MANUAL transition away from resolved. | [optional] [default to undefined]
**regressedAt** | **string** | Set when the grouping worker auto-reopens a resolved issue (regression); cleared on any manual status change. status is \&#39;unresolved\&#39; whenever set. | [optional] [default to undefined]

## Example

```typescript
import { Issue } from '@tiden/api-client';

const instance: Issue = {
    id,
    productId,
    title,
    culprit,
    level,
    platform,
    status,
    timesSeen,
    firstSeen,
    lastSeen,
    firstReleaseId,
    lastReleaseId,
    componentId,
    resolvedAt,
    regressedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
