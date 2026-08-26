# RetrievedRequirementIds

RetrievedRequirementIds wraps a retrieved_ids patch so \"field present with an empty list\" (explicitly clear) is distinguishable from \"field absent\" (leave the stored list alone) — a bare repeated field can\'t carry that distinction in proto3.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**requirementIds** | **Array&lt;string&gt;** |  | [optional] [default to undefined]

## Example

```typescript
import { RetrievedRequirementIds } from '@tiden/api-client';

const instance: RetrievedRequirementIds = {
    requirementIds,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
