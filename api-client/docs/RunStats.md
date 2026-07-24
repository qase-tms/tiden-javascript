# RunStats

Latest-attempt counters (retries collapsed by execution identity).

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**total** | **string** |  | [optional] [default to undefined]
**passed** | **string** |  | [optional] [default to undefined]
**failed** | **string** |  | [optional] [default to undefined]
**blocked** | **string** |  | [optional] [default to undefined]
**skipped** | **string** |  | [optional] [default to undefined]
**invalid** | **string** |  | [optional] [default to undefined]
**muted** | **string** |  | [optional] [default to undefined]
**attempts** | **string** |  | [optional] [default to undefined]
**durationMs** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { RunStats } from '@tiden/api-client';

const instance: RunStats = {
    total,
    passed,
    failed,
    blocked,
    skipped,
    invalid,
    muted,
    attempts,
    durationMs,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
