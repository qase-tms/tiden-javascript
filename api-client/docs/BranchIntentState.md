# BranchIntentState

BranchIntentState summarizes a branch\'s shift-left intent-capture loop (agent_artifact provenance rows in requirement_sources) — whether a session ever started on this branch, whether capture is still open (no closed reconcile yet), and how many session-draft requirements the branch carries. Populated only by ListBranches with include_status=true.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**hasSession** | **boolean** |  | [optional] [default to undefined]
**captureOpen** | **boolean** |  | [optional] [default to undefined]
**draftCount** | **number** |  | [optional] [default to undefined]

## Example

```typescript
import { BranchIntentState } from '@tiden/api-client';

const instance: BranchIntentState = {
    hasSession,
    captureOpen,
    draftCount,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
