# RequirementImpactResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**affectedRequirementIds** | **Array&lt;string&gt;** | affected is the full set of requirement IDs reachable from the file seeds. | [optional] [default to undefined]
**coveringTestIds** | **Array&lt;string&gt;** | covering_test_ids is the set of test IDs covering at least one affected requirement. | [optional] [default to undefined]
**uncoveredRequirementIds** | **Array&lt;string&gt;** | uncovered_requirement_ids is the subset of affected that have zero live test links. | [optional] [default to undefined]
**impacted** | [**Array&lt;ImpactedRequirement&gt;**](ImpactedRequirement.md) | impacted carries one entry per affected requirement with the provenance of how it was reached. Ordered: direct anchor hits (hops &#x3D; 0) first, then by ascending hops. Same set as affected_requirement_ids — a typed view of it. | [optional] [default to undefined]
**coverage** | [**ImpactCoverage**](ImpactCoverage.md) |  | [optional] [default to undefined]

## Example

```typescript
import { RequirementImpactResponse } from '@tiden/api-client';

const instance: RequirementImpactResponse = {
    affectedRequirementIds,
    coveringTestIds,
    uncoveredRequirementIds,
    impacted,
    coverage,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
