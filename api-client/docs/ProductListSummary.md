# ProductListSummary

ProductListSummary is a per-product rollup for the products list page. Counts use main-branch, non-deleted semantics matching the product overview.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**requirementCount** | **number** |  | [optional] [default to undefined]
**testCaseCount** | **number** |  | [optional] [default to undefined]
**openBranchCount** | **number** |  | [optional] [default to undefined]
**activationState** | **string** |  | [optional] [default to undefined]
**lastActivityAt** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { ProductListSummary } from '@tiden/api-client';

const instance: ProductListSummary = {
    requirementCount,
    testCaseCount,
    openBranchCount,
    activationState,
    lastActivityAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
