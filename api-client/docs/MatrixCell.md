# MatrixCell


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**testCase** | **string** |  | [optional] [default to undefined]
**status** | **string** |  | [optional] [default to undefined]
**display** | **string** |  | [optional] [default to undefined]
**testId** | **string** | test reference; pinned by TIDEN-135 so the grid stays diffable across runs — do not repurpose it.  join key: lets a client attach gate-accurate status to | [optional] [default to undefined]

## Example

```typescript
import { MatrixCell } from '@tiden/api-client';

const instance: MatrixCell = {
    testCase,
    status,
    display,
    testId,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
