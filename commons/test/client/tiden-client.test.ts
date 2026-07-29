/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return */
import { expect } from '@jest/globals';
import { Server } from 'node:http';
import { TidenApiClient } from '../../src/client/tiden-client';
import { LoggerInterface } from '../../src/utils/logger';
import { TestResultType } from '../../src/models';
import { testServer, baseUrl } from '../helpers/test-server';

const logger: LoggerInterface = { log: jest.fn(), logError: jest.fn(), logDebug: jest.fn() } as unknown as LoggerInterface;

function makeClient(srv: Server): TidenApiClient {
  return new TidenApiClient(
    logger,
    { product: 'p1', api: { token: 'tfy_t', baseUrl: baseUrl(srv) }, run: { complete: true } } as never,
    undefined,
    undefined,
  );
}

function makeResult(overrides: Partial<any> = {}): TestResultType {
  return {
    title: 'Test case',
    case_id: 1,
    execution: {
      status: 'passed',
      start_time: 1000,
      end_time: 2000,
      duration: 1000,
      stacktrace: null,
      thread: 'main',
    },
    attachments: [],
    preparedAttachments: [],
    steps: [],
    params: {},
    group_params: {},
    relations: null,
    message: null,
    fields: {},
    tags: [],
    signature: 'sig-1',
    ...overrides,
  } as unknown as TestResultType;
}

describe('TidenApiClient wire contract (generated @tiden/api-client over the shared axios instance)', () => {
  /**
   * These lock the request the generated client actually puts on the wire:
   * the same path/auth the hand-written layer used, and the generated
   * `ResultCreate` field names/types (lowerCamelCase, int64 `duration` as a
   * string). Verified against the live API before the switch.
   */
  it('reports to the same path with the instance Bearer auth, and only that one auth header', async () => {
    let captured: { url?: string; auth?: unknown; method?: string; contentType?: unknown } = {};
    const srv = await testServer((req, _body, res) => {
      captured = {
        url: req.url ?? '',
        auth: req.headers.authorization,
        method: req.method ?? '',
        contentType: req.headers['content-type'],
      };
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify({ status: true, accepted: '1', duplicates: '0', errors: [] }));
    });
    await makeClient(srv).uploadResults(7, [makeResult({ id: 'uuid-a' })]);
    srv.close();
    expect(captured.method).toBe('POST');
    expect(captured.url).toBe('/v1/products/p1/runs/7/results:report');
    // Auth comes from the axios instance only — the generated Configuration is
    // built without an accessToken, so the token lives in exactly one place.
    expect(captured.auth).toBe('Bearer tfy_t');
    expect(String(captured.contentType)).toContain('application/json');
  });

  it('serializes results with the generated camelCase field names and int64 duration as a string', async () => {
    let sent: any;
    const srv = await testServer((_req, body, res) => {
      sent = JSON.parse(body);
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify({ status: true, accepted: '1', duplicates: '0', errors: [] }));
    });
    await makeClient(srv).uploadResults(7, [makeResult({
      id: 'uuid-shape',
      case_id: [4, 5],
      params: { browser: 'chromium' },
      group_params: { browser: 'chromium' },
      relations: { suite: { data: [{ title: 'Checkout', public_id: null }] } },
      steps: [{
        id: 's1',
        step_type: 'text',
        data: { action: 'Click', expected_result: 'opened', data: 'input' },
        execution: { status: 'passed' },
        attachments: [],
        steps: [],
      }],
    })]);
    srv.close();
    const r = sent.results[0];
    expect(r.testopsIds).toEqual([4, 5]);
    expect(r.suitePath).toEqual([{ title: 'Checkout' }]);
    expect(r.paramGroups).toEqual([{ names: ['browser'] }]);
    expect(r.execution.duration).toBe('1000');   // int64 → string
    expect(r.execution.startTime).toBe(1000);    // double stays a number
    expect(r.steps[0].data.expectedResult).toBe('opened');
    expect(r.steps[0].data.inputData).toBe('input');
    // Nothing snake_case leaks onto the API wire any more.
    expect(Object.keys(r)).not.toContain('testops_ids');
    expect(Object.keys(r)).not.toContain('param_groups');
    expect(Object.keys(r)).not.toContain('suite_path');
  });

  it('logs the server-side accepted/duplicates counts (idempotency: dedupe is the server recognising a repeated result id)', async () => {
    const srv = await testServer((_req, _body, res) => {
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify({ status: true, accepted: '0', duplicates: '2', errors: [] }));
    });
    (logger.logDebug as jest.Mock).mockClear();
    await makeClient(srv).uploadResults(7, [makeResult({ id: 'dup-1' }), makeResult({ id: 'dup-2' })]);
    srv.close();
    expect((logger.logDebug as jest.Mock).mock.calls.flat().join('\n'))
      .toContain('accepted=0 duplicates=2');
  });
});

describe('TidenApiClient', () => {
  it('posts results to results:report and parses string accepted counts', async () => {
    const bodies: Record<string, unknown>[] = [];
    const srv = await testServer((req, body, res) => {
      bodies.push(JSON.parse(body) as Record<string, unknown>);
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify({ status: true, accepted: '2', duplicates: '0', errors: [] }));
    });
    const client = makeClient(srv);
    const result1 = makeResult({ id: 'uuid-1' });
    const result2 = makeResult({ id: 'uuid-2' });
    await client.uploadResults(42, [result1, result2]);
    srv.close();
    expect(bodies).toHaveLength(1);
    const results = bodies[0]?.['results'] as unknown[];
    expect(results.length).toBe(2);
    expect((results[0] as Record<string, unknown>).id).toBe('uuid-1');
    expect((results[1] as Record<string, unknown>).id).toBe('uuid-2');
  });

  it('retries only on 429 and honors Retry-After', async () => {
    let calls = 0;
    const srv = await testServer((_req, _body, res) => {
      calls++;
      if (calls === 1) { res.statusCode = 429; res.setHeader('retry-after', '0'); res.end('{}'); return; }
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify({ status: true, accepted: '1', duplicates: '0', errors: [] }));
    });
    const client = makeClient(srv);
    await client.uploadResults(42, [makeResult({})]);
    srv.close();
    expect(calls).toBe(2);
  });

  it('treats 400 as terminal and logs each ReportError detail', async () => {
    let calls = 0;
    const srv = await testServer((_req, _body, res) => {
      calls++;
      res.statusCode = 400;
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify({
        code: 3, message: 'REPORT_VALIDATION: 1 result entries rejected',
        details: [{ '@type': 'type.googleapis.com/api.v1.ReportError', index: 0, resultId: '', code: 'INVALID_TITLE', message: 'title is required' }],
      }));
    });
    const client = makeClient(srv);
    await expect(client.uploadResults(42, [makeResult({ title: '' })])).rejects.toThrow();
    srv.close();
    expect(calls).toBe(1); // no retry on 400
    expect((logger.logError as jest.Mock).mock.calls.flat().join('\n')).toContain('INVALID_TITLE');
  });
});
