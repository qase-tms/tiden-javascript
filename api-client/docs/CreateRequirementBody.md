# CreateRequirementBody


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**parentId** | **string** |  | [optional] [default to undefined]
**componentId** | **string** |  | [optional] [default to undefined]
**title** | **string** |  | [optional] [default to undefined]
**content** | **string** |  | [optional] [default to undefined]
**status** | **string** |  | [optional] [default to undefined]
**priority** | **string** |  | [optional] [default to undefined]
**assigneeId** | **string** |  | [optional] [default to undefined]
**branch** | **string** |  | [optional] [default to undefined]
**type** | **string** |  | [optional] [default to undefined]
**sources** | [**Array&lt;RequirementSourceInput&gt;**](RequirementSourceInput.md) |  | [optional] [default to undefined]

## Example

```typescript
import { CreateRequirementBody } from '@tiden/api-client';

const instance: CreateRequirementBody = {
    parentId,
    componentId,
    title,
    content,
    status,
    priority,
    assigneeId,
    branch,
    type,
    sources,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
