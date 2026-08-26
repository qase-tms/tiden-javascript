# UpsertBranchCodeLinksBody


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**codeLinks** | [**Array&lt;CodeLink&gt;**](CodeLink.md) | id/branch_id/product_id/created_at/updated_at on each entry are ignored — the upsert identity is (branch_id from the path, kind, repository, ref). Capped at MaxBranchCodeLinksPerBatch entries per call. | [optional] [default to undefined]

## Example

```typescript
import { UpsertBranchCodeLinksBody } from '@tiden/api-client';

const instance: UpsertBranchCodeLinksBody = {
    codeLinks,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
