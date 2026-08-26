# CoveringTest

CoveringTest is one test case linked to a suspect requirement.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**seqNum** | **number** |  | [optional] [default to undefined]
**title** | **string** |  | [optional] [default to undefined]
**lastStatus** | **string** | last_status is the most recently reported execution status, or \&quot;\&quot; when the test has never run. | [optional] [default to undefined]

## Example

```typescript
import { CoveringTest } from '@tiden/api-client';

const instance: CoveringTest = {
    id,
    seqNum,
    title,
    lastStatus,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
