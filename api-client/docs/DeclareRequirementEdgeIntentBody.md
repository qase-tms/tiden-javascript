# DeclareRequirementEdgeIntentBody

DeclareRequirementEdgeIntent records a deferred semantic edge for a brand-new feature whose endpoint(s) are not yet on main. The intent is stored on the branch and materialized into a real edge when the branch merges to main.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**branch** | **string** | branch is the branch the intent is declared on (empty &#x3D; main). | [optional] [default to undefined]
**srcRequirementId** | **string** |  | [optional] [default to undefined]
**dstRequirementId** | **string** | Exactly one dst endpoint (see WriteRequirementEdgeRequest). dst_requirement_id may be empty when dst_component_id is set. | [optional] [default to undefined]
**edgeType** | **string** | edge_type must be \&quot;depends_on\&quot;/\&quot;traces_to\&quot; (req→req) or \&quot;impacts_component\&quot; (req→component). | [optional] [default to undefined]
**confidence** | **number** | confidence must be provided; explicit 0.0 is valid, omitted is not. | [optional] [default to undefined]
**rationale** | **string** |  | [optional] [default to undefined]
**dstComponentId** | **string** | dst_component_id sets a req→component endpoint (shift-left v3). Mutually exclusive with dst_requirement_id. | [optional] [default to undefined]

## Example

```typescript
import { DeclareRequirementEdgeIntentBody } from '@tiden/api-client';

const instance: DeclareRequirementEdgeIntentBody = {
    branch,
    srcRequirementId,
    dstRequirementId,
    edgeType,
    confidence,
    rationale,
    dstComponentId,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
