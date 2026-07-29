# TestRequirementLink

TestRequirementLink is one durable test-case-to-requirement coverage link on main; linked cases\' executions count toward the requirement\'s coverage.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**testId** | **string** |  | [optional] [default to undefined]
**requirementId** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { TestRequirementLink } from '@tiden/api-client';

const instance: TestRequirementLink = {
    id,
    testId,
    requirementId,
    createdAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
