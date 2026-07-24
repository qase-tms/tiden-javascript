# UpdateComponentBody


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** | name/description use proto3 presence: an OMITTED field is left unchanged; a present field (even empty) is applied. Prevents a partial update that only sets repository scope from clobbering name/description to \&quot;\&quot;. | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**branch** | **string** |  | [optional] [default to undefined]
**repository** | **string** |  | [optional] [default to undefined]
**setRepository** | **boolean** |  | [optional] [default to undefined]
**componentPaths** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**setComponentPaths** | **boolean** |  | [optional] [default to undefined]
**repositoryAliases** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**setRepositoryAliases** | **boolean** |  | [optional] [default to undefined]

## Example

```typescript
import { UpdateComponentBody } from '@tiden/api-client';

const instance: UpdateComponentBody = {
    name,
    description,
    branch,
    repository,
    setRepository,
    componentPaths,
    setComponentPaths,
    repositoryAliases,
    setRepositoryAliases,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
