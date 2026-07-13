import { createServer, IncomingMessage, Server, ServerResponse } from 'node:http';
import { AddressInfo } from 'node:net';

/**
 * Minimal HTTP test server: collects the request body as a string and hands
 * it to `handler` along with the raw request/response so tests can assert on
 * headers, URL, and JSON-decoded body.
 */
export function testServer(
  handler: (req: IncomingMessage, body: string, res: ServerResponse) => void,
): Promise<Server> {
  return new Promise((resolve) => {
    const srv = createServer((req, res) => {
      let body = '';
      req.on('data', (c: Buffer) => (body += c.toString()));
      req.on('end', () => handler(req, body, res));
    });
    srv.listen(0, '127.0.0.1', () => resolve(srv));
  });
}

/**
 * Same as `testServer`, but collects the request body as a raw `Buffer`
 * instead of decoding it to a string — needed for multipart/binary bodies
 * where string-concatenation would corrupt non-UTF8 bytes.
 */
export function testServerRaw(
  handler: (req: IncomingMessage, body: Buffer, res: ServerResponse) => void,
): Promise<Server> {
  return new Promise((resolve) => {
    const srv = createServer((req, res) => {
      const chunks: Buffer[] = [];
      req.on('data', (c: Buffer) => chunks.push(c));
      req.on('end', () => handler(req, Buffer.concat(chunks), res));
    });
    srv.listen(0, '127.0.0.1', () => resolve(srv));
  });
}

export const baseUrl = (srv: Server): string => `http://127.0.0.1:${(srv.address() as AddressInfo).port}`;
