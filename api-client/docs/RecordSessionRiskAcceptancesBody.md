# RecordSessionRiskAcceptancesBody


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**requirementId** | **string** | requirement_id (v2, optional): the session\&#39;s draft requirement (branch-local on intent_branch) — the legacy write path, kept for older CLIs. ABSENT means the session record (intent_sessions) must already exist; acceptances/deferrals are then written to intent_session_judgements instead of onto a draft\&#39;s provenance. | [optional] [default to undefined]
**intentBranch** | **string** |  | [optional] [default to undefined]
**sessionId** | **string** |  | [optional] [default to undefined]
**acceptances** | [**Array&lt;SessionRiskAcceptance&gt;**](SessionRiskAcceptance.md) |  | [optional] [default to undefined]
**proposedTestRequirementRefs** | **Array&lt;string&gt;** | The deferral half of the ledger: requirements whose missing test is handed to a next session rather than risk-accepted. Same ref grammar as above; they collapse into one \&quot;test_deferral\&quot; record. | [optional] [default to undefined]

## Example

```typescript
import { RecordSessionRiskAcceptancesBody } from '@tiden/api-client';

const instance: RecordSessionRiskAcceptancesBody = {
    requirementId,
    intentBranch,
    sessionId,
    acceptances,
    proposedTestRequirementRefs,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
