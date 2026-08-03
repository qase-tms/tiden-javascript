# IngestTest

IngestTest is one reporter-observed test, identified by external_id within its suite_path (root to leaf).

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**externalId** | **string** |  | [optional] [default to undefined]
**suitePath** | [**Array&lt;IngestSuiteSegment&gt;**](IngestSuiteSegment.md) |  | [optional] [default to undefined]
**title** | **string** |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**layer** | **string** |  | [optional] [default to undefined]
**type** | **string** |  | [optional] [default to undefined]
**priority** | **string** |  | [optional] [default to undefined]
**muted** | **boolean** |  | [optional] [default to undefined]
**tags** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**steps** | [**Array&lt;TestStep&gt;**](TestStep.md) |  | [optional] [default to undefined]
**customFields** | **object** |  | [optional] [default to undefined]
**filePath** | **string** |  | [optional] [default to undefined]
**requirementSeqNums** | **Array&lt;number&gt;** |  | [optional] [default to undefined]
**signature** | **string** |  | [optional] [default to undefined]
**testopsId** | **number** |  | [optional] [default to undefined]
**parameters** | [**Array&lt;TestParameter&gt;**](TestParameter.md) |  | [optional] [default to undefined]
**execution** | [**TestExecution**](TestExecution.md) |  | [optional] [default to undefined]
**attachments** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**relations** | [**Array&lt;TestRelation&gt;**](TestRelation.md) |  | [optional] [default to undefined]
**isAutomated** | **boolean** |  | [optional] [default to undefined]

## Example

```typescript
import { IngestTest } from '@tiden/api-client';

const instance: IngestTest = {
    externalId,
    suitePath,
    title,
    description,
    layer,
    type,
    priority,
    muted,
    tags,
    steps,
    customFields,
    filePath,
    requirementSeqNums,
    signature,
    testopsId,
    parameters,
    execution,
    attachments,
    relations,
    isAutomated,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
