# V1UploadRunAttachmentResult


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**hash** | **string** | sha256 hex content hash — what a result\&#39;s &#x60;attachments&#x60; entry carries. | [optional] [default to undefined]
**filename** | **string** |  | [optional] [default to undefined]
**mime** | **string** | Detected from the first bytes of the part, not from the client. | [optional] [default to undefined]
**size** | **string** |  | [optional] [default to undefined]
**url** | **string** | Presigned download URL; short-lived. Re-resolve a hash via GetRunAttachment instead of storing this. | [optional] [default to undefined]

## Example

```typescript
import { V1UploadRunAttachmentResult } from '@tiden/api-client';

const instance: V1UploadRunAttachmentResult = {
    hash,
    filename,
    mime,
    size,
    url,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
