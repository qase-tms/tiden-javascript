# CoverageGap

CoverageGap is one under-covered requirement with its coverage counters, the reason for its status, and the signals that ranked it.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**requirement** | [**Requirement**](Requirement.md) |  | [optional] [default to undefined]
**coverageStatus** | **string** |  | [optional] [default to undefined]
**linkedTestCount** | **number** |  | [optional] [default to undefined]
**proposedTestCount** | **number** |  | [optional] [default to undefined]
**staleTestCount** | **number** |  | [optional] [default to undefined]
**coverageItemCount** | **number** |  | [optional] [default to undefined]
**lastTestUpdatedAt** | **string** |  | [optional] [default to undefined]
**coverageStatusReason** | **string** |  | [optional] [default to undefined]
**rankingSignals** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**riskAcceptedCount** | **number** | Prior intent sessions\&#39; JUDGEMENTS on this requirement\&#39;s missing verification: risk acceptances that priced it, and test deferrals that handed the missing test to a next session. Both are read from the close artifacts recorded on session drafts, matched by main twin. They are next- session input (\&quot;someone already looked at this\&quot;), not coverage — neither moves coverage_status.  Read them with these four properties in mind, because none of them are obvious from the names:   - They count ARTIFACT ROWS, not sessions. One session that accepts under     two criteria naming this requirement contributes 2, and two sessions     that each accept it once also contribute 2.   - Nothing marks a judgement resolved. A deferral of a requirement that     has since been covered still counts, and a risk acceptance survives the     condition it was signed against.   - A judgement from an intent branch that was ABANDONED and never merged     counts exactly like one that landed: the artifacts live on the session     draft, and an unmerged draft is still a requirement. \&quot;Someone already     priced this\&quot; can therefore refer to a decision that never shipped.   - 0 means nobody judged it — not that nobody could.  Deliberately NOT folded into proposed_test_count (field 4): that one is derived from branch test-link proposals and is not writable from a close. | [optional] [default to undefined]
**deferredTestCount** | **number** |  | [optional] [default to undefined]

## Example

```typescript
import { CoverageGap } from '@tiden/api-client';

const instance: CoverageGap = {
    requirement,
    coverageStatus,
    linkedTestCount,
    proposedTestCount,
    staleTestCount,
    coverageItemCount,
    lastTestUpdatedAt,
    coverageStatusReason,
    rankingSignals,
    riskAcceptedCount,
    deferredTestCount,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
