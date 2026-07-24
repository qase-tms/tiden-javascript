# AgentType

AgentType is a code-defined agent capability surfaced in the catalog.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**key** | **string** |  | [optional] [default to undefined]
**title** | **string** |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**inputSchemaJson** | **string** |  | [optional] [default to undefined]
**supportedProviders** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**defaultModels** | **{ [key: string]: string; }** |  | [optional] [default to undefined]
**needsDataCredential** | **boolean** | true for jira/asana/etc. | [optional] [default to undefined]
**producesBranch** | **boolean** |  | [optional] [default to undefined]

## Example

```typescript
import { AgentType } from '@tiden/api-client';

const instance: AgentType = {
    key,
    title,
    description,
    inputSchemaJson,
    supportedProviders,
    defaultModels,
    needsDataCredential,
    producesBranch,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
