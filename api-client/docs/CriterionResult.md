# CriterionResult

CriterionResult is one criterion\'s outcome within a subject\'s verdict breakdown.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**criterion** | **string** | \&quot;pass_rate\&quot; | \&quot;coverage\&quot; | \&quot;risk\&quot; | \&quot;freshness\&quot; | ... | [optional] [default to undefined]
**status** | [**CriterionStatus**](CriterionStatus.md) |  | [optional] [default to undefined]
**score** | **number** |  | [optional] [default to undefined]
**detail** | [**CriterionDetail**](CriterionDetail.md) |  | [optional] [default to undefined]
**soft** | **boolean** |  | [optional] [default to undefined]
**accepted** | **boolean** |  | [optional] [default to undefined]

## Example

```typescript
import { CriterionResult } from '@tiden/api-client';

const instance: CriterionResult = {
    criterion,
    status,
    score,
    detail,
    soft,
    accepted,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
