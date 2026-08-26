# SourceMap

SourceMap is the metadata of one uploaded source map, keyed by debug_id for matching against incoming error events.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**productId** | **string** |  | [optional] [default to undefined]
**debugId** | **string** |  | [optional] [default to undefined]
**fileName** | **string** |  | [optional] [default to undefined]
**releaseName** | **string** |  | [optional] [default to undefined]
**byteSize** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** | NOTE: metadata only — never a download URL (source maps stay private). | [optional] [default to undefined]

## Example

```typescript
import { SourceMap } from '@tiden/api-client';

const instance: SourceMap = {
    id,
    productId,
    debugId,
    fileName,
    releaseName,
    byteSize,
    createdAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
