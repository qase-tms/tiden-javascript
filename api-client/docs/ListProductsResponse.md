# ListProductsResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**products** | [**Array&lt;Product&gt;**](Product.md) |  | [optional] [default to undefined]
**pagination** | [**PaginationResponse**](PaginationResponse.md) |  | [optional] [default to undefined]
**items** | [**Array&lt;ProductWithSummary&gt;**](ProductWithSummary.md) | Same page as products, each with a per-product rollup for the list page. | [optional] [default to undefined]

## Example

```typescript
import { ListProductsResponse } from '@tiden/api-client';

const instance: ListProductsResponse = {
    products,
    pagination,
    items,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
