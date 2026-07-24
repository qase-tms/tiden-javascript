# MergeBranchBody


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**resolutions** | **{ [key: string]: string; }** | Resolution map keys are prefixed: \&quot;req:&lt;uuid&gt;\&quot;, \&quot;test:&lt;uuid&gt;\&quot;, or \&quot;comp:&lt;uuid&gt;\&quot;. Server accepts un-prefixed keys as &#x60;req:&#x60; for v1 backwards compat (deprecated; logged with warning, removal scheduled for v2). | [optional] [default to undefined]

## Example

```typescript
import { MergeBranchBody } from '@tiden/api-client';

const instance: MergeBranchBody = {
    resolutions,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
