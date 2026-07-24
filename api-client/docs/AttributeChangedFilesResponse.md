# AttributeChangedFilesResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**attributed** | [**Array&lt;AttributedChangedFile&gt;**](AttributedChangedFile.md) |  | [optional] [default to undefined]
**unmatched** | [**Array&lt;ChangedFile&gt;**](ChangedFile.md) |  | [optional] [default to undefined]
**componentId** | **string** | component_id is set when the files resolve to exactly ONE component (requirement.component_id was set to it); empty when they span multiple components (cleared) or none. | [optional] [default to undefined]

## Example

```typescript
import { AttributeChangedFilesResponse } from '@tiden/api-client';

const instance: AttributeChangedFilesResponse = {
    attributed,
    unmatched,
    componentId,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
