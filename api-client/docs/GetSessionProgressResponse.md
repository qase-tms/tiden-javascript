# GetSessionProgressResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**requirements** | [**Array&lt;SessionProgressRequirement&gt;**](SessionProgressRequirement.md) |  | [optional] [default to undefined]
**summary** | [**SessionProgressSummary**](SessionProgressSummary.md) |  | [optional] [default to undefined]
**ready** | **boolean** |  | [optional] [default to undefined]
**nextActions** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**intentBranchStatus** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { GetSessionProgressResponse } from '@tiden/api-client';

const instance: GetSessionProgressResponse = {
    requirements,
    summary,
    ready,
    nextActions,
    intentBranchStatus,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
