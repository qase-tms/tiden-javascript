# CreateAgentConfigBody


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**agentType** | **string** |  | [optional] [default to undefined]
**name** | **string** |  | [optional] [default to undefined]
**enabled** | **boolean** |  | [optional] [default to undefined]
**inputsJson** | **string** |  | [optional] [default to undefined]
**llmCredentialId** | **string** |  | [optional] [default to undefined]
**dataCredentialId** | **string** |  | [optional] [default to undefined]
**scheduleCron** | **string** |  | [optional] [default to undefined]
**scheduleTimezone** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { CreateAgentConfigBody } from '@tiden/api-client';

const instance: CreateAgentConfigBody = {
    agentType,
    name,
    enabled,
    inputsJson,
    llmCredentialId,
    dataCredentialId,
    scheduleCron,
    scheduleTimezone,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
