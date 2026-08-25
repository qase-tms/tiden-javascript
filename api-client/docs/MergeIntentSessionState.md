# MergeIntentSessionState

MergeIntentSessionState is the merge-relevant slice of an intent session record attached to the branch being previewed/merged — see GetMergePreviewResponse.intent_session and MergeBranchRequest\'s allow_undistilled.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**sessionId** | **string** |  | [optional] [default to undefined]
**status** | **string** |  | [optional] [default to undefined]
**settled** | **boolean** | settled reports whether the session\&#39;s settlement has been recorded (settlement IS NOT NULL) — NOT whether the session is closed. A closed session with no settlement is exactly the state the merge guard refuses. | [optional] [default to undefined]

## Example

```typescript
import { MergeIntentSessionState } from '@tiden/api-client';

const instance: MergeIntentSessionState = {
    sessionId,
    status,
    settled,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
