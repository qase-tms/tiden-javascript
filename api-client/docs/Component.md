# Component

Component is a deployment/architectural unit of a product. The repository/component_paths/repository_aliases scope maps changed files to the component.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**productId** | **string** |  | [optional] [default to undefined]
**name** | **string** |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]
**branchId** | **string** |  | [optional] [default to undefined]
**sourceId** | **string** |  | [optional] [default to undefined]
**branchStatus** | **string** |  | [optional] [default to undefined]
**repository** | **string** | Repository-aware component scope.  canonical repo id (e.g. \&quot;github.com/acme/backend\&quot;); unset &#x3D; unscoped/main repo | [optional] [default to undefined]
**componentPaths** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**repositoryAliases** | **Array&lt;string&gt;** |  | [optional] [default to undefined]

## Example

```typescript
import { Component } from '@tiden/api-client';

const instance: Component = {
    id,
    productId,
    name,
    description,
    createdAt,
    updatedAt,
    branchId,
    sourceId,
    branchStatus,
    repository,
    componentPaths,
    repositoryAliases,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
