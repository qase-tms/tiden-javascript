# UpdateBranchBody


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**description** | **string** | Both fields are optional with absent-means-unchanged semantics: an unset field leaves the branch\&#39;s current value alone; a present field (including an explicit empty string) overwrites it. There is no separate \&quot;clear\&quot; flag. | [optional] [default to undefined]
**createdByAgent** | **string** | Validated server-side against the same fixed allowlist as CreateBranchRequest.created_by_agent. | [optional] [default to undefined]

## Example

```typescript
import { UpdateBranchBody } from '@tiden/api-client';

const instance: UpdateBranchBody = {
    description,
    createdByAgent,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
