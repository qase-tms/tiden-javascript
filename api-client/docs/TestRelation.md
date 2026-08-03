# TestRelation

TestRelation is a typed, reporter-provided relation payload attached to a test; data\'s shape depends on type.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | **string** |  | [optional] [default to undefined]
**data** | **object** |  | [optional] [default to undefined]

## Example

```typescript
import { TestRelation } from '@tiden/api-client';

const instance: TestRelation = {
    type,
    data,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
