# RequirementTestContext


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**requirement** | [**Requirement**](Requirement.md) |  | [optional] [default to undefined]
**parent** | [**Requirement**](Requirement.md) |  | [optional] [default to undefined]
**children** | [**Array&lt;Requirement&gt;**](Requirement.md) |  | [optional] [default to undefined]
**siblings** | [**Array&lt;Requirement&gt;**](Requirement.md) |  | [optional] [default to undefined]
**component** | [**Component**](Component.md) |  | [optional] [default to undefined]
**linkedTests** | [**Array&lt;ContextTest&gt;**](ContextTest.md) |  | [optional] [default to undefined]
**proposedTests** | [**Array&lt;ContextTest&gt;**](ContextTest.md) |  | [optional] [default to undefined]
**relevantTests** | [**Array&lt;ContextTest&gt;**](ContextTest.md) |  | [optional] [default to undefined]
**staleSignals** | [**Array&lt;StaleCoverageSignal&gt;**](StaleCoverageSignal.md) |  | [optional] [default to undefined]
**extractedFields** | [**RequirementTestFields**](RequirementTestFields.md) |  | [optional] [default to undefined]
**memoryEntries** | [**Array&lt;AgentMemoryContext&gt;**](AgentMemoryContext.md) |  | [optional] [default to undefined]
**citations** | [**Array&lt;ContextCitation&gt;**](ContextCitation.md) |  | [optional] [default to undefined]
**sources** | [**Array&lt;RequirementSource&gt;**](RequirementSource.md) |  | [optional] [default to undefined]
**truncationSignals** | **Array&lt;string&gt;** |  | [optional] [default to undefined]

## Example

```typescript
import { RequirementTestContext } from '@tiden/api-client';

const instance: RequirementTestContext = {
    requirement,
    parent,
    children,
    siblings,
    component,
    linkedTests,
    proposedTests,
    relevantTests,
    staleSignals,
    extractedFields,
    memoryEntries,
    citations,
    sources,
    truncationSignals,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
