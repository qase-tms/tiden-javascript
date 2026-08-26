# IntentSessionSettlementItem

IntentSessionSettlementItem is one distillation decision the session applied: an existing requirement it updated, or a new one it created.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**itemId** | **string** |  | [optional] [default to undefined]
**action** | **string** |  | [optional] [default to undefined]
**targetId** | **string** |  | [optional] [default to undefined]
**requirementId** | **string** |  | [optional] [default to undefined]
**baseContentSha256** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { IntentSessionSettlementItem } from '@tiden/api-client';

const instance: IntentSessionSettlementItem = {
    itemId,
    action,
    targetId,
    requirementId,
    baseContentSha256,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
