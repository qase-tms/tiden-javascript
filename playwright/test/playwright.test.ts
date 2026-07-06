/* eslint-disable */
import { expect } from '@jest/globals';

// Mock Playwright test functions
const testInfoMock = {
  attach: jest.fn().mockResolvedValue(undefined),
};

const testStepMock = jest.fn().mockImplementation((_, fn) => {
  if (fn) {
    return fn().catch(() => {});
  }
  return Promise.resolve();
});

const testMock = {
  info: jest.fn(() => testInfoMock),
  step: testStepMock,
};

// Mock the entire playwright module
jest.mock('playwright/test', () => ({
  __esModule: true,
  default: testMock,
}));

// Mock uuid
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid'),
}));

// Mock @tiden/reporter-commons
jest.mock('@tiden/reporter-commons', () => ({
  getMimeTypes: jest.fn(() => 'text/plain'),
  TestStatusEnum: {
    passed: 'passed',
    failed: 'failed',
    skipped: 'skipped',
    disabled: 'disabled',
    timedOut: 'failed',
    interrupted: 'failed',
    invalid: 'invalid',
  },
  StepStatusEnum: {
    passed: 'passed',
    failed: 'failed',
  },
  StepType: {
    TEXT: 'text',
  },
}));

// Mock path
jest.mock('path', () => ({
  basename: jest.fn((filePath) => {
    const parts = filePath.split('/');
    return parts[parts.length - 1];
  }),
}));

// Now import the tiden function
import { tiden } from '../src/playwright';

