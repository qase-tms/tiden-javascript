# SessionProgressRequirement

SessionProgressRequirement is one requirement\'s coverage ladder step.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**requirementId** | **string** |  | [optional] [default to undefined]
**display** | **string** |  | [optional] [default to undefined]
**title** | **string** |  | [optional] [default to undefined]
**coverage** | **string** |  | [optional] [default to undefined]
**proposedOnly** | **boolean** |  | [optional] [default to undefined]
**movedThisSession** | **boolean** |  | [optional] [default to undefined]
**tests** | [**Array&lt;SessionProgressTest&gt;**](SessionProgressTest.md) |  | [optional] [default to undefined]
**adopted** | **boolean** | Not in the caller\&#39;s requested slice — added because a test this session executed links to it. Informational: adopted rows are excluded from summary/ready/next_actions (a broad validation run must not hold the session\&#39;s readiness hostage to requirements it never touched). | [optional] [default to undefined]

## Example

```typescript
import { SessionProgressRequirement } from '@tiden/api-client';

const instance: SessionProgressRequirement = {
    requirementId,
    display,
    title,
    coverage,
    proposedOnly,
    movedThisSession,
    tests,
    adopted,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
