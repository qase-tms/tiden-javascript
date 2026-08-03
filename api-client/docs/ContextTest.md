# ContextTest

ContextTest is one test in a context pack, labeled by how it relates to the requirement (link_kind) and whether its coverage is stale.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**test** | [**Test**](Test.md) |  | [optional] [default to undefined]
**linkKind** | **string** |  | [optional] [default to undefined]
**proposalId** | **string** |  | [optional] [default to undefined]
**stale** | **boolean** |  | [optional] [default to undefined]
**citationId** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { ContextTest } from '@tiden/api-client';

const instance: ContextTest = {
    test,
    linkKind,
    proposalId,
    stale,
    citationId,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
