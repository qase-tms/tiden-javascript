# RunCaseSummary


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**identityKey** | **string** |  | [optional] [default to undefined]
**title** | **string** |  | [optional] [default to undefined]
**suitePath** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**testId** | **string** |  | [optional] [default to undefined]
**testSeqNum** | **number** |  | [optional] [default to undefined]
**status** | **string** |  | [optional] [default to undefined]
**durationMs** | **string** |  | [optional] [default to undefined]
**attempts** | **number** |  | [optional] [default to undefined]
**muted** | **boolean** |  | [optional] [default to undefined]
**combos** | [**Array&lt;RunParamCombo&gt;**](RunParamCombo.md) |  | [optional] [default to undefined]

## Example

```typescript
import { RunCaseSummary } from '@tiden/api-client';

const instance: RunCaseSummary = {
    identityKey,
    title,
    suitePath,
    testId,
    testSeqNum,
    status,
    durationMs,
    attempts,
    muted,
    combos,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
