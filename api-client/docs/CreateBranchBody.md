# CreateBranchBody


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**createdByAgentRunId** | **string** | Set when an agent run is creating the branch on behalf of a user. Surfaced on the Branch message + UI banner. | [optional] [default to undefined]
**syncRepository** | **string** | Sync metadata (drift-sync v1): a sync/&lt;...&gt; branch records the git range its requirement delta covered — repository is the canonical repo id, base &#x3D; the repo watermark the delta was computed from, target &#x3D; repo main HEAD at sync time. On merge, the watermark advances base→target (CAS). Set all three or none; leave unset on every non-sync branch. | [optional] [default to undefined]
**syncBaseSha** | **string** |  | [optional] [default to undefined]
**syncTargetSha** | **string** |  | [optional] [default to undefined]
**createdByAgent** | **string** | Coding agent creating this branch on the caller\&#39;s behalf (e.g. \&quot;claude-code\&quot;, \&quot;codex\&quot;), so name + description + agent can be set in one explicit create. Validated server-side against a fixed allowlist; an unrecognized value is stored as empty string, never as free text. | [optional] [default to undefined]

## Example

```typescript
import { CreateBranchBody } from '@tiden/api-client';

const instance: CreateBranchBody = {
    name,
    description,
    createdByAgentRunId,
    syncRepository,
    syncBaseSha,
    syncTargetSha,
    createdByAgent,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
