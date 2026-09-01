/* eslint-disable */
import { describe, it, expect, beforeEach } from '@jest/globals';

import { tiden } from '../src/jest';

const bridge = {
  title: jest.fn(),
  ignore: jest.fn(),
  comment: jest.fn(),
  suite: jest.fn(),
  fields: jest.fn(),
  parameters: jest.fn(),
  groupParams: jest.fn(),
  tags: jest.fn(),
  step: jest.fn(),
  attachment: jest.fn(),
};

const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

beforeEach(() => {
  jest.clearAllMocks();
  Object.defineProperty(global, 'Tiden', { value: bridge, configurable: true, writable: true });
});

describe('tiden(caseId, name) — the worker-safe channel', () => {
  it('encodes a single id into the title', () => {
    expect(tiden(1, 'Login')).toBe('Login (Tiden ID: 1)');
  });

  it('encodes multiple ids', () => {
    expect(tiden([1, 2], 'Login')).toBe('Login (Tiden ID: 1,2)');
  });

  it('accepts string ids', () => {
    expect(tiden('7', 'Login')).toBe('Login (Tiden ID: 7)');
  });
});

describe('metadata helpers delegate to global.Tiden', () => {
  it('forwards the scalar helpers', () => {
    tiden.title('T');
    tiden.comment('C');
    tiden.suite('S');
    tiden.ignore();

    expect(bridge.title).toHaveBeenCalledWith('T');
    expect(bridge.comment).toHaveBeenCalledWith('C');
    expect(bridge.suite).toHaveBeenCalledWith('S');
    expect(bridge.ignore).toHaveBeenCalledTimes(1);
  });

  it('forwards records, and maps groupParameters onto groupParams', () => {
    tiden.fields({ severity: 'high' });
    tiden.parameters({ browser: 'chrome' });
    tiden.groupParameters({ shard: '1' });

    expect(bridge.fields).toHaveBeenCalledWith({ severity: 'high' });
    expect(bridge.parameters).toHaveBeenCalledWith({ browser: 'chrome' });
    expect(bridge.groupParams).toHaveBeenCalledWith({ shard: '1' });
  });

  it('collects variadic tags into an array', () => {
    tiden.tags('smoke', 'regression');
    expect(bridge.tags).toHaveBeenCalledWith(['smoke', 'regression']);
  });
});

describe('tiden.step', () => {
  it('runs the body and reports the step', async () => {
    const body = jest.fn();
    await tiden.step('Open page', body as any);

    expect(body).toHaveBeenCalledTimes(1);
    expect(bridge.step).toHaveBeenCalledTimes(1);
  });

  it('encodes the expected result and data into the step name', async () => {
    await tiden.step('Open page', (() => {}) as any, 'Page opens', 'url=/home');

    const reported = bridge.step.mock.calls[0]![0] as any;
    const action = reported.data.action as string;
    expect(action).toContain('Open page');
    expect(action).toContain('TidenExpRes:: Page opens');
    expect(action).toContain('TidenData:: url=/home');
  });
});

describe('tiden.attach', () => {
  it('attaches inline content with a generated UUID', () => {
    tiden.attach({ name: 'a.txt', content: 'hello', type: 'text/plain' });

    const attachment = bridge.attachment.mock.calls[0]![0] as any;
    expect(attachment.id).toMatch(UUID_V4);
    expect(attachment.file_name).toBe('a.txt');
    expect(attachment.mime_type).toBe('text/plain');
    expect(attachment.content).toBe('hello');
    expect(attachment.size).toBe(5);
    expect(attachment.file_path).toBeNull();
  });

  it('attaches files by path, one attachment each', () => {
    tiden.attach({ paths: ['/tmp/a.txt', '/tmp/b.png'] });

    expect(bridge.attachment).toHaveBeenCalledTimes(2);
    const first = bridge.attachment.mock.calls[0]![0] as any;
    expect(first.file_name).toBe('a.txt');
    expect(first.file_path).toBe('/tmp/a.txt');
    expect(first.id).toMatch(UUID_V4);
  });

  it('does nothing when given neither content nor paths', () => {
    tiden.attach({});
    expect(bridge.attachment).not.toHaveBeenCalled();
  });
});
