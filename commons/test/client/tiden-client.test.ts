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

describe('TidenApiClient wire contract (narrow reporter transport over the shared axios instance)', () => {
  /**
   * These lock the reporter transport request on the wire: path/auth plus the
   * OpenAPI `ResultCreate` field names/types (lowerCamelCase, int64 `duration`
   * as a string).
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
    // Auth comes from the axios instance, so the token lives in one place.
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

describe('TidenApiClient identity fallback', () => {
  const IDENTITY = { language: 'js', repository: 'git@github.com:acme/shop.git', scope: ['src/a.test.ts'], name: ['a', 'b'] };
  const UNKNOWN_IDENTITY_BODY = {
    code: 3,
    message: 'proto: (line 1:412): unknown field "identity"',
    details: [],
  };

  type SentResult = Record<string, unknown>;

  /** Records every posted batch; answers each with `respond(callNumber)`. */
  async function recordingServer(
    respond: (call: number) => { status: number; body: unknown },
  ): Promise<{ srv: Server; batches: SentResult[][] }> {
    const batches: SentResult[][] = [];
    const srv = await testServer((_req, body, res) => {
      batches.push((JSON.parse(body) as { results: SentResult[] }).results);
      const { status, body: payload } = respond(batches.length);
      res.statusCode = status;
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify(payload));
    });
    return { srv, batches };
  }

  const ok = { status: 200, body: { status: true, accepted: '2', duplicates: '0', errors: [] } };

  it('sends identity next to the legacy signature', async () => {
    const { srv, batches } = await recordingServer(() => ok);

    await makeClient(srv).uploadResults(7, [makeResult({ id: 'r1', identity: IDENTITY })]);
    srv.close();

    expect(batches).toHaveLength(1);
    expect(batches[0]?.[0]).toMatchObject({ id: 'r1', signature: 'sig-1', identity: IDENTITY });
  });

  it('omits identity for a result that has none', async () => {
    const { srv, batches } = await recordingServer(() => ok);

    await makeClient(srv).uploadResults(7, [makeResult({ id: 'r1' })]);
    srv.close();

    expect(Object.keys(batches[0]?.[0] ?? {})).not.toContain('identity');
  });

  it('resends the same batch with the same ids and without identity when the server does not know the field', async () => {
    const { srv, batches } = await recordingServer((call) =>
      call === 1 ? { status: 400, body: UNKNOWN_IDENTITY_BODY } : ok);

    await makeClient(srv).uploadResults(7, [
      makeResult({ id: 'r1', identity: IDENTITY }),
      makeResult({ id: 'r2', identity: IDENTITY }),
    ]);
    srv.close();

    expect(batches).toHaveLength(2);
    expect(batches[0]?.map((r) => r['id'])).toEqual(['r1', 'r2']);
    expect(batches[0]?.every((r) => r['identity'] !== undefined)).toBe(true);
    expect(batches[1]?.map((r) => r['id'])).toEqual(['r1', 'r2']);
    expect(batches[1]?.some((r) => 'identity' in r)).toBe(false);
    // Everything else is the same request: the signature still identifies the test.
    expect(batches[1]?.[0]).toMatchObject({ signature: 'sig-1', title: 'Test case' });
  });

  it('stops sending identity for the rest of the process after the server rejected it', async () => {
    const { srv, batches } = await recordingServer((call) =>
      call === 1 ? { status: 400, body: UNKNOWN_IDENTITY_BODY } : ok);
    const client = makeClient(srv);

    await client.uploadResults(7, [makeResult({ id: 'r1', identity: IDENTITY })]);
    await client.uploadResults(7, [makeResult({ id: 'r2', identity: IDENTITY })]);
    srv.close();

    expect(batches).toHaveLength(3); // rejected, resent, then straight to the plain request
    expect(batches[2]?.map((r) => r['id'])).toEqual(['r2']);
    expect('identity' in (batches[2]?.[0] ?? {})).toBe(false);
  });

  it('recognises the error when the text is a plain-string body', async () => {
    const { srv, batches } = await recordingServer((call) =>
      call === 1 ? { status: 400, body: 'proto: (line 1:9): unknown field "identity"' } : ok);

    await makeClient(srv).uploadResults(7, [makeResult({ id: 'r1', identity: IDENTITY })]);
    srv.close();

    expect(batches).toHaveLength(2);
  });

  it('treats a 400 about another field as a real error and does not resend', async () => {
    const { srv, batches } = await recordingServer(() => ({
      status: 400,
      body: { code: 3, message: 'proto: (line 1:9): unknown field "idenity"', details: [] },
    }));

    await expect(makeClient(srv).uploadResults(7, [makeResult({ id: 'r1', identity: IDENTITY })])).rejects.toThrow();
    srv.close();

    expect(batches).toHaveLength(1);
  });

  it('treats a validation 400 as a real error and keeps identity for the next batch', async () => {
    const { srv, batches } = await recordingServer((call) =>
      call === 1
        ? { status: 400, body: { code: 3, message: 'REPORT_VALIDATION: 1 result entries rejected', details: [] } }
        : ok);
    const client = makeClient(srv);

    await expect(client.uploadResults(7, [makeResult({ id: 'r1', identity: IDENTITY })])).rejects.toThrow();
    await client.uploadResults(7, [makeResult({ id: 'r2', identity: IDENTITY })]);
    srv.close();

    expect(batches).toHaveLength(2);
    expect(batches[1]?.[0]?.['identity']).toEqual(IDENTITY);
  });

  it('does not resend when the batch carried no identity, even if the server says the field is unknown', async () => {
    const { srv, batches } = await recordingServer(() => ({ status: 400, body: UNKNOWN_IDENTITY_BODY }));

    await expect(makeClient(srv).uploadResults(7, [makeResult({ id: 'r1' })])).rejects.toThrow();
    srv.close();

    expect(batches).toHaveLength(1);
  });

  it('still fails when the resend without identity is rejected too', async () => {
    const { srv, batches } = await recordingServer((call) =>
      call === 1
        ? { status: 400, body: UNKNOWN_IDENTITY_BODY }
        : { status: 400, body: { code: 3, message: 'REPORT_VALIDATION: bad', details: [] } });

    await expect(makeClient(srv).uploadResults(7, [makeResult({ id: 'r1', identity: IDENTITY })])).rejects.toThrow();
    srv.close();

    expect(batches).toHaveLength(2);
  });
});
