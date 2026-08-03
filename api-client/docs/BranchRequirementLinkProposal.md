# BranchRequirementLinkProposal

BranchRequirementLinkProposal is one proposed test-requirement link recorded on a branch; accepted proposals materialize into durable links when the branch merges to main.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**branchId** | **string** |  | [optional] [default to undefined]
**testId** | **string** |  | [optional] [default to undefined]
**requirementId** | **string** |  | [optional] [default to undefined]
**status** | **string** |  | [optional] [default to undefined]
**createdBy** | **string** |  | [optional] [default to undefined]
**reviewedBy** | **string** |  | [optional] [default to undefined]
**reviewedAt** | **string** |  | [optional] [default to undefined]
**reviewNote** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { BranchRequirementLinkProposal } from '@tiden/api-client';

const instance: BranchRequirementLinkProposal = {
    id,
    branchId,
    testId,
    requirementId,
    status,
    createdBy,
    reviewedBy,
    reviewedAt,
    reviewNote,
    createdAt,
    updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
