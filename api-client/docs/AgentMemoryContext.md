# AgentMemoryContext

AgentMemoryContext is one agent-memory entry surfaced into a context pack.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**key** | **string** |  | [optional] [default to undefined]
**kind** | **string** |  | [optional] [default to undefined]
**bodyMd** | **string** |  | [optional] [default to undefined]
**tags** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**citationId** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { AgentMemoryContext } from '@tiden/api-client';

const instance: AgentMemoryContext = {
    id,
    key,
    kind,
    bodyMd,
    tags,
    citationId,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
