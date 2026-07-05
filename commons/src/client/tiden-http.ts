import axios, { AxiosInstance } from 'axios';

/**
 * Thin HTTP client for the Tiden REST API. Replaces the generated Qase
 * API client packages: Tiden authenticates with `Authorization: Bearer`
 * (tokens are `tfy_...`) and takes the base URL verbatim — no
 * qase.io/self-host URL templating.
 */
export function createTidenClient(baseUrl: string, token: string): AxiosInstance {
  return axios.create({
    baseURL: baseUrl.replace(/\/$/, ''),
    headers: { Authorization: `Bearer ${token}` },
    timeout: 30_000,
  });
}
