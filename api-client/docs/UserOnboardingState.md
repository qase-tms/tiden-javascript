# UserOnboardingState

UserOnboardingState tracks a user\'s onboarding milestones as one-way timestamps (unset = not reached), plus the resumable creator-wizard position.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**userId** | **string** |  | [optional] [default to undefined]
**cliVerifiedAt** | **string** |  | [optional] [default to undefined]
**dismissedAt** | **string** |  | [optional] [default to undefined]
**completedAt** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]
**wizardStep** | **string** | Current wizard screen; \&quot;\&quot; means the wizard was never started. | [optional] [default to undefined]
**answers** | [**OnboardingAnswers**](OnboardingAnswers.md) |  | [optional] [default to undefined]

## Example

```typescript
import { UserOnboardingState } from '@tiden/api-client';

const instance: UserOnboardingState = {
    userId,
    cliVerifiedAt,
    dismissedAt,
    completedAt,
    createdAt,
    updatedAt,
    wizardStep,
    answers,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
