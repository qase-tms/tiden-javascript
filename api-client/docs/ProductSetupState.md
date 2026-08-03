# ProductSetupState

ProductSetupState is one recorded setup-verification snapshot for a (product, user): repo binding, git-hook wiring, and per-agent statuses.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**productId** | **string** |  | [optional] [default to undefined]
**userId** | **string** |  | [optional] [default to undefined]
**repoFingerprint** | **string** |  | [optional] [default to undefined]
**repoProductId** | **string** |  | [optional] [default to undefined]
**repoBound** | **boolean** |  | [optional] [default to undefined]
**gitHookWired** | **boolean** |  | [optional] [default to undefined]
**agents** | [**Array&lt;ProductSetupAgentStatus&gt;**](ProductSetupAgentStatus.md) |  | [optional] [default to undefined]
**source** | **string** |  | [optional] [default to undefined]
**verifiedAt** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { ProductSetupState } from '@tiden/api-client';

const instance: ProductSetupState = {
    productId,
    userId,
    repoFingerprint,
    repoProductId,
    repoBound,
    gitHookWired,
    agents,
    source,
    verifiedAt,
    createdAt,
    updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
