# Branch


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**productId** | **string** |  | [optional] [default to undefined]
**name** | **string** |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**createdBy** | **string** |  | [optional] [default to undefined]
**status** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]
**createdByAgentRunId** | **string** | Set when this branch was produced by an agent run; NULL for branches created by humans through the UI / CLI. | [optional] [default to undefined]
**stats** | [**BranchChangeStats**](BranchChangeStats.md) |  | [optional] [default to undefined]

## Example

```typescript
import { Branch } from '@tiden/api-client';

const instance: Branch = {
    id,
    productId,
    name,
    description,
    createdBy,
    status,
    createdAt,
    updatedAt,
    createdByAgentRunId,
    stats,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
