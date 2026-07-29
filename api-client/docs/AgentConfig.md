# AgentConfig

AgentConfig binds an agent type to a product with a name, inputs, optional LLM/data credential references, and an optional cron schedule.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**productId** | **string** |  | [optional] [default to undefined]
**agentType** | **string** |  | [optional] [default to undefined]
**name** | **string** |  | [optional] [default to undefined]
**enabled** | **boolean** |  | [optional] [default to undefined]
**inputsJson** | **string** |  | [optional] [default to undefined]
**llmCredentialId** | **string** |  | [optional] [default to undefined]
**dataCredentialId** | **string** |  | [optional] [default to undefined]
**scheduleCron** | **string** |  | [optional] [default to undefined]
**scheduleTimezone** | **string** |  | [optional] [default to undefined]
**nextRunAt** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { AgentConfig } from '@tiden/api-client';

const instance: AgentConfig = {
    id,
    productId,
    agentType,
    name,
    enabled,
    inputsJson,
    llmCredentialId,
    dataCredentialId,
    scheduleCron,
    scheduleTimezone,
    nextRunAt,
    createdAt,
    updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
