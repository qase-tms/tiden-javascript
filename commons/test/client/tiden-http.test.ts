/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any */
import { expect } from '@jest/globals';
import { InternalAxiosRequestConfig } from 'axios';
import { createTestRunApi, createTidenClient } from '../../src/client/tiden-http';
import { testServer, baseUrl } from '../helpers/test-server';

describe('createTidenClient', () => {
  it('owns baseURL, Bearer auth and the timeout, and strips a trailing slash', () => {
    const http = createTidenClient('https://app.tiden.ai/', 'tfy_secret');
    expect(http.defaults.baseURL).toBe('https://app.tiden.ai');
    expect(http.defaults.headers.Authorization).toBe('Bearer tfy_secret');
    expect(http.defaults.timeout).toBe(30_000);
  });
});

describe('createTestRunApi', () => {
  it('sends generated calls through the supplied instance (one transport, not globalAxios)', async () => {
    const seen: InternalAxiosRequestConfig[] = [];
    const srv = await testServer((_req, _body, res) => {
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify({ run: { seqNum: 3 } }));
    });
    const url = baseUrl(srv); // capture before close(): srv.address() is null after
    const http = createTidenClient(url, 'tfy_secret');
    // An interceptor on OUR instance only fires if the generated client really
    // uses it rather than the module-global axios.
    http.interceptors.request.use((cfg) => { seen.push(cfg); return cfg; });

    const api = createTestRunApi(http, url);
    await api.testRunServiceCompleteTestRun({ productId: 'p1', runSeq: 3, body: {} });
    srv.close();

    expect(seen).toHaveLength(1);
    expect(seen[0]!.headers.Authorization).toBe('Bearer tfy_secret');
    // Relative URL + the instance's baseURL (generated createRequestFunction
    // defers to axios.defaults.baseURL when one is set).
    expect(seen[0]!.url).toBe('/v1/products/p1/runs/3:complete');
    expect(seen[0]!.baseURL).toBe(url);
  });

  it('keeps the token out of the generated Configuration (single place for masking)', () => {
    const http = createTidenClient('https://app.tiden.ai', 'tfy_secret');
    const api: any = createTestRunApi(http, 'https://app.tiden.ai');
    expect(api.configuration.accessToken).toBeUndefined();
    expect(api.configuration.apiKey).toBeUndefined();
    expect(JSON.stringify(api.configuration)).not.toContain('tfy_secret');
    expect(api.configuration.basePath).toBe('https://app.tiden.ai');
  });
});
