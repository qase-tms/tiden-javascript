# FeatureContext

FeatureContext is a feature-rooted slice of the requirement graph for the objective: the root (why), the relevant touched nodes (not the whole subtree), the branch-effective coverage of that slice, and the retrieval signals (via) that surfaced the seeds.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**root** | [**RequirementRef**](RequirementRef.md) |  | [optional] [default to undefined]
**touchedNodes** | [**Array&lt;TouchedNode&gt;**](TouchedNode.md) |  | [optional] [default to undefined]
**coverage** | [**Coverage**](Coverage.md) |  | [optional] [default to undefined]
**via** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**tier** | [**RequirementTier**](RequirementTier.md) |  | [optional] [default to undefined]

## Example

```typescript
import { FeatureContext } from '@tiden/api-client';

const instance: FeatureContext = {
    root,
    touchedNodes,
    coverage,
    via,
    tier,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
