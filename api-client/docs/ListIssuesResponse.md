# ListIssuesResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**issues** | [**Array&lt;Issue&gt;**](Issue.md) |  | [optional] [default to undefined]
**pagination** | [**PaginationResponse**](PaginationResponse.md) |  | [optional] [default to undefined]
**processing** | **boolean** | true when ungrouped events exist for this product (worker hasn\&#39;t caught up); drives the \&quot;Receiving events, grouping…\&quot; banner. | [optional] [default to undefined]

## Example

```typescript
import { ListIssuesResponse } from '@tiden/api-client';

const instance: ListIssuesResponse = {
    issues,
    pagination,
    processing,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
