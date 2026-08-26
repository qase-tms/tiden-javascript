# GetIssueEventStatsResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**interval** | **string** |  | [optional] [default to undefined]
**buckets** | [**Array&lt;EventBucket&gt;**](EventBucket.md) |  | [optional] [default to undefined]
**last24h** | **number** |  | [optional] [default to undefined]
**environments** | [**Array&lt;IssueEnvironmentCount&gt;**](IssueEnvironmentCount.md) |  | [optional] [default to undefined]

## Example

```typescript
import { GetIssueEventStatsResponse } from '@tiden/api-client';

const instance: GetIssueEventStatsResponse = {
    interval,
    buckets,
    last24h,
    environments,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
