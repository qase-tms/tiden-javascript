# SuspectRequirement

SuspectRequirement is a requirement anchored to at least one suspect path — the specification the broken code was meant to satisfy.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**seqNum** | **number** |  | [optional] [default to undefined]
**title** | **string** |  | [optional] [default to undefined]
**matchedPaths** | **Array&lt;string&gt;** | matched_paths are the suspect paths anchored to this requirement, so a wrong match is visible rather than silent. | [optional] [default to undefined]
**coverage** | **string** | coverage is verified | not_run | no_test — the same vocabulary the traceability matrix uses. Anything but \&quot;verified\&quot; is a reason this error escaped. | [optional] [default to undefined]
**tests** | [**Array&lt;CoveringTest&gt;**](CoveringTest.md) |  | [optional] [default to undefined]

## Example

```typescript
import { SuspectRequirement } from '@tiden/api-client';

const instance: SuspectRequirement = {
    id,
    seqNum,
    title,
    matchedPaths,
    coverage,
    tests,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
