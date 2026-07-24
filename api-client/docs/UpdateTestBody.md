# UpdateTestBody


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**branch** | **string** |  | [optional] [default to undefined]
**title** | **string** |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**parentId** | **string** |  | [optional] [default to undefined]
**position** | **number** |  | [optional] [default to undefined]
**status** | **string** |  | [optional] [default to undefined]
**priority** | **string** |  | [optional] [default to undefined]
**type** | **string** |  | [optional] [default to undefined]
**layer** | **string** |  | [optional] [default to undefined]
**muted** | **boolean** |  | [optional] [default to undefined]
**componentId** | **string** |  | [optional] [default to undefined]
**assigneeId** | **string** |  | [optional] [default to undefined]
**setTags** | **boolean** | Replacement semantics: if a field is set on the request, it replaces the entire stored value. Use empty list/struct to clear. | [optional] [default to undefined]
**tags** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**setCustomFields** | **boolean** |  | [optional] [default to undefined]
**customFields** | **object** |  | [optional] [default to undefined]
**setSteps** | **boolean** |  | [optional] [default to undefined]
**steps** | [**Array&lt;TestStep&gt;**](TestStep.md) |  | [optional] [default to undefined]
**isAutomated** | **boolean** |  | [optional] [default to undefined]
**signature** | **string** |  | [optional] [default to undefined]
**testopsId** | **number** |  | [optional] [default to undefined]
**clearTestopsId** | **boolean** |  | [optional] [default to undefined]
**authorType** | **string** |  | [optional] [default to undefined]
**authorId** | **string** |  | [optional] [default to undefined]
**authorName** | **string** |  | [optional] [default to undefined]
**setParameterGroups** | **boolean** |  | [optional] [default to undefined]
**parameterGroups** | [**Array&lt;TestParameterGroup&gt;**](TestParameterGroup.md) |  | [optional] [default to undefined]
**setLatestExecution** | **boolean** |  | [optional] [default to undefined]
**latestExecution** | [**TestExecution**](TestExecution.md) |  | [optional] [default to undefined]
**setAttachments** | **boolean** |  | [optional] [default to undefined]
**attachments** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**setRelations** | **boolean** |  | [optional] [default to undefined]
**relations** | [**Array&lt;TestRelation&gt;**](TestRelation.md) |  | [optional] [default to undefined]

## Example

```typescript
import { UpdateTestBody } from '@tiden/api-client';

const instance: UpdateTestBody = {
    branch,
    title,
    description,
    parentId,
    position,
    status,
    priority,
    type,
    layer,
    muted,
    componentId,
    assigneeId,
    setTags,
    tags,
    setCustomFields,
    customFields,
    setSteps,
    steps,
    isAutomated,
    signature,
    testopsId,
    clearTestopsId,
    authorType,
    authorId,
    authorName,
    setParameterGroups,
    parameterGroups,
    setLatestExecution,
    latestExecution,
    setAttachments,
    attachments,
    setRelations,
    relations,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
