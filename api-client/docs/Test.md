# Test

Test (suite or case) — `kind` discriminates. Case-only fields are zero-valued for suites; clients should ignore them when kind == \"suite\".

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**productId** | **string** |  | [optional] [default to undefined]
**branchId** | **string** |  | [optional] [default to undefined]
**parentId** | **string** |  | [optional] [default to undefined]
**kind** | **string** |  | [optional] [default to undefined]
**title** | **string** |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**position** | **number** |  | [optional] [default to undefined]
**seqNum** | **number** | unset for suites | [optional] [default to undefined]
**status** | **string** |  | [optional] [default to undefined]
**priority** | **string** |  | [optional] [default to undefined]
**type** | **string** |  | [optional] [default to undefined]
**layer** | **string** |  | [optional] [default to undefined]
**muted** | **boolean** |  | [optional] [default to undefined]
**componentId** | **string** |  | [optional] [default to undefined]
**assigneeId** | **string** |  | [optional] [default to undefined]
**tags** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**customFields** | **object** |  | [optional] [default to undefined]
**steps** | [**Array&lt;TestStep&gt;**](TestStep.md) |  | [optional] [default to undefined]
**origin** | **string** | \&quot;manual\&quot; | \&quot;imported\&quot; | [optional] [default to undefined]
**framework** | **string** |  | [optional] [default to undefined]
**externalId** | **string** |  | [optional] [default to undefined]
**externalPath** | **string** |  | [optional] [default to undefined]
**filePath** | **string** |  | [optional] [default to undefined]
**lastSyncedAt** | **string** |  | [optional] [default to undefined]
**sourceId** | **string** |  | [optional] [default to undefined]
**branchStatus** | **string** |  | [optional] [default to undefined]
**childrenCount** | **number** | direct children, any kind | [optional] [default to undefined]
**directCaseCount** | **number** |  | [optional] [default to undefined]
**directSuiteCount** | **number** |  | [optional] [default to undefined]
**descendantCaseCount** | **number** |  | [optional] [default to undefined]
**linkedRequirementCount** | **number** |  | [optional] [default to undefined]
**createdBy** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]
**isAutomated** | **boolean** |  | [optional] [default to undefined]
**signature** | **string** |  | [optional] [default to undefined]
**testopsId** | **number** |  | [optional] [default to undefined]
**authorType** | **string** |  | [optional] [default to undefined]
**authorId** | **string** |  | [optional] [default to undefined]
**authorName** | **string** |  | [optional] [default to undefined]
**parameterGroups** | [**Array&lt;TestParameterGroup&gt;**](TestParameterGroup.md) |  | [optional] [default to undefined]
**latestExecution** | [**TestExecution**](TestExecution.md) |  | [optional] [default to undefined]
**attachments** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**relations** | [**Array&lt;TestRelation&gt;**](TestRelation.md) |  | [optional] [default to undefined]

## Example

```typescript
import { Test } from '@tiden/api-client';

const instance: Test = {
    id,
    productId,
    branchId,
    parentId,
    kind,
    title,
    description,
    position,
    seqNum,
    status,
    priority,
    type,
    layer,
    muted,
    componentId,
    assigneeId,
    tags,
    customFields,
    steps,
    origin,
    framework,
    externalId,
    externalPath,
    filePath,
    lastSyncedAt,
    sourceId,
    branchStatus,
    childrenCount,
    directCaseCount,
    directSuiteCount,
    descendantCaseCount,
    linkedRequirementCount,
    createdBy,
    createdAt,
    updatedAt,
    isAutomated,
    signature,
    testopsId,
    authorType,
    authorId,
    authorName,
    parameterGroups,
    latestExecution,
    attachments,
    relations,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
