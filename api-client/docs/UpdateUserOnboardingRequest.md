# UpdateUserOnboardingRequest

UpdateUserOnboardingRequest latches onboarding flags: each true field stamps its timestamp; false leaves the flag unchanged. wizard_step and answers are ordinary mutable state: an unset field is left untouched, a set one replaces the stored value.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**cliVerified** | **boolean** |  | [optional] [default to undefined]
**dismissed** | **boolean** |  | [optional] [default to undefined]
**completed** | **boolean** |  | [optional] [default to undefined]
**wizardStep** | **string** | Wizard screen to resume at; one of \&quot;\&quot;, you-org, start, product, reqgen, repos, agents, plan, done. | [optional] [default to undefined]
**answers** | [**OnboardingAnswers**](OnboardingAnswers.md) |  | [optional] [default to undefined]

## Example

```typescript
import { UpdateUserOnboardingRequest } from '@tiden/api-client';

const instance: UpdateUserOnboardingRequest = {
    cliVerified,
    dismissed,
    completed,
    wizardStep,
    answers,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
