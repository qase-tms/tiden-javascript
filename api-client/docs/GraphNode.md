# GraphNode


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**seqNum** | **number** |  | [optional] [default to undefined]
**title** | **string** |  | [optional] [default to undefined]
**status** | **string** |  | [optional] [default to undefined]
**coverageStatus** | **string** |  | [optional] [default to undefined]
**parentId** | **string** |  | [optional] [default to undefined]
**kind** | **string** | kind distinguishes node types in the graph (shift-left v3). \&quot;requirement\&quot; (default) or \&quot;component\&quot; — a component node reached via an impacts_component edge. Component nodes carry their name in &#x60;title&#x60;; seq_num/status/parent_id are empty. | [optional] [default to undefined]

## Example

```typescript
import { GraphNode } from '@tiden/api-client';

const instance: GraphNode = {
    id,
    seqNum,
    title,
    status,
    coverageStatus,
    parentId,
    kind,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
