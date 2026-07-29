# TestStep

TestStep is one step of a test case\'s specification; children nest sub-steps.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**action** | **string** |  | [optional] [default to undefined]
**expected** | **string** |  | [optional] [default to undefined]
**data** | **string** |  | [optional] [default to undefined]
**children** | [**Array&lt;TestStep&gt;**](TestStep.md) |  | [optional] [default to undefined]
**type** | **string** |  | [optional] [default to undefined]
**keyword** | **string** |  | [optional] [default to undefined]
**name** | **string** |  | [optional] [default to undefined]
**inputData** | **object** |  | [optional] [default to undefined]
**attachments** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**execution** | [**TestExecution**](TestExecution.md) |  | [optional] [default to undefined]

## Example

```typescript
import { TestStep } from '@tiden/api-client';

const instance: TestStep = {
    id,
    action,
    expected,
    data,
    children,
    type,
    keyword,
    name,
    inputData,
    attachments,
    execution,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
