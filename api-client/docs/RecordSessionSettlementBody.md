# RecordSessionSettlementBody


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**items** | [**Array&lt;IntentSessionSettlementItem&gt;**](IntentSessionSettlementItem.md) | items and nothing_to_distill are mutually exclusive; items are merged by item_id onto the stored settlement, nothing_to_distill replaces it wholesale. See IntentSessionService.RecordSessionSettlement for the full semantics. | [optional] [default to undefined]
**nothingToDistill** | [**IntentSessionNothingToDistill**](IntentSessionNothingToDistill.md) |  | [optional] [default to undefined]

## Example

```typescript
import { RecordSessionSettlementBody } from '@tiden/api-client';

const instance: RecordSessionSettlementBody = {
    items,
    nothingToDistill,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
