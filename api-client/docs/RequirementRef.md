# RequirementRef

RequirementRef is a feature-root header: the requirement the seeds resolve up to, carrying its \"why\" (description).

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**seqNum** | **number** |  | [optional] [default to undefined]
**title** | **string** |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**tier** | [**RequirementTier**](RequirementTier.md) |  | [optional] [default to undefined]
**resources** | **Array&lt;string&gt;** | resources are the root\&#39;s branch-effective repo_file anchor paths, same meaning as TouchedNode.resources (a root can carry the session\&#39;s evidence). | [optional] [default to undefined]

## Example

```typescript
import { RequirementRef } from '@tiden/api-client';

const instance: RequirementRef = {
    id,
    seqNum,
    title,
    description,
    tier,
    resources,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
