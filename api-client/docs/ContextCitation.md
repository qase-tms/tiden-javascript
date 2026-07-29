# ContextCitation

ContextCitation resolves a citation_id referenced elsewhere in a context pack to its source (a test, memory entry, source anchor, ...).

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**sourceType** | **string** |  | [optional] [default to undefined]
**sourceId** | **string** |  | [optional] [default to undefined]
**label** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { ContextCitation } from '@tiden/api-client';

const instance: ContextCitation = {
    id,
    sourceType,
    sourceId,
    label,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
