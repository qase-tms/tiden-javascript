# RequirementSource

RequirementSource is one provenance record of a requirement — where it came from: a repo file anchor (repo_path + optional line range), a documentation URL, manual input, an attachment, or an agent artifact.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**productId** | **string** |  | [optional] [default to undefined]
**branchId** | **string** |  | [optional] [default to undefined]
**requirementId** | **string** |  | [optional] [default to undefined]
**sourceType** | **string** |  | [optional] [default to undefined]
**title** | **string** |  | [optional] [default to undefined]
**locator** | **string** |  | [optional] [default to undefined]
**url** | **string** |  | [optional] [default to undefined]
**repoPath** | **string** |  | [optional] [default to undefined]
**lineStart** | **number** |  | [optional] [default to undefined]
**lineEnd** | **number** |  | [optional] [default to undefined]
**excerpt** | **string** |  | [optional] [default to undefined]
**metadata** | **object** |  | [optional] [default to undefined]
**createdBy** | **string** |  | [optional] [default to undefined]
**createdByAgentRunId** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { RequirementSource } from '@tiden/api-client';

const instance: RequirementSource = {
    id,
    productId,
    branchId,
    requirementId,
    sourceType,
    title,
    locator,
    url,
    repoPath,
    lineStart,
    lineEnd,
    excerpt,
    metadata,
    createdBy,
    createdByAgentRunId,
    createdAt,
    updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
