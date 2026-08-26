# RepoWatermark

RepoWatermark: the requirements tree on Tiden main reflects the repository up to last_reconciled_sha. Absence (see GetRepoWatermarkResponse) means the product has never reconciled this repository — the client baselines it.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**repository** | **string** |  | [optional] [default to undefined]
**lastReconciledSha** | **string** | Full git commit sha. | [optional] [default to undefined]
**reason** | **string** | Last advance reason: baseline | sync_merge | empty_sync | bootstrap | ingest. | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { RepoWatermark } from '@tiden/api-client';

const instance: RepoWatermark = {
    repository,
    lastReconciledSha,
    reason,
    updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
