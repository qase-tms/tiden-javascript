# DistillIntentResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**intentBranch** | **string** | Name of the intent branch the changes were written to (empty when skipped). | [optional] [default to undefined]
**created** | **number** |  | [optional] [default to undefined]
**updated** | **number** |  | [optional] [default to undefined]
**dropped** | **number** |  | [optional] [default to undefined]
**skipped** | **boolean** |  | [optional] [default to undefined]
**skipReason** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { DistillIntentResponse } from '@tiden/api-client';

const instance: DistillIntentResponse = {
    intentBranch,
    created,
    updated,
    dropped,
    skipped,
    skipReason,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
