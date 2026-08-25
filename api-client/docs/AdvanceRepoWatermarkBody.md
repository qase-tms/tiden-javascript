# AdvanceRepoWatermarkBody


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**repository** | **string** |  | [optional] [default to undefined]
**sha** | **string** | Full git commit sha to advance to. | [optional] [default to undefined]
**reason** | **string** | baseline (insert-only, first contact), empty_sync (CAS on expected_current_sha), or bootstrap (unconditional — explicit full re-generation). sync_merge and ingest are internal writers (the branch merge hook and the codebase agent) and are rejected here. | [optional] [default to undefined]
**expectedCurrentSha** | **string** | Required for empty_sync: the watermark value the caller\&#39;s detection saw. The advance is a compare-and-set on it — a lost ordering race returns advanced&#x3D;false instead of overwriting. | [optional] [default to undefined]

## Example

```typescript
import { AdvanceRepoWatermarkBody } from '@tiden/api-client';

const instance: AdvanceRepoWatermarkBody = {
    repository,
    sha,
    reason,
    expectedCurrentSha,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
