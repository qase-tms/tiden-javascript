# ResultCreate

ResultCreate is one reported test result (Qase v2 ResultCreate-compatible; see the section note above for transformer deltas). id is the idempotency key — resending the same id is counted as a duplicate and skipped.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**title** | **string** |  | [optional] [default to undefined]
**signature** | **string** |  | [optional] [default to undefined]
**externalId** | **string** |  | [optional] [default to undefined]
**testopsIds** | **Array&lt;number&gt;** |  | [optional] [default to undefined]
**execution** | [**ResultExecution**](ResultExecution.md) |  | [optional] [default to undefined]
**fields** | **{ [key: string]: string; }** |  | [optional] [default to undefined]
**attachments** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**steps** | [**Array&lt;ResultStep&gt;**](ResultStep.md) |  | [optional] [default to undefined]
**stepsType** | **string** |  | [optional] [default to undefined]
**params** | **{ [key: string]: string; }** |  | [optional] [default to undefined]
**paramGroups** | [**Array&lt;ParamGroup&gt;**](ParamGroup.md) |  | [optional] [default to undefined]
**suitePath** | [**Array&lt;SuiteSegment&gt;**](SuiteSegment.md) |  | [optional] [default to undefined]
**message** | **string** |  | [optional] [default to undefined]
**defect** | **boolean** |  | [optional] [default to undefined]

## Example

```typescript
import { ResultCreate } from '@tiden/api-client';

const instance: ResultCreate = {
    id,
    title,
    signature,
    externalId,
    testopsIds,
    execution,
    fields,
    attachments,
    steps,
    stepsType,
    params,
    paramGroups,
    suitePath,
    message,
    defect,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