describe('tiden API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('tiden', () => {
    it('should return test name with single number ID', () => {
      const result = tiden(123, 'Test Name');
      expect(result).toBe('Test Name (Tiden ID: 123)');
    });

    it('should return test name with multiple number IDs', () => {
      const result = tiden([123, 456], 'Test Name');
      expect(result).toBe('Test Name (Tiden ID: 123,456)');
    });

    it('should return test name with string IDs', () => {
      const result = tiden('123', 'Test Name');
      expect(result).toBe('Test Name (Tiden ID: 123)');
    });

    it('should log warning for invalid string ID', () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      const result = tiden('invalid', 'Test Name');
      expect(result).toBe('Test Name (Tiden ID: invalid)');
      expect(logSpy).toHaveBeenCalledWith('tiden: ID invalid should be a number');
      logSpy.mockRestore();
    });
  });

  describe('tiden.title', () => {
    it('should call test.info().attach with title metadata', () => {
      tiden.title('Custom Title');
      expect(testInfoMock.attach).toHaveBeenCalledWith('tiden-metadata.json', {
        contentType: 'application/tiden.metadata+json',
        body: Buffer.from(JSON.stringify({ title: 'Custom Title' }), 'utf8'),
      });
    });
  });

  describe('tiden.fields', () => {
    it('should call test.info().attach with fields metadata', () => {
      tiden.fields({ field1: 'value1', field2: '2' });
      expect(testInfoMock.attach).toHaveBeenCalledWith('tiden-metadata.json', {
        contentType: 'application/tiden.metadata+json',
        body: Buffer.from(JSON.stringify({ fields: { field1: 'value1', field2: '2' } }), 'utf8'),
      });
    });
  });

  describe('tiden.parameters', () => {
    it('should call test.info().attach with parameters metadata', () => {
      tiden.parameters({ param1: 'value1', param2: '2' });
      expect(testInfoMock.attach).toHaveBeenCalledWith('tiden-metadata.json', {
        contentType: 'application/tiden.metadata+json',
        body: Buffer.from(JSON.stringify({ parameters: { param1: 'value1', param2: '2' } }), 'utf8'),
      });
    });
  });

  describe('tiden.groupParameters', () => {
    it('should call test.info().attach with groupParams metadata', () => {
      tiden.groupParameters({ group1: 'value1', group2: '2' });
      expect(testInfoMock.attach).toHaveBeenCalledWith('tiden-metadata.json', {
        contentType: 'application/tiden.metadata+json',
        body: Buffer.from(JSON.stringify({ groupParams: { group1: 'value1', group2: '2' } }), 'utf8'),
      });
    });
  });

  describe('tiden.tags', () => {
    it('should call test.info().attach with tags metadata', () => {
      tiden.tags('smoke', 'regression');
      expect(testInfoMock.attach).toHaveBeenCalledWith('tiden-metadata.json', {
        contentType: 'application/tiden.metadata+json',
        body: Buffer.from(JSON.stringify({ tags: ['smoke', 'regression'] }), 'utf8'),
      });
    });
  });

  describe('tiden.attach', () => {
    it('should call test.step and test.info().attach for content', () => {
      tiden.attach({ name: 'file.txt', content: 'data', contentType: 'text/plain' });
      expect(testStepMock).toHaveBeenCalledWith('step_attach_body_mock-uuid_file.txt', expect.any(Function));
    });

    it('should call test.step and test.info().attach for file path', () => {
      tiden.attach({ paths: '/path/to/file.txt' });
      expect(testStepMock).toHaveBeenCalledWith('step_attach_file_mock-uuid_file.txt', expect.any(Function));
    });

    it('should call test.step and test.info().attach for multiple file paths', () => {
      tiden.attach({ paths: ['/path/to/file1.txt', '/path/to/file2.pdf'] });
      expect(testStepMock).toHaveBeenCalledWith('step_attach_file_mock-uuid_file1.txt', expect.any(Function));
      expect(testStepMock).toHaveBeenCalledWith('step_attach_file_mock-uuid_file2.pdf', expect.any(Function));
    });
  });

  describe('tiden.ignore', () => {
    it('should call test.info().attach with ignore metadata', () => {
      tiden.ignore();
      expect(testInfoMock.attach).toHaveBeenCalledWith('tiden-metadata.json', {
        contentType: 'application/tiden.metadata+json',
        body: Buffer.from(JSON.stringify({ ignore: true }), 'utf8'),
      });
    });
  });

  describe('tiden.suite', () => {
    it('should call test.info().attach with suite metadata', () => {
      tiden.suite('Test Suite');
      expect(testInfoMock.attach).toHaveBeenCalledWith('tiden-metadata.json', {
        contentType: 'application/tiden.metadata+json',
        body: Buffer.from(JSON.stringify({ suite: 'Test Suite' }), 'utf8'),
      });
    });
  });

  describe('tiden.comment', () => {
    it('should call test.info().attach with comment metadata', () => {
      tiden.comment('Test Comment');
      expect(testInfoMock.attach).toHaveBeenCalledWith('tiden-metadata.json', {
        contentType: 'application/tiden.metadata+json',
        body: Buffer.from(JSON.stringify({ comment: 'Test Comment' }), 'utf8'),
      });
    });
  });

  describe('tiden.step', () => {
    it('should return formatted step string with action only', () => {
      const result = tiden.step('Click button', undefined, undefined);
      expect(result).toBe('Click button TidenExpRes: TidenData:');
    });

    it('should return formatted step string with action and expected result', () => {
      const result = tiden.step('Click button', 'Button should be clicked', undefined);
      expect(result).toBe('Click button TidenExpRes:: Button should be clicked TidenData:');
    });

    it('should return formatted step string with action, expected result and data', () => {
      const result = tiden.step('Click button', 'Button should be clicked', 'Button data');
      expect(result).toBe('Click button TidenExpRes:: Button should be clicked TidenData:: Button data');
    });

    it('should accept a single action argument (optional params omitted)', () => {
      const result = tiden.step('Click button');
      expect(result).toBe('Click button TidenExpRes: TidenData:');
    });

    it('should accept action and expected result without data', () => {
      const result = tiden.step('Click button', 'Button should be clicked');
      expect(result).toBe('Click button TidenExpRes:: Button should be clicked TidenData:');
    });
  });

  describe('tiden with non-positive ID (regression test)', () => {
    it('drops zero before passing to PlaywrightTidenReporter.addIds, title is preserved for back-compat', () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
      const title = tiden(0, 'Test Name');
      expect(title).toBe('Test Name (Tiden ID: 0)'); // unchanged
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('0'));
      warn.mockRestore();
    });

    it('keeps positive IDs and drops zero from a mixed list, title uses original IDs', () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
      const title = tiden([1, 0, 2], 'Test Name');
      expect(title).toBe('Test Name (Tiden ID: 1,0,2)');
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('0'));
      warn.mockRestore();
    });
  });

  describe('tiden.id with non-positive ID (regression test)', () => {
    it('does not attach metadata when ID is zero', () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
      testInfoMock.attach.mockClear();
      tiden.id(0);
      expect(testInfoMock.attach).not.toHaveBeenCalled();
      warn.mockRestore();
    });

    it('drops zero from a mixed list and attaches only positive IDs', () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
      testInfoMock.attach.mockClear();
      tiden.id([1, 0, 2]);
      expect(testInfoMock.attach).toHaveBeenCalledWith('tiden-metadata.json', {
        contentType: 'application/tiden.metadata+json',
        body: Buffer.from(JSON.stringify({ ids: [1, 2] }), 'utf8'),
      });
      warn.mockRestore();
    });
  });
});
