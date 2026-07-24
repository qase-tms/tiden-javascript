# MergeModification


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**branchVersion** | [**Requirement**](Requirement.md) |  | [optional] [default to undefined]
**mainVersion** | [**Requirement**](Requirement.md) |  | [optional] [default to undefined]
**hasConflict** | **boolean** |  | [optional] [default to undefined]
**conflictingFields** | **Array&lt;string&gt;** |  | [optional] [default to undefined]

## Example

```typescript
import { MergeModification } from '@tiden/api-client';

const instance: MergeModification = {
    branchVersion,
    mainVersion,
    hasConflict,
    conflictingFields,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
