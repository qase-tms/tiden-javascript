# AdvanceRepoWatermarkResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**advanced** | **boolean** | False when a baseline found an existing row or an empty_sync CAS missed. | [optional] [default to undefined]
**watermark** | [**RepoWatermark**](RepoWatermark.md) |  | [optional] [default to undefined]

## Example

```typescript
import { AdvanceRepoWatermarkResponse } from '@tiden/api-client';

const instance: AdvanceRepoWatermarkResponse = {
    advanced,
    watermark,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
