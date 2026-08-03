# Environment

Environment labels where test runs and releases happen (e.g. production, staging). slug is the stable identifier reporters and CI reference; origin is \"manual\" (created explicitly) or \"auto\" (auto-created by an ingest endpoint from an unknown slug).

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**productId** | **string** |  | [optional] [default to undefined]
**name** | **string** |  | [optional] [default to undefined]
**slug** | **string** |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**host** | **string** |  | [optional] [default to undefined]
**type** | **string** |  | [optional] [default to undefined]
**origin** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { Environment } from '@tiden/api-client';

const instance: Environment = {
    id,
    productId,
    name,
    slug,
    description,
    host,
    type,
    origin,
    createdAt,
    updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
