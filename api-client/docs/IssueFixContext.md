# IssueFixContext

IssueFixContext is everything needed to fix one error, in one response: what broke, where it is happening, which files the stack trace implicates, which requirements those files implement, and whether any test covers them.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**issue** | [**Issue**](Issue.md) |  | [optional] [default to undefined]
**latestEvent** | [**IssueEvent**](IssueEvent.md) |  | [optional] [default to undefined]
**suspectPaths** | **Array&lt;string&gt;** | suspect_paths are the file paths of the in-app stack frames, in stack order and deduplicated. These are the files to open. | [optional] [default to undefined]
**environments** | [**Array&lt;IssueEnvironmentCount&gt;**](IssueEnvironmentCount.md) | environments is the per-environment occurrence split — how you tell a production outage from dev noise. | [optional] [default to undefined]
**firstReleaseName** | **string** |  | [optional] [default to undefined]
**lastReleaseName** | **string** |  | [optional] [default to undefined]
**regressed** | **boolean** | regressed is true when this issue was resolved and came back, reopening automatically. Treat these as highest priority. | [optional] [default to undefined]
**component** | [**Component**](Component.md) |  | [optional] [default to undefined]
**suspectRequirements** | [**Array&lt;SuspectRequirement&gt;**](SuspectRequirement.md) |  | [optional] [default to undefined]
**truncationSignals** | **Array&lt;string&gt;** | truncation_signals names anything omitted to keep the response bounded. | [optional] [default to undefined]

## Example

```typescript
import { IssueFixContext } from '@tiden/api-client';

const instance: IssueFixContext = {
    issue,
    latestEvent,
    suspectPaths,
    environments,
    firstReleaseName,
    lastReleaseName,
    regressed,
    component,
    suspectRequirements,
    truncationSignals,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
