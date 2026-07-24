# ComponentResult


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**componentId** | **string** |  | [optional] [default to undefined]
**name** | **string** |  | [optional] [default to undefined]
**status** | [**VerdictStatus**](VerdictStatus.md) |  | [optional] [default to undefined]
**residualRisk** | **number** |  | [optional] [default to undefined]
**ceiling** | **number** |  | [optional] [default to undefined]
**criteria** | [**Array&lt;CriterionResult&gt;**](CriterionResult.md) |  | [optional] [default to undefined]

## Example

```typescript
import { ComponentResult } from '@tiden/api-client';

const instance: ComponentResult = {
    componentId,
    name,
    status,
    residualRisk,
    ceiling,
    criteria,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
