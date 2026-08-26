import axios, { AxiosInstance } from 'axios';

/**
 * Thin HTTP client for the Tiden REST API. Tiden authenticates with
 * `Authorization: Bearer` (tokens are `tfy_...`) and takes the base URL
 * verbatim — no self-host URL templating.
 *
 * This instance is the single transport for everything commons sends: the
 * narrow reporter API and multipart attachment upload both use it. baseURL,
 * auth and timeout therefore live here and nowhere else.
 */
export function createTidenClient(baseUrl: string, token: string): AxiosInstance {
  return axios.create({
    baseURL: baseUrl.replace(/\/$/, ''),
    headers: { Authorization: `Bearer ${token}` },
    timeout: 30_000,
  });
}
