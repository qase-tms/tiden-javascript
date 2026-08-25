# IssueEvent


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**eventId** | **string** |  | [optional] [default to undefined]
**level** | **string** |  | [optional] [default to undefined]
**message** | **string** |  | [optional] [default to undefined]
**exceptionType** | **string** |  | [optional] [default to undefined]
**exceptionValue** | **string** |  | [optional] [default to undefined]
**platform** | **string** |  | [optional] [default to undefined]
**releaseId** | **string** |  | [optional] [default to undefined]
**environmentId** | **string** |  | [optional] [default to undefined]
**payload** | **string** |  | [optional] [default to undefined]
**receivedAt** | **string** |  | [optional] [default to undefined]
**frames** | [**Array&lt;Frame&gt;**](Frame.md) | Server-resolved stacktrace overlay (symbolicated frames), populated only on GetIssue.latest_event. payload stays for breadcrumbs/request/etc. | [optional] [default to undefined]
**releaseName** | **string** | Human-readable release/environment as sent by the SDK. The *_id fields above are the resolved entity FKs; these names are what the UI renders directly. | [optional] [default to undefined]
**environmentName** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { IssueEvent } from '@tiden/api-client';

const instance: IssueEvent = {
    id,
    eventId,
    level,
    message,
    exceptionType,
    exceptionValue,
    platform,
    releaseId,
    environmentId,
    payload,
    receivedAt,
    frames,
    releaseName,
    environmentName,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
