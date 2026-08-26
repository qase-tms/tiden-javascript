import { expect } from '@jest/globals';
import { createTidenClient } from '../../src/client/tiden-http';

describe('createTidenClient', () => {
  it('owns baseURL, Bearer auth and the timeout, and strips a trailing slash', () => {
    const http = createTidenClient('https://app.tiden.ai/', 'tfy_secret');
    expect(http.defaults.baseURL).toBe('https://app.tiden.ai');
    expect(http.defaults.headers.Authorization).toBe('Bearer tfy_secret');
    expect(http.defaults.timeout).toBe(30_000);
  });
});
