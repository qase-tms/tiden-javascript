# DistillIntentBody

DistillIntentRequest carries one coding session — the rendered transcript plus session metadata — to reconcile into the product\'s requirement tree.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**transcript** | **string** | Rendered conversation (normalized, slim — user/assistant text only). The backend never sees an agent-specific transcript format. | [optional] [default to undefined]
**credentialId** | **string** | Optional LLM credential to use. When empty, the backend picks the first usable llm.* credential in the product\&#39;s workspace. | [optional] [default to undefined]
**model** | **string** | Optional model override; when empty, falls back to the credential\&#39;s metadata \&quot;model\&quot; field. | [optional] [default to undefined]
**slug** | **string** | Optional branch slug override; when empty, defaults to \&quot;session\&quot;. | [optional] [default to undefined]
**changedFiles** | **Array&lt;string&gt;** | Repo-relative paths of files changed in the coding session (from git post-commit hook). The backend validates LLM-emitted repo_file anchors against this allowlist, dropping any path not in the set. Empty &#x3D; no anchors written (backward-compatible: older CLI sends nothing). | [optional] [default to undefined]
**sessionId** | **string** | Coding-session identity. When either is set, every created/updated requirement gets a manual_input \&quot;Intent capture\&quot; provenance source carrying {sessionId, agent}, so a reviewer can trace it back to the session that produced it. Both empty (older CLI) writes no provenance source. | [optional] [default to undefined]
**agent** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { DistillIntentBody } from '@tiden/api-client';

const instance: DistillIntentBody = {
    transcript,
    credentialId,
    model,
    slug,
    changedFiles,
    sessionId,
    agent,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
