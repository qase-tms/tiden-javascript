# RequirementTier

RequirementTier splits the resolved radius by HOW a requirement was reached. CORE is reached by graph evidence — an anchor on a file the session changed, edge-reachability from such an anchor, or membership of a subtree that holds one — and is what a session\'s close policy binds to. HALO is reached by the text signals alone and carries a confirm-or-dismiss directive; a text-only match lands in halo at most, it is never dropped.  Additive: a client built before the tier existed reads UNSPECIFIED and ignores it, which is exactly the pre-tier behavior (one undifferentiated radius).

## Enum

* `RequirementTierUnspecified` (value: `'REQUIREMENT_TIER_UNSPECIFIED'`)

* `RequirementTierCore` (value: `'REQUIREMENT_TIER_CORE'`)

* `RequirementTierHalo` (value: `'REQUIREMENT_TIER_HALO'`)

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
