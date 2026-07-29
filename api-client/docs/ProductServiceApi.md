# ProductServiceApi

All URIs are relative to *https://api.tiden.ai*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**productServiceCreateProduct**](#productservicecreateproduct) | **POST** /v1/workspaces/{workspaceId}/products | Creates a product in a workspace.|
|[**productServiceGetProduct**](#productservicegetproduct) | **GET** /v1/products/{id} | Fetches one product by id.|
|[**productServiceListProducts**](#productservicelistproducts) | **GET** /v1/workspaces/{workspaceId}/products | Lists a workspace\&#39;s products.|
|[**productServiceVerifyProductSetup**](#productserviceverifyproductsetup) | **POST** /v1/products/{productId}/setup:verify | Records a CLI setup verification snapshot for the product.|

# **productServiceCreateProduct**
> CreateProductResponse productServiceCreateProduct(createProductBody)

A product is the top-level container for requirements, tests, runs, and releases. code becomes the reference prefix for entity sequence numbers (e.g. \"QA\" yields QA-1, QA-2). team_id makes the product team-owned; empty leaves it workspace-owned and visible to all workspace members.

### Example

```typescript
import {
    ProductServiceApi,
    Configuration,
    CreateProductBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new ProductServiceApi(configuration);

let workspaceId: string; // (default to undefined)
let createProductBody: CreateProductBody; //

const { status, data } = await apiInstance.productServiceCreateProduct(
    workspaceId,
    createProductBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createProductBody** | **CreateProductBody**|  | |
| **workspaceId** | [**string**] |  | defaults to undefined|


### Return type

**CreateProductResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful response. |  -  |
|**0** | An unexpected error response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **productServiceGetProduct**
> GetProductResponse productServiceGetProduct()

Lets the CLI / agents resolve a bound product\'s details (e.g. its name for `tiden doctor`) without paging the whole workspace list. Tenancy is enforced via the id\'s TENANT_ANCHOR_PRODUCT anchor.

### Example

```typescript
import {
    ProductServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new ProductServiceApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.productServiceGetProduct(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**GetProductResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful response. |  -  |
|**0** | An unexpected error response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **productServiceListProducts**
> ListProductsResponse productServiceListProducts()

Returns the products page twice: products (bare) and items — the same page wrapped with per-product rollups (requirement/test-case counts, open branches, activation state, last activity) for list pages. Paginated via pagination.page_size/page_token.

### Example

```typescript
import {
    ProductServiceApi,
    Configuration
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new ProductServiceApi(configuration);

let workspaceId: string; // (default to undefined)
let paginationPageSize: number; // (optional) (default to undefined)
let paginationPageToken: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.productServiceListProducts(
    workspaceId,
    paginationPageSize,
    paginationPageToken
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **workspaceId** | [**string**] |  | defaults to undefined|
| **paginationPageSize** | [**number**] |  | (optional) defaults to undefined|
| **paginationPageToken** | [**string**] |  | (optional) defaults to undefined|


### Return type

**ListProductsResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful response. |  -  |
|**0** | An unexpected error response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **productServiceVerifyProductSetup**
> VerifyProductSetupResponse productServiceVerifyProductSetup(verifyProductSetupBody)

Appends a per-user setup snapshot — repo fingerprint/binding, git-hook wiring, per-agent detected/wired statuses — stamped verified_at=now. repo_fingerprint is required; source defaults to \"cli\". The web onboarding checklist reads the latest snapshot.

### Example

```typescript
import {
    ProductServiceApi,
    Configuration,
    VerifyProductSetupBody
} from '@tiden/api-client';

const configuration = new Configuration();
const apiInstance = new ProductServiceApi(configuration);

let productId: string; // (default to undefined)
let verifyProductSetupBody: VerifyProductSetupBody; //

const { status, data } = await apiInstance.productServiceVerifyProductSetup(
    productId,
    verifyProductSetupBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **verifyProductSetupBody** | **VerifyProductSetupBody**|  | |
| **productId** | [**string**] |  | defaults to undefined|


### Return type

**VerifyProductSetupResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful response. |  -  |
|**0** | An unexpected error response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

