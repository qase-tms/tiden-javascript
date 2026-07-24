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
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
