# ComponentMergeModification

ComponentMergeModification mirrors MergeModification (requirements) but for components. Used in MergePreview to surface conflicts from a components-bearing branch.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**branchVersion** | [**Component**](Component.md) |  | [optional] [default to undefined]
**mainVersion** | [**Component**](Component.md) |  | [optional] [default to undefined]
**hasConflict** | **boolean** |  | [optional] [default to undefined]
**conflictingFields** | **Array&lt;string&gt;** |  | [optional] [default to undefined]

## Example

```typescript
import { ComponentMergeModification } from '@tiden/api-client';

const instance: ComponentMergeModification = {
    branchVersion,
    mainVersion,
    hasConflict,
    conflictingFields,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
