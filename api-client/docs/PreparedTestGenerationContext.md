# PreparedTestGenerationContext


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**productId** | **string** |  | [optional] [default to undefined]
**branch** | **string** |  | [optional] [default to undefined]
**framework** | **string** |  | [optional] [default to undefined]
**tokenBudget** | **number** |  | [optional] [default to undefined]
**contexts** | [**Array&lt;RequirementTestContext&gt;**](RequirementTestContext.md) |  | [optional] [default to undefined]
**codebaseContext** | [**CodebaseContext**](CodebaseContext.md) |  | [optional] [default to undefined]
**citations** | [**Array&lt;ContextCitation&gt;**](ContextCitation.md) |  | [optional] [default to undefined]
**truncationSignals** | **Array&lt;string&gt;** |  | [optional] [default to undefined]

## Example

```typescript
import { PreparedTestGenerationContext } from '@tiden/api-client';

const instance: PreparedTestGenerationContext = {
    productId,
    branch,
    framework,
    tokenBudget,
    contexts,
    codebaseContext,
    citations,
    truncationSignals,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
