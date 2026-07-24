# TouchedNode

TouchedNode is one node of a feature\'s relevance slice (a seed, an ancestor on the seed->root path, or a co_anchored neighbor). resources are its branch-effective repo_file anchor paths.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**seqNum** | **number** |  | [optional] [default to undefined]
**title** | **string** |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**resources** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**repository** | **string** | repository is the canonical repo id of this node\&#39;s component (shift-left v3), or \&quot;\&quot; when unscoped. Lets the CLI verdict compare changed files vs resources per-repo (avoids cross-repo path collisions). resources are repo-relative. | [optional] [default to undefined]

## Example

```typescript
import { TouchedNode } from '@tiden/api-client';

const instance: TouchedNode = {
    id,
    seqNum,
    title,
    description,
    resources,
    repository,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
