# TestMergeModification

TestMergeModification mirrors MergeModification (requirements) but for tests. Used in MergePreview to surface conflicts from a tests-bearing branch.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**branchVersion** | [**Test**](Test.md) |  | [optional] [default to undefined]
**mainVersion** | [**Test**](Test.md) |  | [optional] [default to undefined]
**hasConflict** | **boolean** |  | [optional] [default to undefined]
**conflictingFields** | **Array&lt;string&gt;** |  | [optional] [default to undefined]

## Example

```typescript
import { TestMergeModification } from '@tiden/api-client';

const instance: TestMergeModification = {
    branchVersion,
    mainVersion,
    hasConflict,
    conflictingFields,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
