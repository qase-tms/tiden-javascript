# CodebaseContext


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**sourceFiles** | [**Array&lt;CodebaseFile&gt;**](CodebaseFile.md) |  | [optional] [default to undefined]
**testFiles** | [**Array&lt;CodebaseFile&gt;**](CodebaseFile.md) |  | [optional] [default to undefined]
**framework** | **string** |  | [optional] [default to undefined]
**testCommand** | **string** |  | [optional] [default to undefined]
**importGraphHints** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**styleExamples** | [**Array&lt;CodebaseFile&gt;**](CodebaseFile.md) |  | [optional] [default to undefined]
**fixturesAndMocks** | [**Array&lt;CodebaseFile&gt;**](CodebaseFile.md) |  | [optional] [default to undefined]
**candidateFilePaths** | **Array&lt;string&gt;** |  | [optional] [default to undefined]

## Example

```typescript
import { CodebaseContext } from '@tiden/api-client';

const instance: CodebaseContext = {
    sourceFiles,
    testFiles,
    framework,
    testCommand,
    importGraphHints,
    styleExamples,
    fixturesAndMocks,
    candidateFilePaths,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
