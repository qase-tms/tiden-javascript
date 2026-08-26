# MergeBranchBody


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**resolutions** | **{ [key: string]: string; }** | Resolution map keys are prefixed: \&quot;req:&lt;uuid&gt;\&quot;, \&quot;test:&lt;uuid&gt;\&quot;, or \&quot;comp:&lt;uuid&gt;\&quot;. Server accepts un-prefixed keys as &#x60;req:&#x60; for v1 backwards compat (deprecated; use prefixed keys). | [optional] [default to undefined]
**allowUndistilled** | **boolean** | allow_undistilled overrides the INTENT_UNDISTILLED merge guard: a branch carrying an intent session that is not closed, has no recorded settlement, and has requirement changes normally refuses to merge. This is a recorded human decision — true merges anyway and stamps the override (session id, actor) onto the merge\&#39;s activity event. Branches with no intent session record are never blocked, so this is a no-op for them. | [optional] [default to undefined]

## Example

```typescript
import { MergeBranchBody } from '@tiden/api-client';

const instance: MergeBranchBody = {
    resolutions,
    allowUndistilled,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
