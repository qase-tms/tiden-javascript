# ReportResultsResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**status** | **boolean** |  | [optional] [default to undefined]
**accepted** | **string** |  | [optional] [default to undefined]
**duplicates** | **string** |  | [optional] [default to undefined]
**errors** | [**Array&lt;ReportError&gt;**](ReportError.md) | Per-entry validation errors, mirroring IngestTestsResponse.errors: the same payload is also attached as google.rpc.Status details on the InvalidArgument error for gRPC clients. | [optional] [default to undefined]

## Example

```typescript
import { ReportResultsResponse } from '@tiden/api-client';

const instance: ReportResultsResponse = {
    status,
    accepted,
    duplicates,
    errors,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
