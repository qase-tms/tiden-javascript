# IntentSessionSettlement

IntentSessionSettlement is the session\'s machine-readable distillation fact: either items or nothing_to_distill, never both.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**items** | [**Array&lt;IntentSessionSettlementItem&gt;**](IntentSessionSettlementItem.md) |  | [optional] [default to undefined]
**nothingToDistill** | [**IntentSessionNothingToDistill**](IntentSessionNothingToDistill.md) |  | [optional] [default to undefined]
**settledAt** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { IntentSessionSettlement } from '@tiden/api-client';

const instance: IntentSessionSettlement = {
    items,
    nothingToDistill,
    settledAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
