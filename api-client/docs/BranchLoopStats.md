# BranchLoopStats

BranchLoopStats summarizes a branch\'s self-closing loop from its quality-gate verdict history (same append-only quality_gate_verdicts stream as the analytics \"self-closing loop time\" story), but — unlike that story\'s ReworkLoops/AgentReworkLoops primitives — INCLUDES branches that never went green, so a branch table can show a stuck loop instead of silently omitting it. Populated only by ListBranches with include_status=true.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**verdictCycles** | **number** |  | [optional] [default to undefined]
**blockedBeforePass** | **number** |  | [optional] [default to undefined]
**wentGreen** | **boolean** |  | [optional] [default to undefined]
**runCount** | **number** |  | [optional] [default to undefined]
**loopCycles** | **number** | loop_cycles is the requirement-coverage-rung judgment-cycle count (branches.loop_cycle_count) — how many times a branch-scope compute\&#39;s per-requirement coverage rung actually moved, distinct from verdict_cycles above (a count of gate STATE CHANGES, which rises on its own once the gate goes per-stage). Absent when the branch was never counted (loop_cycle_progress_key IS NULL: pre-cutover, or no branch-scope verdict yet) — never the same as an explicit zero. | [optional] [default to undefined]

## Example

```typescript
import { BranchLoopStats } from '@tiden/api-client';

const instance: BranchLoopStats = {
    verdictCycles,
    blockedBeforePass,
    wentGreen,
    runCount,
    loopCycles,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
