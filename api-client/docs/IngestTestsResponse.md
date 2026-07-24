# IngestTestsResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**stats** | [**IngestStats**](IngestStats.md) |  | [optional] [default to undefined]
**errors** | [**Array&lt;IngestError&gt;**](IngestError.md) | Per-entry validation errors. Populated when the response carries a 422 status — the gRPC error also carries the same payload via google.rpc.Status details so non-gateway gRPC clients can deserialize them without parsing the gateway response body. | [optional] [default to undefined]

## Example

```typescript
import { IngestTestsResponse } from '@tiden/api-client';

const instance: IngestTestsResponse = {
    stats,
    errors,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
