# ResultStep

ResultStep is one reported step of a result; steps nest recursively.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | **string** |  | [optional] [default to undefined]
**data** | [**ResultStepData**](ResultStepData.md) |  | [optional] [default to undefined]
**execution** | [**ResultStepExecution**](ResultStepExecution.md) |  | [optional] [default to undefined]
**code** | [**StepCode**](StepCode.md) |  | [optional] [default to undefined]
**steps** | [**Array&lt;ResultStep&gt;**](ResultStep.md) |  | [optional] [default to undefined]

## Example

```typescript
import { ResultStep } from '@tiden/api-client';

const instance: ResultStep = {
    type,
    data,
    execution,
    code,
    steps,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
