# OnboardingAnswers

OnboardingAnswers holds the creator wizard\'s collected answers. Clients send the complete message on every update — the server replaces the stored answers wholesale whenever the message is present (message presence, not per-field presence).

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**role** | **string** | How the user described themselves: engineer | leader | qa | pm | other. | [optional] [default to undefined]
**reqgenChoice** | **string** | How requirements get seeded: empty | own | tiden. | [optional] [default to undefined]
**reqgenSource** | **string** | Where Tiden should read requirements from: github | docs | tracker. | [optional] [default to undefined]
**docsUrl** | **string** | Docs URL supplied when reqgen_source is \&quot;docs\&quot; (max 2000 chars). | [optional] [default to undefined]
**productId** | **string** | The product created during the wizard, if any. | [optional] [default to undefined]

## Example

```typescript
import { OnboardingAnswers } from '@tiden/api-client';

const instance: OnboardingAnswers = {
    role,
    reqgenChoice,
    reqgenSource,
    docsUrl,
    productId,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
