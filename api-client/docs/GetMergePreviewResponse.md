# GetMergePreviewResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**additions** | [**Array&lt;Requirement&gt;**](Requirement.md) |  | [optional] [default to undefined]
**modifications** | [**Array&lt;MergeModification&gt;**](MergeModification.md) |  | [optional] [default to undefined]
**deletions** | [**Array&lt;Requirement&gt;**](Requirement.md) |  | [optional] [default to undefined]
**stats** | [**MergeStats**](MergeStats.md) |  | [optional] [default to undefined]
**testAdditions** | [**Array&lt;Test&gt;**](Test.md) | Test-side merge effects. Empty when the branch holds no test changes. | [optional] [default to undefined]
**testModifications** | [**Array&lt;TestMergeModification&gt;**](TestMergeModification.md) |  | [optional] [default to undefined]
**testDeletions** | [**Array&lt;Test&gt;**](Test.md) |  | [optional] [default to undefined]
**componentAdditions** | [**Array&lt;Component&gt;**](Component.md) | Component-side merge effects. Empty when the branch holds no component changes. | [optional] [default to undefined]
**componentModifications** | [**Array&lt;ComponentMergeModification&gt;**](ComponentMergeModification.md) |  | [optional] [default to undefined]
**componentDeletions** | [**Array&lt;Component&gt;**](Component.md) |  | [optional] [default to undefined]
**intentSession** | [**MergeIntentSessionState**](MergeIntentSessionState.md) |  | [optional] [default to undefined]

## Example

```typescript
import { GetMergePreviewResponse } from '@tiden/api-client';

const instance: GetMergePreviewResponse = {
    additions,
    modifications,
    deletions,
    stats,
    testAdditions,
    testModifications,
    testDeletions,
    componentAdditions,
    componentModifications,
    componentDeletions,
    intentSession,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
