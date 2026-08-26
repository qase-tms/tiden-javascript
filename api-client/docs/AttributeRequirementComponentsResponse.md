# AttributeRequirementComponentsResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**attributed** | [**Array&lt;AttributedRequirementComponent&gt;**](AttributedRequirementComponent.md) | Requirements newly attributed this run. Bounded (see maxReturnedAttributedRequirements in the service implementation) so a large product\&#39;s backfill can\&#39;t exceed the gRPC max message size; the DB write itself is unbounded — attributed_count is the true total. | [optional] [default to undefined]
**attributedCount** | **number** |  | [optional] [default to undefined]
**skippedMultiComponentCount** | **number** | Requirements whose repo_file anchors resolved to more than one distinct component — left untouched. | [optional] [default to undefined]
**skippedUnownedCount** | **number** | Requirements whose repo_file anchors resolved to no component at all (including a repository-ambiguous anchor path) — left untouched. | [optional] [default to undefined]
**consideredCount** | **number** | Requirements evaluated: main-branch, non-deleted, component_id NULL, with at least one repo_file anchor. | [optional] [default to undefined]

## Example

```typescript
import { AttributeRequirementComponentsResponse } from '@tiden/api-client';

const instance: AttributeRequirementComponentsResponse = {
    attributed,
    attributedCount,
    skippedMultiComponentCount,
    skippedUnownedCount,
    consideredCount,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
