# ImpactedRequirement

ImpactedRequirement is one affected requirement plus how the traversal reached it. hops = 0 means a changed file is anchored directly to this requirement — those are the high-precision hits; everything above 0 is a graph inference and should be presented as possibly-related, not as scope.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**requirementId** | **string** |  | [optional] [default to undefined]
**hops** | **number** | hops is the shortest number of graph edges from any seed. 0 &#x3D; direct anchor. | [optional] [default to undefined]
**viaEdgeType** | **string** | via_edge_type is the edge type that first reached this requirement at &#x60;hops&#x60; (\&quot;parent\&quot;, \&quot;covers\&quot;, \&quot;co_anchored\&quot;, …). Empty when hops &#x3D; 0. | [optional] [default to undefined]
**viaConfidence** | **number** | via_confidence is that edge\&#39;s confidence, when the edge carries one. Derived co_anchored/covers confidence is 1/fan-out; parent edges have none. | [optional] [default to undefined]
**anchorPaths** | **Array&lt;string&gt;** | anchor_paths lists the requested repo paths anchored to this requirement. Populated only when hops &#x3D; 0. | [optional] [default to undefined]

## Example

```typescript
import { ImpactedRequirement } from '@tiden/api-client';

const instance: ImpactedRequirement = {
    requirementId,
    hops,
    viaEdgeType,
    viaConfidence,
    anchorPaths,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
