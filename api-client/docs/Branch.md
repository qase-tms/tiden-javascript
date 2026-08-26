# Branch

Branch is a copy-on-write working line over a product\'s main data: requirement/test/component edits made on it shadow main until merged. status is \"open\" until the branch is merged (\"merged\").

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**productId** | **string** |  | [optional] [default to undefined]
**name** | **string** |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**createdBy** | **string** |  | [optional] [default to undefined]
**status** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]
**createdByAgentRunId** | **string** | Set when this branch was produced by an agent run; NULL for branches created by humans through the UI / CLI. | [optional] [default to undefined]
**stats** | [**BranchChangeStats**](BranchChangeStats.md) |  | [optional] [default to undefined]
**createdByAgent** | **string** | Coding agent that created this branch (validated server-side against a fixed allowlist at write time); empty for human-created branches or an unrecognized value. | [optional] [default to undefined]
**createdByName** | **string** | Display name/email of the user in created_by, resolved server-side by ListBranches/GetBranch in one batched lookup. Empty when created_by is unset or the user has since been deleted. | [optional] [default to undefined]
**createdByEmail** | **string** |  | [optional] [default to undefined]
**mergedAt** | **string** | Immutable merge-completion timestamp (column exists since migration 000076); unset for open branches and for branches merged before that column existed. Distinct from updated_at, which mutates on any later edit — this is the one trustworthy \&quot;when did this land\&quot; fact. | [optional] [default to undefined]
**loop** | [**BranchLoopStats**](BranchLoopStats.md) |  | [optional] [default to undefined]
**latestRun** | [**BranchLatestRun**](BranchLatestRun.md) |  | [optional] [default to undefined]
**codeLinks** | [**Array&lt;CodeLink&gt;**](CodeLink.md) |  | [optional] [default to undefined]
**intent** | [**BranchIntentState**](BranchIntentState.md) |  | [optional] [default to undefined]

## Example

```typescript
import { Branch } from '@tiden/api-client';

const instance: Branch = {
    id,
    productId,
    name,
    description,
    createdBy,
    status,
    createdAt,
    updatedAt,
    createdByAgentRunId,
    stats,
    createdByAgent,
    createdByName,
    createdByEmail,
    mergedAt,
    loop,
    latestRun,
    codeLinks,
    intent,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
