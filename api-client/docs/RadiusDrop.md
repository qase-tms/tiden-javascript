# RadiusDrop

RadiusDrop is one requirement a session judged out of the diff\'s radius. Recorded as a radius_drop judgement under its supersede key. seq is an optional display hint (e.g. the requirement\'s product seq_num) for the caller\'s own logging — not persisted server-side.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**requirementId** | **string** |  | [optional] [default to undefined]
**reason** | **string** |  | [optional] [default to undefined]
**seq** | **number** |  | [optional] [default to undefined]

## Example

```typescript
import { RadiusDrop } from '@tiden/api-client';

const instance: RadiusDrop = {
    requirementId,
    reason,
    seq,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
