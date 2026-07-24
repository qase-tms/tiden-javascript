# AgentRunResult

AgentRunResult is the structured outcome of an agent run, so the UI can render cross-linked changes (requirements, branch, source items) instead of a markdown blob. Most fields describe connector-enrichment runs; `kind` lets the UI adapt the stat tiles for other shapes (e.g. exploratory browsing).

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**fetched** | **number** |  | [optional] [default to undefined]
**alreadyLinked** | **number** |  | [optional] [default to undefined]
**added** | **number** |  | [optional] [default to undefined]
**updated** | **number** |  | [optional] [default to undefined]
**skipped** | **number** |  | [optional] [default to undefined]
**rejected** | **number** |  | [optional] [default to undefined]
**branchId** | **string** |  | [optional] [default to undefined]
**branchName** | **string** |  | [optional] [default to undefined]
**passthrough** | **boolean** |  | [optional] [default to undefined]
**changes** | [**Array&lt;Change&gt;**](Change.md) |  | [optional] [default to undefined]
**kind** | **string** |  | [optional] [default to undefined]
**observations** | **number** |  | [optional] [default to undefined]
**deleted** | **number** |  | [optional] [default to undefined]

## Example

```typescript
import { AgentRunResult } from '@tiden/api-client';

const instance: AgentRunResult = {
    fetched,
    alreadyLinked,
    added,
    updated,
    skipped,
    rejected,
    branchId,
    branchName,
    passthrough,
    changes,
    kind,
    observations,
    deleted,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
