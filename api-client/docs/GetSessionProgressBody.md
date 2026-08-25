# GetSessionProgressBody

GetSessionProgressRequest asks for the per-requirement progress of ONE intent session: the client supplies the session id and the requirement slice it is working on (retrieved ids + the session draft), plus the intent branch whose proposals should count. Empty intent_branch = the main view (no proposals).

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**sessionId** | **string** |  | [optional] [default to undefined]
**requirementIds** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**intentBranch** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { GetSessionProgressBody } from '@tiden/api-client';

const instance: GetSessionProgressBody = {
    sessionId,
    requirementIds,
    intentBranch,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
