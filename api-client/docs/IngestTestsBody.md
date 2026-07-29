# IngestTestsBody

IngestTestsRequest is one reporter batch: 1..1000 tests upserted into (product, branch) with a shared framework label.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**branch** | **string** |  | [optional] [default to undefined]
**framework** | **string** | pytest | jest | junit | ... | [optional] [default to undefined]
**tests** | [**Array&lt;IngestTest&gt;**](IngestTest.md) |  | [optional] [default to undefined]

## Example

```typescript
import { IngestTestsBody } from '@tiden/api-client';

const instance: IngestTestsBody = {
    branch,
    framework,
    tests,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
