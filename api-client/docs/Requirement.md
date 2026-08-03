# Requirement

Requirement is one node of a product\'s requirement tree: parent_id encodes the hierarchy, position orders siblings, and seq_num is the product-wide sequence used in {CODE}-{seq} references. content is markdown. sources are embedded only when requested (ListRequirements.include_sources); otherwise clients rely on source_count.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**productId** | **string** |  | [optional] [default to undefined]
**parentId** | **string** |  | [optional] [default to undefined]
**componentId** | **string** |  | [optional] [default to undefined]
**title** | **string** |  | [optional] [default to undefined]
**content** | **string** |  | [optional] [default to undefined]
**position** | **number** |  | [optional] [default to undefined]
**createdBy** | **string** |  | [optional] [default to undefined]
**childrenCount** | **number** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]
**seqNum** | **number** |  | [optional] [default to undefined]
**status** | **string** |  | [optional] [default to undefined]
**priority** | **string** |  | [optional] [default to undefined]
**assigneeId** | **string** |  | [optional] [default to undefined]
**branchId** | **string** |  | [optional] [default to undefined]
**sourceId** | **string** |  | [optional] [default to undefined]
**branchStatus** | **string** |  | [optional] [default to undefined]
**type** | **string** |  | [optional] [default to undefined]
**sourceCount** | **number** |  | [optional] [default to undefined]
**sources** | [**Array&lt;RequirementSource&gt;**](RequirementSource.md) |  | [optional] [default to undefined]

## Example

```typescript
import { Requirement } from '@tiden/api-client';

const instance: Requirement = {
    id,
    productId,
    parentId,
    componentId,
    title,
    content,
    position,
    createdBy,
    childrenCount,
    createdAt,
    updatedAt,
    seqNum,
    status,
    priority,
    assigneeId,
    branchId,
    sourceId,
    branchStatus,
    type,
    sourceCount,
    sources,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
