# CreateBranchBody


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**createdByAgentRunId** | **string** | Set by the agent worker when an agent run is creating the branch on behalf of a user. Surfaced on the Branch message + UI banner. | [optional] [default to undefined]

## Example

```typescript
import { CreateBranchBody } from '@tiden/api-client';

const instance: CreateBranchBody = {
    name,
    description,
    createdByAgentRunId,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
