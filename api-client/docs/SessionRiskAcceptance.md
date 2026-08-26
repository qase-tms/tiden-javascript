# SessionRiskAcceptance

SessionRiskAcceptance is one priced exception: the requirements it covers, the rubric criterion it cites, one line of checkable evidence, and where the gap goes next.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**requirementRefs** | **Array&lt;string&gt;** | Requirement refs exactly as the agent typed them: \&quot;&lt;CODE&gt;-&lt;N&gt;\&quot; (e.g. \&quot;FEED-49\&quot;) or a canonical lowercase UUID. The server resolves each against the intent branch\&#39;s view to a canonical (main-twin) id and records BOTH — ids for machines, refs for the human reading merge-preview. | [optional] [default to undefined]
**criterion** | **string** |  | [optional] [default to undefined]
**evidence** | **string** |  | [optional] [default to undefined]
**followUp** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { SessionRiskAcceptance } from '@tiden/api-client';

const instance: SessionRiskAcceptance = {
    requirementRefs,
    criterion,
    evidence,
    followUp,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
