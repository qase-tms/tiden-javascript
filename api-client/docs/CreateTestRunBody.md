# CreateTestRunBody


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**title** | **string** |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**environment** | **string** |  | [optional] [default to undefined]
**branch** | **string** |  | [optional] [default to undefined]
**configurations** | **{ [key: string]: string; }** |  | [optional] [default to undefined]
**buildSha** | **string** |  | [optional] [default to undefined]
**startedAt** | **string** |  | [optional] [default to undefined]
**clientMeta** | **{ [key: string]: string; }** |  | [optional] [default to undefined]
**intentSessionId** | **string** |  | [optional] [default to undefined]
**intentBranch** | **string** | The session\&#39;s Tiden intent branch: live-documentation sync lands there instead of resolving the free-text git &#x60;branch&#x60; name (which never creates a Tiden branch). Set by an in-session &#x60;tiden run exec&#x60;; empty otherwise. | [optional] [default to undefined]

## Example

```typescript
import { CreateTestRunBody } from '@tiden/api-client';

const instance: CreateTestRunBody = {
    title,
    description,
    environment,
    branch,
    configurations,
    buildSha,
    startedAt,
    clientMeta,
    intentSessionId,
    intentBranch,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
