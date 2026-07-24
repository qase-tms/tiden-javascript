# AgentRun


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**agentConfigId** | **string** |  | [optional] [default to undefined]
**productId** | **string** |  | [optional] [default to undefined]
**triggerKind** | **string** |  | [optional] [default to undefined]
**triggerMetaJson** | **string** |  | [optional] [default to undefined]
**status** | **string** |  | [optional] [default to undefined]
**step** | **string** |  | [optional] [default to undefined]
**startedAt** | **string** |  | [optional] [default to undefined]
**finishedAt** | **string** |  | [optional] [default to undefined]
**errorSummary** | **string** |  | [optional] [default to undefined]
**branchId** | **string** |  | [optional] [default to undefined]
**summaryMd** | **string** |  | [optional] [default to undefined]
**llmInputTokens** | **string** |  | [optional] [default to undefined]
**llmOutputTokens** | **string** |  | [optional] [default to undefined]
**llmCostUsdCents** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**result** | [**AgentRunResult**](AgentRunResult.md) |  | [optional] [default to undefined]

## Example

```typescript
import { AgentRun } from '@tiden/api-client';

const instance: AgentRun = {
    id,
    agentConfigId,
    productId,
    triggerKind,
    triggerMetaJson,
    status,
    step,
    startedAt,
    finishedAt,
    errorSummary,
    branchId,
    summaryMd,
    llmInputTokens,
    llmOutputTokens,
    llmCostUsdCents,
    createdAt,
    result,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
