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

describe('TidenApiClient', () => {
  it('posts results to results:report and parses string accepted counts', async () => {
    const bodies: Record<string, unknown>[] = [];
    const srv = await testServer((req, body, res) => {
      bodies.push(JSON.parse(body) as Record<string, unknown>);
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify({ status: true, accepted: '2', duplicates: '0', errors: [] }));
    });
    const client = makeClient(srv);
    await client.uploadResults(42, [makeResult({}), makeResult({})]);
    srv.close();
    expect(bodies).toHaveLength(1);
    expect((bodies[0]?.['results'] as unknown[]).length).toBe(2);
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
