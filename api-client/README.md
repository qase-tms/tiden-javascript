## @tiden/api-client@0.1.0

This generator creates TypeScript/JavaScript client that utilizes [axios](https://github.com/axios/axios). The generated Node module can be used in the following environments:

Environment
* Node.js
* Webpack
* Browserify

Language level
* ES5 - you must have a Promises/A+ library installed
* ES6

Module system
* CommonJS
* ES6 module system

It can be used in both TypeScript and JavaScript. In TypeScript, the definition will be automatically resolved via `package.json`. ([Reference](https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html))

### Building

To build and compile the typescript sources to javascript use:
```
npm install
npm run build
```

### Publishing

First build the package then run `npm publish`

### Consuming

navigate to the folder of your consuming project and run one of the following commands.

_published:_

```
npm install @tiden/api-client@0.1.0 --save
```

_unPublished (not recommended):_

```
npm install PATH_TO_GENERATED_PACKAGE --save
```

### Documentation for API Endpoints

All URIs are relative to *https://api.tiden.ai*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*AgentRetrievalServiceApi* | [**agentRetrievalServiceAttributeChangedFiles**](docs/AgentRetrievalServiceApi.md#agentretrievalserviceattributechangedfiles) | **POST** /v1/products/{productId}/requirements/{requirementId}:attribute-changed-files | Attributes a requirement\&#39;s changed files to owning components.
*AgentRetrievalServiceApi* | [**agentRetrievalServiceDeclareRequirementEdgeIntent**](docs/AgentRetrievalServiceApi.md#agentretrievalservicedeclarerequirementedgeintent) | **POST** /v1/products/{productId}/requirement-edge-intents | Records a deferred graph edge for endpoints not yet on main.
*AgentRetrievalServiceApi* | [**agentRetrievalServiceGetRequirementGraph**](docs/AgentRetrievalServiceApi.md#agentretrievalservicegetrequirementgraph) | **GET** /v1/products/{productId}/requirement-graph | Returns the product\&#39;s full requirement graph.
*AgentRetrievalServiceApi* | [**agentRetrievalServiceGetRequirementTestContext**](docs/AgentRetrievalServiceApi.md#agentretrievalservicegetrequirementtestcontext) | **GET** /v1/products/{productId}/requirements/{requirementId}/test-context | Builds the full test-authoring context pack for one requirement.
*AgentRetrievalServiceApi* | [**agentRetrievalServiceGraphCoverageGaps**](docs/AgentRetrievalServiceApi.md#agentretrievalservicegraphcoveragegaps) | **GET** /v1/products/{productId}/requirements/graph-coverage-gaps | Filters a requirement set down to those without test coverage.
*AgentRetrievalServiceApi* | [**agentRetrievalServiceListCoverageGaps**](docs/AgentRetrievalServiceApi.md#agentretrievalservicelistcoveragegaps) | **GET** /v1/products/{productId}/coverage-gaps | Lists requirements with insufficient test coverage.
*AgentRetrievalServiceApi* | [**agentRetrievalServiceListRequirementAnchors**](docs/AgentRetrievalServiceApi.md#agentretrievalservicelistrequirementanchors) | **GET** /v1/products/{productId}/requirement-anchors | Lists the branch-effective code anchors of all requirements.
*AgentRetrievalServiceApi* | [**agentRetrievalServicePrepareTestGenerationContext**](docs/AgentRetrievalServiceApi.md#agentretrievalservicepreparetestgenerationcontext) | **POST** /v1/products/{productId}/test-generation-context:prepare | Prepares a batched test-generation context for several requirements.
*AgentRetrievalServiceApi* | [**agentRetrievalServiceRequirementImpact**](docs/AgentRetrievalServiceApi.md#agentretrievalservicerequirementimpact) | **GET** /v1/products/{productId}/requirements/impact | Computes the requirement blast radius of a set of changed files.
*AgentRetrievalServiceApi* | [**agentRetrievalServiceRequirementNeighbors**](docs/AgentRetrievalServiceApi.md#agentretrievalservicerequirementneighbors) | **GET** /v1/products/{productId}/requirements/{requirementId}/neighbors | Lists the graph neighbors of one requirement.
*AgentRetrievalServiceApi* | [**agentRetrievalServiceResolveFeatureContext**](docs/AgentRetrievalServiceApi.md#agentretrievalserviceresolvefeaturecontext) | **GET** /v1/products/{productId}/feature-context | Resolves a coding objective into feature-rooted requirement context.
*AgentRetrievalServiceApi* | [**agentRetrievalServiceWriteRequirementEdge**](docs/AgentRetrievalServiceApi.md#agentretrievalservicewriterequirementedge) | **POST** /v1/products/{productId}/requirement-edges | Writes one semantic edge into the requirement graph.
*AgentRunServiceApi* | [**agentRunServiceCancelAgentRun**](docs/AgentRunServiceApi.md#agentrunservicecancelagentrun) | **POST** /v1/agent-runs/{id}:cancel | Cancels a pending or running agent run.
*AgentRunServiceApi* | [**agentRunServiceGetAgentRun**](docs/AgentRunServiceApi.md#agentrunservicegetagentrun) | **GET** /v1/agent-runs/{id} | Fetches one agent run by id.
*AgentRunServiceApi* | [**agentRunServiceListAgentRunEvents**](docs/AgentRunServiceApi.md#agentrunservicelistagentrunevents) | **GET** /v1/agent-runs/{runId}/events | Lists the event log of an agent run.
*AgentRunServiceApi* | [**agentRunServiceListAgentRuns**](docs/AgentRunServiceApi.md#agentrunservicelistagentruns) | **GET** /v1/agent-configs/{agentConfigId}/runs | Lists the runs of an agent configuration.
*AgentRunServiceApi* | [**agentRunServiceStartAgentRun**](docs/AgentRunServiceApi.md#agentrunservicestartagentrun) | **POST** /v1/agent-configs/{agentConfigId}/runs | Starts a run of an agent configuration.
*AgentRunServiceApi* | [**agentRunServiceStreamAgentRun**](docs/AgentRunServiceApi.md#agentrunservicestreamagentrun) | **GET** /v1/agent-runs/{runId}/events:stream | Streams an agent run\&#39;s events as they happen.
*AgentServiceApi* | [**agentServiceCreateAgentConfig**](docs/AgentServiceApi.md#agentservicecreateagentconfig) | **POST** /v1/products/{productId}/agent-configs | Creates an agent configuration in a product.
*AgentServiceApi* | [**agentServiceDeleteAgentConfig**](docs/AgentServiceApi.md#agentservicedeleteagentconfig) | **DELETE** /v1/agent-configs/{id} | Deletes an agent configuration.
*AgentServiceApi* | [**agentServiceGetAgentConfig**](docs/AgentServiceApi.md#agentservicegetagentconfig) | **GET** /v1/agent-configs/{id} | Fetches one agent configuration by id.
*AgentServiceApi* | [**agentServiceListAgentConfigs**](docs/AgentServiceApi.md#agentservicelistagentconfigs) | **GET** /v1/products/{productId}/agent-configs | Lists a product\&#39;s agent configurations.
*AgentServiceApi* | [**agentServiceListAgentTypes**](docs/AgentServiceApi.md#agentservicelistagenttypes) | **GET** /v1/agent-types | Lists the catalog of available agent types.
*AuthServiceApi* | [**authServiceGetCurrentUser**](docs/AuthServiceApi.md#authservicegetcurrentuser) | **GET** /v1/auth/me | Returns the authenticated user (whoami).
*AuthServiceApi* | [**authServiceUpdateUserOnboarding**](docs/AuthServiceApi.md#authserviceupdateuseronboarding) | **PUT** /v1/auth/onboarding | Updates the caller\&#39;s onboarding progress flags.
*BranchServiceApi* | [**branchServiceCreateBranch**](docs/BranchServiceApi.md#branchservicecreatebranch) | **POST** /v1/products/{productId}/branches | Creates a copy-on-write branch of a product\&#39;s main line.
*BranchServiceApi* | [**branchServiceDeleteBranch**](docs/BranchServiceApi.md#branchservicedeletebranch) | **DELETE** /v1/branches/{id} | Deletes a branch and discards its copy-on-write changes.
*BranchServiceApi* | [**branchServiceGetBranch**](docs/BranchServiceApi.md#branchservicegetbranch) | **GET** /v1/branches/{id} | Fetches one branch by id.
*BranchServiceApi* | [**branchServiceGetMergePreview**](docs/BranchServiceApi.md#branchservicegetmergepreview) | **GET** /v1/branches/{id}/merge-preview | Previews the effect of merging a branch into main.
*BranchServiceApi* | [**branchServiceListBranches**](docs/BranchServiceApi.md#branchservicelistbranches) | **GET** /v1/products/{productId}/branches | Lists a product\&#39;s branches.
*BranchServiceApi* | [**branchServiceMergeBranch**](docs/BranchServiceApi.md#branchservicemergebranch) | **POST** /v1/branches/{id}/merge | Merges a branch\&#39;s changes into main and closes the branch.
*ComponentServiceApi* | [**componentServiceCreateComponent**](docs/ComponentServiceApi.md#componentservicecreatecomponent) | **POST** /v1/products/{productId}/components | Creates a component in a product.
*ComponentServiceApi* | [**componentServiceListComponents**](docs/ComponentServiceApi.md#componentservicelistcomponents) | **GET** /v1/products/{productId}/components | Lists a product\&#39;s components.
*ComponentServiceApi* | [**componentServiceUpdateComponent**](docs/ComponentServiceApi.md#componentserviceupdatecomponent) | **PUT** /v1/components/{id} | Updates a component.
*EnvironmentServiceApi* | [**environmentServiceCreateEnvironment**](docs/EnvironmentServiceApi.md#environmentservicecreateenvironment) | **POST** /v1/products/{productId}/environments | Creates an environment in a product.
*EnvironmentServiceApi* | [**environmentServiceDeleteEnvironment**](docs/EnvironmentServiceApi.md#environmentservicedeleteenvironment) | **DELETE** /v1/environments/{id} | Deletes an environment.
*EnvironmentServiceApi* | [**environmentServiceGetEnvironment**](docs/EnvironmentServiceApi.md#environmentservicegetenvironment) | **GET** /v1/environments/{id} | Fetches one environment by id.
*EnvironmentServiceApi* | [**environmentServiceListEnvironments**](docs/EnvironmentServiceApi.md#environmentservicelistenvironments) | **GET** /v1/products/{productId}/environments | Lists a product\&#39;s environments.
*IntentServiceApi* | [**intentServiceDistillIntent**](docs/IntentServiceApi.md#intentservicedistillintent) | **POST** /v1/products/{productId}/intent:distill | Distills a coding-session transcript into requirement changes.
*IssueServiceApi* | [**issueServiceConfirmSourceMapUpload**](docs/IssueServiceApi.md#issueserviceconfirmsourcemapupload) | **POST** /v1/sourcemaps/{id}:confirm | Finalizes a source-map upload (phase 2 of 2).
*IssueServiceApi* | [**issueServiceCreateSourceMapUpload**](docs/IssueServiceApi.md#issueservicecreatesourcemapupload) | **POST** /v1/products/{productId}/sourcemaps | Starts a source-map upload (phase 1 of 2).
*ProductServiceApi* | [**productServiceCreateProduct**](docs/ProductServiceApi.md#productservicecreateproduct) | **POST** /v1/workspaces/{workspaceId}/products | Creates a product in a workspace.
*ProductServiceApi* | [**productServiceGetProduct**](docs/ProductServiceApi.md#productservicegetproduct) | **GET** /v1/products/{id} | Fetches one product by id.
*ProductServiceApi* | [**productServiceListProducts**](docs/ProductServiceApi.md#productservicelistproducts) | **GET** /v1/workspaces/{workspaceId}/products | Lists a workspace\&#39;s products.
*ProductServiceApi* | [**productServiceVerifyProductSetup**](docs/ProductServiceApi.md#productserviceverifyproductsetup) | **POST** /v1/products/{productId}/setup:verify | Records a CLI setup verification snapshot for the product.
*QualityGateServiceApi* | [**qualityGateServiceAcceptRisk**](docs/QualityGateServiceApi.md#qualitygateserviceacceptrisk) | **POST** /v1/products/{productId}/quality-gate:accept-risk | Signs off the residual risk on a soft-signal verdict.
*QualityGateServiceApi* | [**qualityGateServiceApproveRisk**](docs/QualityGateServiceApi.md#qualitygateserviceapproverisk) | **POST** /v1/products/{productId}/quality-gate:approve-risk | Second-approver sign-off for a pending risk acceptance.
*QualityGateServiceApi* | [**qualityGateServiceComputeVerdict**](docs/QualityGateServiceApi.md#qualitygateservicecomputeverdict) | **POST** /v1/products/{productId}/quality-gate:compute | Computes and persists a quality-gate verdict.
*QualityGateServiceApi* | [**qualityGateServiceGetTraceability**](docs/QualityGateServiceApi.md#qualitygateservicegettraceability) | **GET** /v1/products/{productId}/quality-gate/traceability | Returns the traceability matrix behind a verdict.
*QualityGateServiceApi* | [**qualityGateServiceGetVerdict**](docs/QualityGateServiceApi.md#qualitygateservicegetverdict) | **GET** /v1/products/{productId}/quality-gate | Fetches the latest verdict for a scope.
*ReleaseServiceApi* | [**releaseServiceCreateRelease**](docs/ReleaseServiceApi.md#releaseservicecreaterelease) | **POST** /v1/products/{productId}/releases | Creates a release from an external source (CI/SDK).
*ReleaseServiceApi* | [**releaseServiceGetRelease**](docs/ReleaseServiceApi.md#releaseservicegetrelease) | **GET** /v1/releases/{id} | Fetches one release by id.
*ReleaseServiceApi* | [**releaseServiceListReleases**](docs/ReleaseServiceApi.md#releaseservicelistreleases) | **GET** /v1/products/{productId}/releases | Lists a product\&#39;s releases.
*RequirementServiceApi* | [**requirementServiceCreateRequirement**](docs/RequirementServiceApi.md#requirementservicecreaterequirement) | **POST** /v1/products/{productId}/requirements | Creates a requirement.
*RequirementServiceApi* | [**requirementServiceDeleteRequirement**](docs/RequirementServiceApi.md#requirementservicedeleterequirement) | **DELETE** /v1/requirements/{id} | Deletes a requirement.
*RequirementServiceApi* | [**requirementServiceGetRequirement**](docs/RequirementServiceApi.md#requirementservicegetrequirement) | **GET** /v1/requirements/{id} | Fetches one requirement by id.
*RequirementServiceApi* | [**requirementServiceListRequirements**](docs/RequirementServiceApi.md#requirementservicelistrequirements) | **GET** /v1/products/{productId}/requirements | Lists a product\&#39;s requirements.
*RequirementServiceApi* | [**requirementServiceUpdateRequirement**](docs/RequirementServiceApi.md#requirementserviceupdaterequirement) | **PUT** /v1/requirements/{id} | Updates a requirement.
*TestRunServiceApi* | [**testRunServiceAbortTestRun**](docs/TestRunServiceApi.md#testrunserviceaborttestrun) | **POST** /v1/products/{productId}/runs/{runSeq}:abort | Aborts a run.
*TestRunServiceApi* | [**testRunServiceCompleteTestRun**](docs/TestRunServiceApi.md#testrunservicecompletetestrun) | **POST** /v1/products/{productId}/runs/{runSeq}:complete | Completes a run and computes its final verdict.
*TestRunServiceApi* | [**testRunServiceCreateTestRun**](docs/TestRunServiceApi.md#testrunservicecreatetestrun) | **POST** /v1/products/{productId}/runs | Creates a test run to report CI results into.
*TestRunServiceApi* | [**testRunServiceDeleteTestRun**](docs/TestRunServiceApi.md#testrunservicedeletetestrun) | **DELETE** /v1/products/{productId}/runs/{runSeq} | Deletes a test run.
*TestRunServiceApi* | [**testRunServiceGetRunAttachment**](docs/TestRunServiceApi.md#testrunservicegetrunattachment) | **GET** /v1/products/{productId}/attachments/{hash} | Resolves an attachment content hash to a download URL.
*TestRunServiceApi* | [**testRunServiceGetRunResult**](docs/TestRunServiceApi.md#testrunservicegetrunresult) | **GET** /v1/products/{productId}/runs/{runSeq}/results/{resultId} | Fetches one reported result by id.
*TestRunServiceApi* | [**testRunServiceGetRunSummary**](docs/TestRunServiceApi.md#testrunservicegetrunsummary) | **GET** /v1/products/{productId}/runs/{runSeq}/summary | Returns per-suite and per-case rollups of a run.
*TestRunServiceApi* | [**testRunServiceGetTestRun**](docs/TestRunServiceApi.md#testrunservicegettestrun) | **GET** /v1/products/{productId}/runs/{runSeq} | Fetches one test run by its sequence number.
*TestRunServiceApi* | [**testRunServiceListRunResults**](docs/TestRunServiceApi.md#testrunservicelistrunresults) | **GET** /v1/products/{productId}/runs/{runSeq}/results | Lists a run\&#39;s reported results.
*TestRunServiceApi* | [**testRunServiceListTestRuns**](docs/TestRunServiceApi.md#testrunservicelisttestruns) | **GET** /v1/products/{productId}/runs | Lists a product\&#39;s test runs.
*TestRunServiceApi* | [**testRunServiceReportResults**](docs/TestRunServiceApi.md#testrunservicereportresults) | **POST** /v1/products/{productId}/runs/{runSeq}/results:report | Reports a batch of test results into a run.
*TestServiceApi* | [**testServiceCreateTest**](docs/TestServiceApi.md#testservicecreatetest) | **POST** /v1/products/{productId}/tests | Creates a test suite or case.
*TestServiceApi* | [**testServiceDeleteTest**](docs/TestServiceApi.md#testservicedeletetest) | **DELETE** /v1/tests/{id} | Deletes a test.
*TestServiceApi* | [**testServiceDeriveTestLinks**](docs/TestServiceApi.md#testservicederivetestlinks) | **POST** /v1/products/{productId}/test-links:derive | Derives test-requirement links from shared file anchors.
*TestServiceApi* | [**testServiceGetTest**](docs/TestServiceApi.md#testservicegettest) | **GET** /v1/tests/{id} | Fetches one test by id.
*TestServiceApi* | [**testServiceIngestTests**](docs/TestServiceApi.md#testserviceingesttests) | **POST** /v1/products/{productId}/tests:ingest | Batch-upserts tests from a reporter (live-documentation ingest).
*TestServiceApi* | [**testServiceLinkRequirement**](docs/TestServiceApi.md#testservicelinkrequirement) | **POST** /v1/tests/{testId}/links | Links a test case to a requirement.
*TestServiceApi* | [**testServiceListBranchLinkProposals**](docs/TestServiceApi.md#testservicelistbranchlinkproposals) | **GET** /v1/branches/{branchId}/link-proposals | Lists a branch\&#39;s test-requirement link proposals.
*TestServiceApi* | [**testServiceListLinks**](docs/TestServiceApi.md#testservicelistlinks) | **GET** /v1/tests/{testId}/links | Lists a test\&#39;s requirement links.
*TestServiceApi* | [**testServiceListTests**](docs/TestServiceApi.md#testservicelisttests) | **GET** /v1/products/{productId}/tests | Lists a product\&#39;s tests.
*TestServiceApi* | [**testServiceReviewBranchLinkProposals**](docs/TestServiceApi.md#testservicereviewbranchlinkproposals) | **POST** /v1/branches/{branchId}/link-proposals:review | Accepts or rejects branch link proposals.
*TestServiceApi* | [**testServiceUnlinkRequirement**](docs/TestServiceApi.md#testserviceunlinkrequirement) | **DELETE** /v1/tests/{testId}/links/{requirementId} | Removes a test-requirement link.
*TestServiceApi* | [**testServiceUpdateTest**](docs/TestServiceApi.md#testserviceupdatetest) | **PUT** /v1/tests/{id} | Updates a test suite or case.
*WorkspaceServiceApi* | [**workspaceServiceListWorkspaces**](docs/WorkspaceServiceApi.md#workspaceservicelistworkspaces) | **GET** /v1/workspaces | Lists the workspaces the caller belongs to.


### Documentation For Models

 - [AbortTestRunResponse](docs/AbortTestRunResponse.md)
 - [AcceptRiskBody](docs/AcceptRiskBody.md)
 - [AcceptRiskResponse](docs/AcceptRiskResponse.md)
 - [AgentConfig](docs/AgentConfig.md)
 - [AgentMemoryContext](docs/AgentMemoryContext.md)
 - [AgentRun](docs/AgentRun.md)
 - [AgentRunEvent](docs/AgentRunEvent.md)
 - [AgentRunResult](docs/AgentRunResult.md)
 - [AgentType](docs/AgentType.md)
 - [Any](docs/Any.md)
 - [ApproveRiskBody](docs/ApproveRiskBody.md)
 - [ApproveRiskResponse](docs/ApproveRiskResponse.md)
 - [AttributeChangedFilesBody](docs/AttributeChangedFilesBody.md)
 - [AttributeChangedFilesResponse](docs/AttributeChangedFilesResponse.md)
 - [AttributedChangedFile](docs/AttributedChangedFile.md)
 - [Branch](docs/Branch.md)
 - [BranchChangeStats](docs/BranchChangeStats.md)
 - [BranchRequirementLinkProposal](docs/BranchRequirementLinkProposal.md)
 - [CancelAgentRunBody](docs/CancelAgentRunBody.md)
 - [CancelAgentRunResponse](docs/CancelAgentRunResponse.md)
 - [Change](docs/Change.md)
 - [ChangedFile](docs/ChangedFile.md)
 - [CodebaseContext](docs/CodebaseContext.md)
 - [CodebaseFile](docs/CodebaseFile.md)
 - [CompleteTestRunResponse](docs/CompleteTestRunResponse.md)
 - [Component](docs/Component.md)
 - [ComponentMergeModification](docs/ComponentMergeModification.md)
 - [ComponentResult](docs/ComponentResult.md)
 - [ComputeVerdictBody](docs/ComputeVerdictBody.md)
 - [ComputeVerdictResponse](docs/ComputeVerdictResponse.md)
 - [ConfirmSourceMapUploadResponse](docs/ConfirmSourceMapUploadResponse.md)
 - [ContextCitation](docs/ContextCitation.md)
 - [ContextTest](docs/ContextTest.md)
 - [Coverage](docs/Coverage.md)
 - [CoverageGap](docs/CoverageGap.md)
 - [CreateAgentConfigBody](docs/CreateAgentConfigBody.md)
 - [CreateAgentConfigResponse](docs/CreateAgentConfigResponse.md)
 - [CreateBranchBody](docs/CreateBranchBody.md)
 - [CreateBranchResponse](docs/CreateBranchResponse.md)
 - [CreateComponentBody](docs/CreateComponentBody.md)
 - [CreateComponentResponse](docs/CreateComponentResponse.md)
 - [CreateEnvironmentBody](docs/CreateEnvironmentBody.md)
 - [CreateEnvironmentResponse](docs/CreateEnvironmentResponse.md)
 - [CreateProductBody](docs/CreateProductBody.md)
 - [CreateProductResponse](docs/CreateProductResponse.md)
 - [CreateReleaseBody](docs/CreateReleaseBody.md)
 - [CreateReleaseResponse](docs/CreateReleaseResponse.md)
 - [CreateRequirementBody](docs/CreateRequirementBody.md)
 - [CreateRequirementResponse](docs/CreateRequirementResponse.md)
 - [CreateSourceMapUploadBody](docs/CreateSourceMapUploadBody.md)
 - [CreateSourceMapUploadResponse](docs/CreateSourceMapUploadResponse.md)
 - [CreateTestBody](docs/CreateTestBody.md)
 - [CreateTestResponse](docs/CreateTestResponse.md)
 - [CreateTestRunBody](docs/CreateTestRunBody.md)
 - [CreateTestRunResponse](docs/CreateTestRunResponse.md)
 - [CriterionDetail](docs/CriterionDetail.md)
 - [CriterionResult](docs/CriterionResult.md)
 - [CriterionStatus](docs/CriterionStatus.md)
 - [DeclareRequirementEdgeIntentBody](docs/DeclareRequirementEdgeIntentBody.md)
 - [DeclareRequirementEdgeIntentResponse](docs/DeclareRequirementEdgeIntentResponse.md)
 - [DeleteRequirementResponse](docs/DeleteRequirementResponse.md)
 - [DeriveTestLinksResponse](docs/DeriveTestLinksResponse.md)
 - [DistillIntentBody](docs/DistillIntentBody.md)
 - [DistillIntentResponse](docs/DistillIntentResponse.md)
 - [Environment](docs/Environment.md)
 - [FailingTest](docs/FailingTest.md)
 - [FeatureContext](docs/FeatureContext.md)
 - [FileAnchorCandidate](docs/FileAnchorCandidate.md)
 - [FixHint](docs/FixHint.md)
 - [GetAgentConfigResponse](docs/GetAgentConfigResponse.md)
 - [GetAgentRunResponse](docs/GetAgentRunResponse.md)
 - [GetBranchResponse](docs/GetBranchResponse.md)
 - [GetCurrentUserResponse](docs/GetCurrentUserResponse.md)
 - [GetEnvironmentResponse](docs/GetEnvironmentResponse.md)
 - [GetMergePreviewResponse](docs/GetMergePreviewResponse.md)
 - [GetProductResponse](docs/GetProductResponse.md)
 - [GetReleaseResponse](docs/GetReleaseResponse.md)
 - [GetRequirementGraphResponse](docs/GetRequirementGraphResponse.md)
 - [GetRequirementResponse](docs/GetRequirementResponse.md)
 - [GetRequirementTestContextResponse](docs/GetRequirementTestContextResponse.md)
 - [GetRunAttachmentResponse](docs/GetRunAttachmentResponse.md)
 - [GetRunResultResponse](docs/GetRunResultResponse.md)
 - [GetRunSummaryResponse](docs/GetRunSummaryResponse.md)
 - [GetTestResponse](docs/GetTestResponse.md)
 - [GetTestRunResponse](docs/GetTestRunResponse.md)
 - [GetTraceabilityResponse](docs/GetTraceabilityResponse.md)
 - [GetVerdictResponse](docs/GetVerdictResponse.md)
 - [GraphCoverageGapsResponse](docs/GraphCoverageGapsResponse.md)
 - [GraphEdge](docs/GraphEdge.md)
 - [GraphNode](docs/GraphNode.md)
 - [IngestError](docs/IngestError.md)
 - [IngestStats](docs/IngestStats.md)
 - [IngestSuiteSegment](docs/IngestSuiteSegment.md)
 - [IngestTest](docs/IngestTest.md)
 - [IngestTestsBody](docs/IngestTestsBody.md)
 - [IngestTestsResponse](docs/IngestTestsResponse.md)
 - [LinkRequirementBody](docs/LinkRequirementBody.md)
 - [ListAgentConfigsResponse](docs/ListAgentConfigsResponse.md)
 - [ListAgentRunEventsResponse](docs/ListAgentRunEventsResponse.md)
 - [ListAgentRunsResponse](docs/ListAgentRunsResponse.md)
 - [ListAgentTypesResponse](docs/ListAgentTypesResponse.md)
 - [ListBranchLinkProposalsResponse](docs/ListBranchLinkProposalsResponse.md)
 - [ListBranchesResponse](docs/ListBranchesResponse.md)
 - [ListComponentsResponse](docs/ListComponentsResponse.md)
 - [ListCoverageGapsResponse](docs/ListCoverageGapsResponse.md)
 - [ListEnvironmentsResponse](docs/ListEnvironmentsResponse.md)
 - [ListLinksResponse](docs/ListLinksResponse.md)
 - [ListProductsResponse](docs/ListProductsResponse.md)
 - [ListReleasesResponse](docs/ListReleasesResponse.md)
 - [ListRequirementAnchorsResponse](docs/ListRequirementAnchorsResponse.md)
 - [ListRequirementsResponse](docs/ListRequirementsResponse.md)
 - [ListRunResultsResponse](docs/ListRunResultsResponse.md)
 - [ListTestRunsResponse](docs/ListTestRunsResponse.md)
 - [ListTestsResponse](docs/ListTestsResponse.md)
 - [ListWorkspacesResponse](docs/ListWorkspacesResponse.md)
 - [LiveDocStats](docs/LiveDocStats.md)
 - [MatrixCell](docs/MatrixCell.md)
 - [MatrixComponent](docs/MatrixComponent.md)
 - [MatrixRequirement](docs/MatrixRequirement.md)
 - [MergeBranchBody](docs/MergeBranchBody.md)
 - [MergeBranchResponse](docs/MergeBranchResponse.md)
 - [MergeModification](docs/MergeModification.md)
 - [MergeStats](docs/MergeStats.md)
 - [NullValue](docs/NullValue.md)
 - [OnboardingAnswers](docs/OnboardingAnswers.md)
 - [OpenDefect](docs/OpenDefect.md)
 - [PaginationRequest](docs/PaginationRequest.md)
 - [PaginationResponse](docs/PaginationResponse.md)
 - [ParamGroup](docs/ParamGroup.md)
 - [PrepareTestGenerationContextBody](docs/PrepareTestGenerationContextBody.md)
 - [PrepareTestGenerationContextResponse](docs/PrepareTestGenerationContextResponse.md)
 - [PreparedTestGenerationContext](docs/PreparedTestGenerationContext.md)
 - [Product](docs/Product.md)
 - [ProductListSummary](docs/ProductListSummary.md)
 - [ProductSetupAgentStatus](docs/ProductSetupAgentStatus.md)
 - [ProductSetupState](docs/ProductSetupState.md)
 - [ProductWithSummary](docs/ProductWithSummary.md)
 - [Release](docs/Release.md)
 - [ReportError](docs/ReportError.md)
 - [ReportResultsBody](docs/ReportResultsBody.md)
 - [ReportResultsResponse](docs/ReportResultsResponse.md)
 - [Requirement](docs/Requirement.md)
 - [RequirementAnchor](docs/RequirementAnchor.md)
 - [RequirementImpactResponse](docs/RequirementImpactResponse.md)
 - [RequirementNeighborsResponse](docs/RequirementNeighborsResponse.md)
 - [RequirementRef](docs/RequirementRef.md)
 - [RequirementSource](docs/RequirementSource.md)
 - [RequirementSourceInput](docs/RequirementSourceInput.md)
 - [RequirementSourcesUpdate](docs/RequirementSourcesUpdate.md)
 - [RequirementTestContext](docs/RequirementTestContext.md)
 - [RequirementTestFields](docs/RequirementTestFields.md)
 - [ResolveFeatureContextResponse](docs/ResolveFeatureContextResponse.md)
 - [ResultCreate](docs/ResultCreate.md)
 - [ResultExecution](docs/ResultExecution.md)
 - [ResultStep](docs/ResultStep.md)
 - [ResultStepData](docs/ResultStepData.md)
 - [ResultStepExecution](docs/ResultStepExecution.md)
 - [ReviewBranchLinkProposalsBody](docs/ReviewBranchLinkProposalsBody.md)
 - [ReviewBranchLinkProposalsResponse](docs/ReviewBranchLinkProposalsResponse.md)
 - [RunCaseSummary](docs/RunCaseSummary.md)
 - [RunParamCombo](docs/RunParamCombo.md)
 - [RunStats](docs/RunStats.md)
 - [RunSuiteSummary](docs/RunSuiteSummary.md)
 - [SourceMap](docs/SourceMap.md)
 - [StaleCoverageSignal](docs/StaleCoverageSignal.md)
 - [StartAgentRunBody](docs/StartAgentRunBody.md)
 - [StartAgentRunResponse](docs/StartAgentRunResponse.md)
 - [Status](docs/Status.md)
 - [StepCode](docs/StepCode.md)
 - [StreamResultOfAgentRunEvent](docs/StreamResultOfAgentRunEvent.md)
 - [SubjectResult](docs/SubjectResult.md)
 - [SuiteSegment](docs/SuiteSegment.md)
 - [Test](docs/Test.md)
 - [TestExecution](docs/TestExecution.md)
 - [TestMergeModification](docs/TestMergeModification.md)
 - [TestParameter](docs/TestParameter.md)
 - [TestParameterGroup](docs/TestParameterGroup.md)
 - [TestRelation](docs/TestRelation.md)
 - [TestRequirementLink](docs/TestRequirementLink.md)
 - [TestRun](docs/TestRun.md)
 - [TestRunResult](docs/TestRunResult.md)
 - [TestStep](docs/TestStep.md)
 - [TouchedNode](docs/TouchedNode.md)
 - [TraceabilityMatrix](docs/TraceabilityMatrix.md)
 - [UpdateComponentBody](docs/UpdateComponentBody.md)
 - [UpdateComponentResponse](docs/UpdateComponentResponse.md)
 - [UpdateRequirementBody](docs/UpdateRequirementBody.md)
 - [UpdateRequirementResponse](docs/UpdateRequirementResponse.md)
 - [UpdateTestBody](docs/UpdateTestBody.md)
 - [UpdateTestResponse](docs/UpdateTestResponse.md)
 - [UpdateUserOnboardingRequest](docs/UpdateUserOnboardingRequest.md)
 - [UpdateUserOnboardingResponse](docs/UpdateUserOnboardingResponse.md)
 - [User](docs/User.md)
 - [UserOnboardingState](docs/UserOnboardingState.md)
 - [Verdict](docs/Verdict.md)
 - [VerdictScope](docs/VerdictScope.md)
 - [VerdictStatus](docs/VerdictStatus.md)
 - [VerifyProductSetupBody](docs/VerifyProductSetupBody.md)
 - [VerifyProductSetupResponse](docs/VerifyProductSetupResponse.md)
 - [Workspace](docs/Workspace.md)
 - [WriteRequirementEdgeBody](docs/WriteRequirementEdgeBody.md)
 - [WriteRequirementEdgeResponse](docs/WriteRequirementEdgeResponse.md)


<a id="documentation-for-authorization"></a>
## Documentation For Authorization


Authentication schemes defined for the API:
<a id="BearerAuth"></a>
### BearerAuth

- **Type**: API key
- **API key parameter name**: Authorization
- **Location**: HTTP header

