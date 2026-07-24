# MatrixComponent


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**componentId** | **string** |  | [optional] [default to undefined]
**name** | **string** |  | [optional] [default to undefined]
**status** | [**VerdictStatus**](VerdictStatus.md) |  | [optional] [default to undefined]
**residualRisk** | **number** |  | [optional] [default to undefined]
**ceiling** | **number** |  | [optional] [default to undefined]
**requirements** | [**Array&lt;MatrixRequirement&gt;**](MatrixRequirement.md) |  | [optional] [default to undefined]
**repository** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { MatrixComponent } from '@tiden/api-client';

const instance: MatrixComponent = {
    componentId,
    name,
    status,
    residualRisk,
    ceiling,
    requirements,
    repository,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
