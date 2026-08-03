# StaleCoverageSignal

StaleCoverageSignal flags a linked test last updated before its requirement\'s last update — coverage that may no longer verify the requirement.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**requirementId** | **string** |  | [optional] [default to undefined]
**testId** | **string** |  | [optional] [default to undefined]
**requirementUpdatedAt** | **string** |  | [optional] [default to undefined]
**testUpdatedAt** | **string** |  | [optional] [default to undefined]
**reason** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { StaleCoverageSignal } from '@tiden/api-client';

const instance: StaleCoverageSignal = {
    requirementId,
    testId,
    requirementUpdatedAt,
    testUpdatedAt,
    reason,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
