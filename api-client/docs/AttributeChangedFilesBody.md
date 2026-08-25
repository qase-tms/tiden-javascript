# AttributeChangedFilesBody

AttributeChangedFiles maps a requirement\'s repo-qualified changed files to components via the MAIN component scope, declares one idempotent impacts_component edge-intent per touched component, and sets/clears requirement.component_id. Enforces the one-repo-per-node invariant: the changed files must belong to a single repository.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**branch** | **string** | branch the requirement lives on (empty &#x3D; main). | [optional] [default to undefined]
**changedFiles** | [**Array&lt;ChangedFile&gt;**](ChangedFile.md) |  | [optional] [default to undefined]

## Example

```typescript
import { AttributeChangedFilesBody } from '@tiden/api-client';

const instance: AttributeChangedFilesBody = {
    branch,
    changedFiles,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
