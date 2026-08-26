# RecordSessionRiskAcceptancesResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**acceptancesRecorded** | **number** |  | [optional] [default to undefined]
**deferredRequirements** | **number** |  | [optional] [default to undefined]
**replacedRows** | **number** | Rows this call superseded — this session\&#39;s equivalent records from an earlier close attempt, replaced rather than stacked. | [optional] [default to undefined]

## Example

```typescript
import { RecordSessionRiskAcceptancesResponse } from '@tiden/api-client';

const instance: RecordSessionRiskAcceptancesResponse = {
    acceptancesRecorded,
    deferredRequirements,
    replacedRows,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
