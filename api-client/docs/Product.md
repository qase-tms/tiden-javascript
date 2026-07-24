# Product


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**workspaceId** | **string** |  | [optional] [default to undefined]
**name** | **string** |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]
**code** | **string** |  | [optional] [default to undefined]
**liveDocEnabled** | **boolean** | Gates live-documentation mode: on test-run completion the test repository is reconciled from the run\&#39;s results. Default on. | [optional] [default to undefined]
**teamId** | **string** | Team owner. Empty &#x3D; workspace-owned (visible to all workspace members); set &#x3D; team-owned (visible to that team\&#39;s members + workspace owners/admins). | [optional] [default to undefined]

## Example

```typescript
import { Product } from '@tiden/api-client';

const instance: Product = {
    id,
    workspaceId,
    name,
    description,
    createdAt,
    updatedAt,
    code,
    liveDocEnabled,
    teamId,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
