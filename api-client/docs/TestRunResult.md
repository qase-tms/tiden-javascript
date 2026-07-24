# TestRunResult


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**runId** | **string** |  | [optional] [default to undefined]
**testId** | **string** |  | [optional] [default to undefined]
**testSeqNum** | **number** |  | [optional] [default to undefined]
**eventSeq** | **string** |  | [optional] [default to undefined]
**title** | **string** |  | [optional] [default to undefined]
**signature** | **string** |  | [optional] [default to undefined]
**externalId** | **string** |  | [optional] [default to undefined]
**identityKey** | **string** |  | [optional] [default to undefined]
**executionKey** | **string** |  | [optional] [default to undefined]
**status** | **string** |  | [optional] [default to undefined]
**durationMs** | **string** |  | [optional] [default to undefined]
**startedAt** | **string** |  | [optional] [default to undefined]
**endedAt** | **string** |  | [optional] [default to undefined]
**thread** | **string** |  | [optional] [default to undefined]
**message** | **string** |  | [optional] [default to undefined]
**stacktrace** | **string** |  | [optional] [default to undefined]
**params** | **{ [key: string]: string; }** |  | [optional] [default to undefined]
**paramGroups** | [**Array&lt;ParamGroup&gt;**](ParamGroup.md) |  | [optional] [default to undefined]
**fields** | **{ [key: string]: string; }** |  | [optional] [default to undefined]
**steps** | [**Array&lt;ResultStep&gt;**](ResultStep.md) |  | [optional] [default to undefined]
**suitePath** | [**Array&lt;SuiteSegment&gt;**](SuiteSegment.md) |  | [optional] [default to undefined]
**attachments** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**muted** | **boolean** |  | [optional] [default to undefined]
**defect** | **boolean** |  | [optional] [default to undefined]
**isLatestAttempt** | **boolean** |  | [optional] [default to undefined]
**attempt** | **number** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { TestRunResult } from '@tiden/api-client';

const instance: TestRunResult = {
    id,
    runId,
    testId,
    testSeqNum,
    eventSeq,
    title,
    signature,
    externalId,
    identityKey,
    executionKey,
    status,
    durationMs,
    startedAt,
    endedAt,
    thread,
    message,
    stacktrace,
    params,
    paramGroups,
    fields,
    steps,
    suitePath,
    attachments,
    muted,
    defect,
    isLatestAttempt,
    attempt,
    createdAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
