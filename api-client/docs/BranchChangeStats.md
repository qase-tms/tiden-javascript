# BranchChangeStats

BranchChangeStats counts the per-branch changes relative to main (additions / modifications / deletions per entity kind). `conflicts` uses the same predicate as merge preview (main modified after the COW copy was taken).

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**requirementAdditions** | **number** |  | [optional] [default to undefined]
**requirementModifications** | **number** |  | [optional] [default to undefined]
**requirementDeletions** | **number** |  | [optional] [default to undefined]
**testAdditions** | **number** |  | [optional] [default to undefined]
**testModifications** | **number** |  | [optional] [default to undefined]
**testDeletions** | **number** |  | [optional] [default to undefined]
**componentAdditions** | **number** |  | [optional] [default to undefined]
**componentModifications** | **number** |  | [optional] [default to undefined]
**componentDeletions** | **number** |  | [optional] [default to undefined]
**conflicts** | **number** |  | [optional] [default to undefined]

## Example

```typescript
import { BranchChangeStats } from '@tiden/api-client';

const instance: BranchChangeStats = {
    requirementAdditions,
    requirementModifications,
    requirementDeletions,
    testAdditions,
    testModifications,
    testDeletions,
    componentAdditions,
    componentModifications,
    componentDeletions,
    conflicts,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
