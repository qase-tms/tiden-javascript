# DeriveTestLinksResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**autoLinked** | [**Array&lt;FileAnchorCandidate&gt;**](FileAnchorCandidate.md) | Exact-file matches auto-linked durably (Quality Gate recomputes). | [optional] [default to undefined]
**candidates** | [**Array&lt;FileAnchorCandidate&gt;**](FileAnchorCandidate.md) | Directory-proximity matches for an agent to confirm + LinkRequirement. | [optional] [default to undefined]
**multiRepoSkipped** | **boolean** | Set when the product spans &gt;1 repository: matching is skipped (tests carry no repo attribution, so a bare path match could cross-link across repos). | [optional] [default to undefined]

## Example

```typescript
import { DeriveTestLinksResponse } from '@tiden/api-client';

const instance: DeriveTestLinksResponse = {
    autoLinked,
    candidates,
    multiRepoSkipped,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
