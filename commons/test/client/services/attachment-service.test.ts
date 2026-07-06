/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any, @typescript-eslint/unbound-method */
import { expect } from '@jest/globals';
import { AxiosInstance } from 'axios';
import { AttachmentService } from '../../../src/client/services/attachment-service';
import { createTidenClient } from '../../../src/client/tiden-http';
import { LoggerInterface } from '../../../src/utils/logger';
import { Attachment } from '../../../src/models';
import { testServerRaw, baseUrl } from '../../helpers/test-server';

const silentLogger = (): jest.Mocked<LoggerInterface> => ({
  log: jest.fn(),
  logDebug: jest.fn(),
  logError: jest.fn(),
});

function mockHttp() {
  return {
    post: jest.fn(),
  };
}

function makeAttachment(overrides: Partial<Attachment> = {}): Attachment {
  return {
    file_name: 'test.png',
    mime_type: 'image/png',
    content: Buffer.from('test-content'),
    size: 12,
    ...overrides,
  } as Attachment;
}

describe('AttachmentService', () => {
  let logger: jest.Mocked<LoggerInterface>;
  let http: ReturnType<typeof mockHttp>;
  let service: AttachmentService;

  beforeEach(() => {
    logger = silentLogger();
    http = mockHttp();
    service = new AttachmentService(logger, http as unknown as AxiosInstance);
  });

  describe('uploadAttachment', () => {
    it('should upload a single attachment and return hash', async () => {
      http.post.mockResolvedValue({
        data: { result: [{ hash: 'abc123' }] },
      });

      const result = await service.uploadAttachment('PROJ', makeAttachment());
      expect(result).toBe('abc123');
    });

    it('should return empty string when no hash in response', async () => {
      http.post.mockResolvedValue({
        data: { result: [{}] },
      });

      const result = await service.uploadAttachment('PROJ', makeAttachment());
      expect(result).toBe('');
    });

    it('uploads multipart file[] parts and returns result[].hash', async () => {
      let contentType = '';
      let rawBody: Buffer = Buffer.alloc(0);
      const srv = await testServerRaw((req, body, res) => {
        contentType = req.headers['content-type'] ?? '';
        rawBody = body;
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify({ status: true, result: [{ hash: 'abc123def4567890', filename: 'a.txt' }] }));
      });
      const realHttp = createTidenClient(baseUrl(srv), 'tfy_token');
      const realService = new AttachmentService(logger, realHttp);
      const hash = await realService.uploadAttachment('prod-1', {
        // Note: content must not be all-base64-alphabet (e.g. a bare "hello"
        // would be sniffed as base64 and decoded to different bytes); the
        // space keeps it on the plain-utf8 path so the literal text round-trips.
        id: 'att-1', file_name: 'a.txt', mime_type: 'text/plain', content: 'hello world', file_path: null, size: 11,
      } as never);
      srv.close();
      expect(hash).toBe('abc123def4567890');
      expect(contentType).toContain('multipart/form-data');
      expect(rawBody.toString()).toContain('name="file[]"');
      expect(rawBody.toString()).toContain('filename="a.txt"');
      expect(rawBody.toString()).toContain('hello');
    });

    it('declares the attachment mime_type as the part Content-Type even when the filename extension would not infer it', async () => {
      let rawBody: Buffer = Buffer.alloc(0);
      const srv = await testServerRaw((req, body, res) => {
        rawBody = body;
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify({ status: true, result: [{ hash: 'abc123def4567890', filename: 'shot.bin' }] }));
      });
      const realHttp = createTidenClient(baseUrl(srv), 'tfy_token');
      const realService = new AttachmentService(logger, realHttp);
      const hash = await realService.uploadAttachment('prod-1', {
        id: 'att-1', file_name: 'shot.bin', mime_type: 'image/png', content: 'hello', file_path: null, size: 5,
      } as never);
      srv.close();
      expect(hash).toBe('abc123def4567890');
      expect(rawBody.toString()).toContain('filename="shot.bin"');
      expect(rawBody.toString()).toContain('Content-Type: image/png');
    });
  });

  describe('uploadAttachments', () => {
    it('should return empty array when uploadAttachments disabled', async () => {
      const result = await service.uploadAttachments('PROJ', [makeAttachment()], false);
      expect(result).toEqual([]);
      expect(http.post).not.toHaveBeenCalled();
    });

    it('should skip null/undefined attachments', async () => {
      http.post.mockResolvedValue({
        data: { result: [{ hash: 'h1' }] },
      });

      const result = await service.uploadAttachments('PROJ', [null as any, makeAttachment()], true);
      expect(result).toEqual(['h1']);
    });

    it('should skip oversized attachments (> 32 MB)', async () => {
      http.post.mockResolvedValue({
        data: { result: [{ hash: 'h1' }] },
      });

      const bigAttachment = makeAttachment({ size: 33 * 1024 * 1024 });
      const normalAttachment = makeAttachment({ size: 100 });

      const result = await service.uploadAttachments('PROJ', [bigAttachment, normalAttachment], true);
      expect(result).toEqual(['h1']);
      expect(logger.logError).toHaveBeenCalledWith(expect.stringContaining('exceeds maximum file size'));
    });

    it('should batch attachments respecting MAX_FILES_PER_REQUEST limit', async () => {
      http.post.mockResolvedValue({
        data: { result: [{ hash: 'h' }] },
      });

      // Create 25 attachments — should result in 2 batches (20 + 5)
      const attachments = Array.from({ length: 25 }, (_, i) =>
        makeAttachment({ file_name: `file${i}.png`, size: 100 })
      );

      await service.uploadAttachments('PROJ', attachments, true);
      expect(http.post).toHaveBeenCalledTimes(2);
    });

    it('should retry on 429 errors with exponential backoff', async () => {
      const axiosError: any = new Error('Too Many Requests');
      axiosError.isAxiosError = true;
      axiosError.response = { status: 429, headers: { 'retry-after': '1' }, data: {} };

      http.post
        .mockRejectedValueOnce(axiosError)
        .mockResolvedValueOnce({ data: { result: [{ hash: 'h1' }] } });

      const result = await service.uploadAttachments('PROJ', [makeAttachment()], true);
      expect(result).toEqual(['h1']);
      expect(http.post).toHaveBeenCalledTimes(2);
    });

    it('should continue with next batch if current batch fails with non-429 error', async () => {
      const nonRetryableError: any = new Error('Server Error');
      nonRetryableError.isAxiosError = true;
      nonRetryableError.response = { status: 500, headers: {}, data: {} };

      http.post
        .mockRejectedValueOnce(nonRetryableError)
        .mockResolvedValueOnce({ data: { result: [{ hash: 'h2' }] } });

      // 2 batches: first will fail, second should succeed
      const batch1 = Array.from({ length: 20 }, (_, i) =>
        makeAttachment({ file_name: `a${i}.png`, size: 100 })
      );
      const batch2 = [makeAttachment({ file_name: 'b.png', size: 100 })];

      const result = await service.uploadAttachments('PROJ', [...batch1, ...batch2], true);
      expect(result).toEqual(['h2']);
      expect(logger.logError).toHaveBeenCalledWith(expect.stringContaining('Cannot upload batch 1'), expect.anything());
    });

    it('should calculate size from file content when size is 0', async () => {
      http.post.mockResolvedValue({
        data: { result: [{ hash: 'h1' }] },
      });

      const attachment = makeAttachment({ size: 0, content: Buffer.from('hello') });
      const result = await service.uploadAttachments('PROJ', [attachment], true);
      expect(result).toEqual(['h1']);
    });

    it('should return empty array when all attachments are invalid', async () => {
      const result = await service.uploadAttachments('PROJ', [makeAttachment({ size: 0, content: undefined, file_path: undefined })], true);
      expect(result).toEqual([]);
    });
  });
});
