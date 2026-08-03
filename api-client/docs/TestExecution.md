# TestExecution

TestExecution is the embedded latest-execution snapshot carried on tests and steps: reporter-provided status, duration, timing, and thread.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**durationMs** | **string** |  | [optional] [default to undefined]
**status** | **string** |  | [optional] [default to undefined]
**startTime** | **string** |  | [optional] [default to undefined]
**endTime** | **string** |  | [optional] [default to undefined]
**thread** | **string** |  | [optional] [default to undefined]
**runSeq** | **number** | Test-run seq this execution came from (live-doc sync stamps it; 0 &#x3D; unknown/legacy — run seqs start at 1). Read-only: server-populated, never accepted from clients. | [optional] [default to undefined]

## Example

```typescript
import { TestExecution } from '@tiden/api-client';

const instance: TestExecution = {
    durationMs,
    status,
    startTime,
    endTime,
    thread,
    runSeq,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
