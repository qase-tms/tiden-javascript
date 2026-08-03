# IngestError

IngestError is one per-entry validation failure from an ingest batch.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**externalId** | **string** |  | [optional] [default to undefined]
**code** | **string** | INVALID_*, AMBIGUOUS_SEQ, SUITE_REQUIRED, ... | [optional] [default to undefined]
**message** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { IngestError } from '@tiden/api-client';

const instance: IngestError = {
    externalId,
    code,
    message,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
