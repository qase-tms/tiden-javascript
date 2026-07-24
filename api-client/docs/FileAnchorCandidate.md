# FileAnchorCandidate

FileAnchorCandidate is one proposed (requirement, test) link from shared source-file proximity. exact = the test\'s file_path equals a requirement repo_file anchor (auto-linked); otherwise a directory-proximity candidate for agent confirmation.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**requirementId** | **string** |  | [optional] [default to undefined]
**requirementSeq** | **number** |  | [optional] [default to undefined]
**requirementTitle** | **string** |  | [optional] [default to undefined]
**testId** | **string** |  | [optional] [default to undefined]
**testSeq** | **number** |  | [optional] [default to undefined]
**testTitle** | **string** |  | [optional] [default to undefined]
**testFilePath** | **string** |  | [optional] [default to undefined]
**anchorPath** | **string** |  | [optional] [default to undefined]
**dir** | **string** |  | [optional] [default to undefined]
**exact** | **boolean** |  | [optional] [default to undefined]
**confidence** | **number** |  | [optional] [default to undefined]

## Example

```typescript
import { FileAnchorCandidate } from '@tiden/api-client';

const instance: FileAnchorCandidate = {
    requirementId,
    requirementSeq,
    requirementTitle,
    testId,
    testSeq,
    testTitle,
    testFilePath,
    anchorPath,
    dir,
    exact,
    confidence,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
