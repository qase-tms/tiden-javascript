# Frame

Frame is one server-resolved stacktrace frame. state drives the UI treatment (resolved=quiet, map_missing/map_mismatch=amber badge, degraded=banner).

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_function** | **string** |  | [optional] [default to undefined]
**absPath** | **string** |  | [optional] [default to undefined]
**filename** | **string** |  | [optional] [default to undefined]
**lineno** | **number** |  | [optional] [default to undefined]
**colno** | **number** |  | [optional] [default to undefined]
**inApp** | **boolean** |  | [optional] [default to undefined]
**state** | **string** |  | [optional] [default to undefined]
**contextLine** | **string** |  | [optional] [default to undefined]
**preContext** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**postContext** | **Array&lt;string&gt;** |  | [optional] [default to undefined]

## Example

```typescript
import { Frame } from '@tiden/api-client';

const instance: Frame = {
    _function,
    absPath,
    filename,
    lineno,
    colno,
    inApp,
    state,
    contextLine,
    preContext,
    postContext,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
