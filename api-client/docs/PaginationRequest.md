# PaginationRequest

PaginationRequest is the shared cursor-pagination input: page_size caps the page (server default and maximum apply when 0 or out of range) and page_token continues from a previous response\'s next_page_token.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**pageSize** | **number** |  | [optional] [default to undefined]
**pageToken** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { PaginationRequest } from '@tiden/api-client';

const instance: PaginationRequest = {
    pageSize,
    pageToken,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
