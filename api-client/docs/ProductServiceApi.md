# ProductServiceApi

All URIs are relative to *https://api.tiden.ai*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**productServiceCreateProduct**](#productservicecreateproduct) | **POST** /v1/workspaces/{workspaceId}/products | |
|[**productServiceGetProduct**](#productservicegetproduct) | **GET** /v1/products/{id} | GetProduct fetches one product by id so the CLI / agents can resolve a bound product\&#39;s details (e.g. its name for &#x60;tiden doctor&#x60;) without paging the whole workspace list. Tenancy is enforced via the id\&#39;s TENANT_ANCHOR_PRODUCT anchor.|
|[**productServiceListProducts**](#productservicelistproducts) | **GET** /v1/workspaces/{workspaceId}/products | |
|[**productServiceVerifyProductSetup**](#productserviceverifyproductsetup) | **POST** /v1/products/{productId}/setup:verify | |

# **productServiceCreateProduct**
> CreateProductResponse productServiceCreateProduct(createProductBody)


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

