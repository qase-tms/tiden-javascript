# ChangedFile

ChangedFile is one repo-qualified changed path.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**repository** | **string** | repository is the canonical repo id OR a local checkout alias (resolved via component repository_aliases). | [optional] [default to undefined]
**path** | **string** | path is repo-relative. | [optional] [default to undefined]
**status** | **string** | status is \&quot;modified\&quot;|\&quot;added\&quot;|\&quot;deleted\&quot; (informational — deleted files are still attributed to their component; the caller decides not to anchor them). | [optional] [default to undefined]

## Example

```typescript
import { ChangedFile } from '@tiden/api-client';

const instance: ChangedFile = {
    repository,
    path,
    status,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
