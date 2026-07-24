# VerifyProductSetupBody


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**repoFingerprint** | **string** |  | [optional] [default to undefined]
**repoProductId** | **string** |  | [optional] [default to undefined]
**repoBound** | **boolean** |  | [optional] [default to undefined]
**gitHookWired** | **boolean** |  | [optional] [default to undefined]
**agents** | [**Array&lt;ProductSetupAgentStatus&gt;**](ProductSetupAgentStatus.md) |  | [optional] [default to undefined]
**source** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { VerifyProductSetupBody } from '@tiden/api-client';

const instance: VerifyProductSetupBody = {
    repoFingerprint,
    repoProductId,
    repoBound,
    gitHookWired,
    agents,
    source,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
