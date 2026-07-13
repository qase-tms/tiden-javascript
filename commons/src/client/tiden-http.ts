import axios, { AxiosInstance } from 'axios';

/**
 * Thin HTTP client for the Tiden REST API. Replaces the previously
 * generated REST API client packages: Tiden authenticates with
 * `Authorization: Bearer` (tokens are `tfy_...`) and takes the base URL
 * verbatim — no self-host URL templating.
 */
export function createTidenClient(baseUrl: string, token: string): AxiosInstance {
  return axios.create({
    baseURL: baseUrl.replace(/\/$/, ''),
    headers: { Authorization: `Bearer ${token}` },
    timeout: 30_000,
  });
}
