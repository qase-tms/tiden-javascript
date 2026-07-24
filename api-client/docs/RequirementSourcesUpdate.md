# RequirementSourcesUpdate


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**sources** | [**Array&lt;RequirementSourceInput&gt;**](RequirementSourceInput.md) |  | [optional] [default to undefined]
**merge** | **boolean** | merge, when true, unions incoming sources with existing ones using anchor-key dedup instead of replacing the whole set. Agent writes set merge&#x3D;true; UI edits leave it false (default) for explicit replace semantics. | [optional] [default to undefined]

## Example

```typescript
import { RequirementSourcesUpdate } from '@tiden/api-client';

const instance: RequirementSourcesUpdate = {
    sources,
    merge,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
