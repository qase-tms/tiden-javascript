# AgentRunEvent

AgentRunEvent is one timestamped log entry of an agent run: level + kind + human-readable message, with optional structured data_json.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**runId** | **string** |  | [optional] [default to undefined]
**ts** | **string** |  | [optional] [default to undefined]
**level** | **string** |  | [optional] [default to undefined]
**kind** | **string** |  | [optional] [default to undefined]
**message** | **string** |  | [optional] [default to undefined]
**dataJson** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { AgentRunEvent } from '@tiden/api-client';

const instance: AgentRunEvent = {
    id,
    runId,
    ts,
    level,
    kind,
    message,
    dataJson,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
