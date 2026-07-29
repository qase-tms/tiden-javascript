import axios, { AxiosInstance } from 'axios';
import { Configuration, TestRunServiceApi } from '@tiden/api-client';

/**
 * Thin HTTP client for the Tiden REST API. Tiden authenticates with
 * `Authorization: Bearer` (tokens are `tfy_...`) and takes the base URL
 * verbatim — no self-host URL templating.
 *
 * This instance is the single transport for everything commons sends: the
 * generated `@tiden/api-client` classes are constructed on top of it (see
 * `createTestRunApi`), and the one route with no generated operation
 * (multipart attachment upload) posts to it directly. baseURL, auth and
 * timeout therefore live here and nowhere else.
 */
export function createTidenClient(baseUrl: string, token: string): AxiosInstance {
  return axios.create({
    baseURL: baseUrl.replace(/\/$/, ''),
    headers: { Authorization: `Bearer ${token}` },
    timeout: 30_000,
  });
}

/**
 * Binds the generated `TestRunServiceApi` to an existing axios instance, so
 * generated calls inherit its baseURL, auth header and timeout instead of
 * opening a second, differently-configured transport.
 *
 * The generated `createRequestFunction` emits a *relative* URL whenever the
 * injected instance already carries `axios.defaults.baseURL`, so `basePath`
 * here only covers instances built without one. Auth is deliberately absent
 * from the `Configuration` (no `accessToken`): the instance's `Authorization`
 * header stays the single place the token lives, which also keeps token
 * masking in one place.
 */
export function createTestRunApi(http: AxiosInstance, baseUrl: string): TestRunServiceApi {
  const basePath = baseUrl.replace(/\/$/, '');
  return new TestRunServiceApi(new Configuration({ basePath }), basePath, http);
}
