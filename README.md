# tiden-javascript

Tiden reporters for JavaScript test frameworks. v1 ships the commons layer
and the Playwright reporter, reporting into Tiden's Test Runs API.

## Lineage

Forked from [qase-tms/qase-javascript](https://github.com/qase-tms/qase-javascript)
at commit `d77a157020fea088ea323050a36b9bf874ad089d` (Apache-2.0), trimmed to
`commons` (from `qase-javascript-commons`) and `playwright` (from
`qase-playwright`). The wire transport targets Tiden instead of Qase TestOps.
