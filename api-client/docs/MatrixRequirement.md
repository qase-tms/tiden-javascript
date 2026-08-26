# MatrixRequirement


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**requirementId** | **string** |  | [optional] [default to undefined]
**display** | **string** |  | [optional] [default to undefined]
**coverage** | **string** |  | [optional] [default to undefined]
**cells** | [**Array&lt;MatrixCell&gt;**](MatrixCell.md) |  | [optional] [default to undefined]
**title** | **string** |  | [optional] [default to undefined]
**parentId** | **string** |  | [optional] [default to undefined]
**branchStatus** | **string** |  | [optional] [default to undefined]
**canonicalId** | **string** | Canonical (main) id of this row: source_id for a branch COW copy, empty otherwise. Branch scope keys rows by their branch-local id while parent_id and Verdict.subjects carry main ids, so a client needs this to rebuild the feature tree the way the server resolver does. | [optional] [default to undefined]

## Example

```typescript
import { MatrixRequirement } from '@tiden/api-client';

const instance: MatrixRequirement = {
    requirementId,
    display,
    coverage,
    cells,
    title,
    parentId,
    branchStatus,
    canonicalId,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
