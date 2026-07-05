import { createServer, IncomingMessage, Server, ServerResponse } from 'node:http';
import { AddressInfo } from 'node:net';
import { createTidenClient } from '../../../src/client/tiden-http';
import { RunService } from '../../../src/client/services/run-service';
import { LoggerInterface } from '../../../src/utils/logger';

const logger: LoggerInterface = { log: jest.fn(), logError: jest.fn(), logDebug: jest.fn() } as unknown as LoggerInterface;

function testServer(handler: (req: IncomingMessage, body: string, res: ServerResponse) => void): Promise<Server> {
  return new Promise((resolve) => {
    const srv = createServer((req, res) => {
      let body = '';
      req.on('data', (c: Buffer) => (body += c.toString()));
      req.on('end', () => handler(req, body, res));
    });
    srv.listen(0, '127.0.0.1', () => resolve(srv));
  });
}
const baseUrl = (srv: Server) => `http://127.0.0.1:${(srv.address() as AddressInfo).port}`;

describe('RunService against Tiden wire', () => {
  it('creates a run: POST /v1/products/{product}/runs with Bearer auth, flat configurations, and reads run.seqNum', async () => {
    let captured: { url?: string; auth?: string; body?: Record<string, unknown> } = {};
    const srv = await testServer((req, body, res) => {
      captured = { url: req.url ?? '', auth: req.headers.authorization ?? '', body: JSON.parse(body) as Record<string, unknown> };
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify({ run: { seqNum: 42, status: 'new' } }));
    });
    const http = createTidenClient(baseUrl(srv), 'tfy_token');
    const service = new RunService(logger, http);
    const runId = await service.createRun({
      project: 'a0000000-0000-4000-8000-000000000001',
      api: { token: 'tfy_token' },
      run: { title: 'nightly', description: 'd', complete: true, branch: 'main' },
      configurations: { values: [{ name: 'browser', value: 'chromium' }] },
      clientMeta: { framework: 'playwright' },
    } as never, 'staging');
    srv.close();
    expect(runId).toBe(42);
    expect(captured.url).toBe('/v1/products/a0000000-0000-4000-8000-000000000001/runs');
    expect(captured.auth).toBe('Bearer tfy_token');
    expect(captured.body).toMatchObject({
      title: 'nightly', description: 'd', environment: 'staging', branch: 'main',
      configurations: { browser: 'chromium' }, client_meta: { framework: 'playwright' },
    });
  });

  it('returns config.run.id without any HTTP call when preset (sharded CI)', async () => {
    const http = createTidenClient('http://127.0.0.1:9', 'tfy_token'); // unroutable — must not be called
    const service = new RunService(logger, http);
    const runId = await service.createRun({ project: 'p', api: { token: 't' }, run: { id: 7, complete: true } } as never, undefined);
    expect(runId).toBe(7);
  });

  it('completes a run via POST :complete and no-ops when run.complete is false', async () => {
    const calls: string[] = [];
    const srv = await testServer((req, _body, res) => {
      calls.push(req.url ?? '');
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify({ run: { seqNum: 42, status: 'passed' } }));
    });
    const http = createTidenClient(baseUrl(srv), 'tfy_token');
    const service = new RunService(logger, http);
    await service.completeRun(42, { project: 'p1', api: { token: 't' }, run: { complete: true } } as never);
    await service.completeRun(42, { project: 'p1', api: { token: 't' }, run: { complete: false } } as never);
    srv.close();
    expect(calls).toEqual(['/v1/products/p1/runs/42:complete']);
  });
});
