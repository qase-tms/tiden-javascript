# CodeLink

CodeLink is a durable, repo-aware pointer from a branch to the real code it corresponds to — a git branch or a pull request in some repository (migration 000103). A branch can carry several: one coding session commonly spans several repos/submodules. kind/repository/ref together with the branch identify one link; re-upserting the same triple updates url/title/state/shas instead of duplicating. kind and state are client-supplied and rendered directly in the UI: kind is DB-CHECKed against {git_branch, pull_request}; state is validated server-side against a small closed set ({\"\", open, merged, closed}) that can grow without a migration.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**branchId** | **string** |  | [optional] [default to undefined]
**productId** | **string** |  | [optional] [default to undefined]
**kind** | **string** |  | [optional] [default to undefined]
**repository** | **string** |  | [optional] [default to undefined]
**ref** | **string** |  | [optional] [default to undefined]
**url** | **string** |  | [optional] [default to undefined]
**title** | **string** |  | [optional] [default to undefined]
**state** | **string** |  | [optional] [default to undefined]
**baseSha** | **string** |  | [optional] [default to undefined]
**headSha** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { CodeLink } from '@tiden/api-client';

const instance: CodeLink = {
    id,
    branchId,
    productId,
    kind,
    repository,
    ref,
    url,
    title,
    state,
    baseSha,
    headSha,
    createdAt,
    updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
