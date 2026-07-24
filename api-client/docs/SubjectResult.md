# SubjectResult

SubjectResult is the per-subject breakdown of a verdict — the generalization of ComponentResult across subject types (component | feature | product). Features are first-class BLOCKING gate subjects; `subjects` supersedes the component-only `components` list (kept populated as a back-compat shim).

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**subjectType** | **string** |  | [optional] [default to undefined]
**subjectId** | **string** |  | [optional] [default to undefined]
**name** | **string** |  | [optional] [default to undefined]
**status** | [**VerdictStatus**](VerdictStatus.md) |  | [optional] [default to undefined]
**criteria** | [**Array&lt;CriterionResult&gt;**](CriterionResult.md) |  | [optional] [default to undefined]
**residualRisk** | **number** |  | [optional] [default to undefined]
**ceiling** | **number** |  | [optional] [default to undefined]
**riskSource** | **string** | Provenance (feature fan-in): risk_source names the component whose risk profile drove a feature\&#39;s risk fan-in; issue_sources names the components that contributed open issues. Empty for component/product subjects. | [optional] [default to undefined]
**issueSources** | **Array&lt;string&gt;** |  | [optional] [default to undefined]

## Example

```typescript
import { SubjectResult } from '@tiden/api-client';

const instance: SubjectResult = {
    subjectType,
    subjectId,
    name,
    status,
    criteria,
    residualRisk,
    ceiling,
    riskSource,
    issueSources,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
