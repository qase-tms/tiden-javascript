# ImpactCoverage

ImpactCoverage distinguishes the three ways an impact answer can be empty or partial. Before this existed all three returned an identical empty response.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**requestedPaths** | **number** | requested_paths is how many repo paths the caller sent. | [optional] [default to undefined]
**matchedPaths** | **number** | matched_paths is how many of them are anchored to at least one requirement. 0 with product_has_anchors &#x3D; true means \&quot;we cannot tell\&quot;, not \&quot;nothing\&quot;. | [optional] [default to undefined]
**productHasAnchors** | **boolean** | product_has_anchors is false when the product has no repo_file anchors at all — an empty answer then says nothing about the change. | [optional] [default to undefined]
**unmatchedPaths** | **Array&lt;string&gt;** | unmatched_paths is the requested paths that matched no anchor (capped). | [optional] [default to undefined]
**blindDirectories** | **Array&lt;string&gt;** | blind_directories is the directories among unmatched_paths under which the product has no anchor at all — i.e. tiers we are structurally blind to. | [optional] [default to undefined]
**unverifiedRepositorySeeds** | **number** | unverified_repository_seeds counts seeds kept without a repository check because their requirement has no component. Only set when request.repository is non-empty; it should fall to 0 as components get assigned. | [optional] [default to undefined]

## Example

```typescript
import { ImpactCoverage } from '@tiden/api-client';

const instance: ImpactCoverage = {
    requestedPaths,
    matchedPaths,
    productHasAnchors,
    unmatchedPaths,
    blindDirectories,
    unverifiedRepositorySeeds,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
