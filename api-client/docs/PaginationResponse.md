# PaginationResponse

PaginationResponse carries the cursor for the next page (empty = no further results) and the total row count for the query.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**nextPageToken** | **string** |  | [optional] [default to undefined]
**totalCount** | **number** |  | [optional] [default to undefined]

## Example

```typescript
import { PaginationResponse } from '@tiden/api-client';

const instance: PaginationResponse = {
    nextPageToken,
    totalCount,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
