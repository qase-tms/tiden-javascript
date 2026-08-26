# BranchLatestRun

BranchLatestRun is the most recent test_runs row attributed to a branch (by branch_id, or by intent_branch/branch_name when live-doc sync never resolved branch_id — see BranchLoopStats\' sibling doc on TestRunRepository.LatestAndCountByBranchForProduct), plus how many runs in total are attributed to it. Populated only by ListBranches with include_status=true.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**seqNum** | **number** |  | [optional] [default to undefined]
**status** | **string** |  | [optional] [default to undefined]
**startedAt** | **string** |  | [optional] [default to undefined]
**completedAt** | **string** |  | [optional] [default to undefined]
**total** | **number** |  | [optional] [default to undefined]
**passed** | **number** |  | [optional] [default to undefined]
**failed** | **number** |  | [optional] [default to undefined]

## Example

```typescript
import { BranchLatestRun } from '@tiden/api-client';

const instance: BranchLatestRun = {
    seqNum,
    status,
    startedAt,
    completedAt,
    total,
    passed,
    failed,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
