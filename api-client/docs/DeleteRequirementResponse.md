# DeleteRequirementResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**historyId** | **string** | Id of the recorded deletion history event. Pass it to RestoreRequirement to undo the delete. Empty for deletes that record no undoable event. | [optional] [default to undefined]

## Example

```typescript
import { DeleteRequirementResponse } from '@tiden/api-client';

const instance: DeleteRequirementResponse = {
    historyId,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
