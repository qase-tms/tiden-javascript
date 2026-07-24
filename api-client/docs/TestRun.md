# TestRun

TestRun is the API projection of one CI execution container.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**productId** | **string** |  | [optional] [default to undefined]
**seqNum** | **number** |  | [optional] [default to undefined]
**title** | **string** |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**status** | **string** |  | [optional] [default to undefined]
**environmentId** | **string** |  | [optional] [default to undefined]
**environmentSlug** | **string** |  | [optional] [default to undefined]
**environmentName** | **string** |  | [optional] [default to undefined]
**branchName** | **string** |  | [optional] [default to undefined]
**branchId** | **string** |  | [optional] [default to undefined]
**configurations** | **{ [key: string]: string; }** |  | [optional] [default to undefined]
**buildSha** | **string** |  | [optional] [default to undefined]
**clientMeta** | **{ [key: string]: string; }** |  | [optional] [default to undefined]
**stats** | [**RunStats**](RunStats.md) |  | [optional] [default to undefined]
**startedAt** | **string** |  | [optional] [default to undefined]
**completedAt** | **string** |  | [optional] [default to undefined]
**liveDocStatus** | **string** |  | [optional] [default to undefined]
**liveDocOperationId** | **string** |  | [optional] [default to undefined]
**liveDocStats** | [**LiveDocStats**](LiveDocStats.md) |  | [optional] [default to undefined]
**liveDocError** | **string** |  | [optional] [default to undefined]
**createdBy** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { TestRun } from '@tiden/api-client';

const instance: TestRun = {
    id,
    productId,
    seqNum,
    title,
    description,
    status,
    environmentId,
    environmentSlug,
    environmentName,
    branchName,
    branchId,
    configurations,
    buildSha,
    clientMeta,
    stats,
    startedAt,
    completedAt,
    liveDocStatus,
    liveDocOperationId,
    liveDocStats,
    liveDocError,
    createdBy,
    createdAt,
    updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
