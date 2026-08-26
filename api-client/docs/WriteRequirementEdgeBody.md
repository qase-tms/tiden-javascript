# WriteRequirementEdgeBody


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**srcRequirementId** | **string** |  | [optional] [default to undefined]
**dstRequirementId** | **string** | Exactly one dst endpoint: dst_requirement_id (req→req, edge_type depends_on/traces_to) OR dst_component_id (req→component, edge_type impacts_component). dst_requirement_id may be empty when dst_component_id is set. | [optional] [default to undefined]
**edgeType** | **string** | edge_type must be \&quot;depends_on\&quot;/\&quot;traces_to\&quot; (req→req) or \&quot;impacts_component\&quot; (req→component). | [optional] [default to undefined]
**confidence** | **number** | confidence must be provided; explicit 0.0 is valid, omitted is not. | [optional] [default to undefined]
**agentRunId** | **string** | agent_run_id is attributed to the written edge. | [optional] [default to undefined]
**dstComponentId** | **string** | dst_component_id sets a req→component endpoint. Mutually exclusive with dst_requirement_id. | [optional] [default to undefined]

## Example

```typescript
import { WriteRequirementEdgeBody } from '@tiden/api-client';

const instance: WriteRequirementEdgeBody = {
    srcRequirementId,
    dstRequirementId,
    edgeType,
    confidence,
    agentRunId,
    dstComponentId,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
