import { expect } from '@jest/globals';
import { ConfigLoader } from '../../src/config/config-loader';
import { QaseError } from '../../src/utils/qase-error';
import { JSONSchemaType } from 'ajv';
import * as fs from 'fs';
import * as path from 'path';

// Mock fs module
jest.mock('fs', () => ({
  readFileSync: jest.fn(),
}));

// Mock path module
jest.mock('path', () => ({
  join: jest.fn(),
}));

describe('ConfigLoader', () => {
  const mockReadFileSync = jest.mocked(fs.readFileSync);
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const mockJoin = jest.mocked(path.join);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create instance with default paths', () => {
      const loader = new ConfigLoader();

      expect(loader).toBeInstanceOf(ConfigLoader);
    });

    it('should create instance with custom paths', () => {
      const customPaths = ['custom.config.json'];
      const loader = new ConfigLoader(undefined, customPaths);

      expect(loader).toBeInstanceOf(ConfigLoader);
    });
  });

  describe('load', () => {
    it('should load valid config from first path', () => {
      const validConfig = {
        projectCode: 'TEST',
        apiToken: 'token123',
      };
      const configJson = JSON.stringify(validConfig);

      mockJoin.mockReturnValue('/path/to/tiden.config.json');
      mockReadFileSync.mockReturnValue(configJson);

      const loader = new ConfigLoader();
      const result = loader.load();

      expect(result).toEqual(validConfig);
      expect(mockJoin).toHaveBeenCalledWith(process.cwd(), 'tiden.config.json');
      expect(mockReadFileSync).toHaveBeenCalledWith('/path/to/tiden.config.json', 'utf8');
    });

    it('should return null when no config file exists', () => {
      mockJoin.mockReturnValue('/path/to/tiden.config.json');

      mockReadFileSync
        .mockImplementation(() => {
          const error = new Error('File not found') as NodeJS.ErrnoException;
          error.code = 'ENOENT';
          throw error;
        });

      const loader = new ConfigLoader();
      const result = loader.load();

      expect(result).toBeNull();
      expect(mockJoin).toHaveBeenCalledTimes(1);
      expect(mockReadFileSync).toHaveBeenCalledTimes(1);
    });

    it('should throw QaseError for non-ENOENT file system errors', () => {
      mockJoin.mockReturnValue('/path/to/tiden.config.json');
      mockReadFileSync.mockImplementation(() => {
        const error = new Error('Permission denied') as NodeJS.ErrnoException;
        error.code = 'EACCES';
        throw error;
      });

      const loader = new ConfigLoader();

      expect(() => loader.load()).toThrow(QaseError);
    });

    it('should throw error for invalid JSON', () => {
      mockJoin.mockReturnValue('/path/to/tiden.config.json');
      mockReadFileSync.mockReturnValue('invalid json');

      const loader = new ConfigLoader();

      expect(() => loader.load()).toThrow(SyntaxError);
    });

    it('should throw error for validation failures', () => {
      const invalidConfig = {
        tiden: {
          api: {
            token: 123, // Should be string, not number
          },
        },
      };
      const configJson = JSON.stringify(invalidConfig);

      mockJoin.mockReturnValue('/path/to/tiden.config.json');
      mockReadFileSync.mockReturnValue(configJson);

      const loader = new ConfigLoader();
      expect(() => loader.load()).toThrow('Invalid config: "`tiden.api/token`" must be string');
    });

    it('should handle EISDIR error code', () => {
      mockJoin.mockReturnValue('/path/to/tiden.config.json');
      mockReadFileSync.mockImplementation(() => {
        const error = new Error('Is a directory') as NodeJS.ErrnoException;
        error.code = 'EISDIR';
        throw error;
      });

      const loader = new ConfigLoader();
      const result = loader.load();

      expect(result).toBeNull();
    });

    it('should fall back to next path when first path has ENOENT', () => {
      const validConfig = {
        projectCode: 'TEST',
        apiToken: 'token123',
      };
      const configJson = JSON.stringify(validConfig);

      // First call (missing.json) should fail with ENOENT
      // Second call (present.json) should return valid config
      mockJoin
        .mockReturnValueOnce('/path/to/missing.json')
        .mockReturnValueOnce('/path/to/present.json');

      mockReadFileSync
        .mockImplementationOnce(() => {
          const error = new Error('File not found') as NodeJS.ErrnoException;
          error.code = 'ENOENT';
          throw error;
        })
        .mockReturnValueOnce(configJson);

      const customPaths = ['missing.json', 'present.json'];
      const loader = new ConfigLoader(undefined, customPaths);
      const result = loader.load();

      expect(result).toEqual(validConfig);
      expect(mockJoin).toHaveBeenCalledTimes(2);
      expect(mockJoin).toHaveBeenNthCalledWith(1, process.cwd(), 'missing.json');
      expect(mockJoin).toHaveBeenNthCalledWith(2, process.cwd(), 'present.json');
      expect(mockReadFileSync).toHaveBeenCalledTimes(2);
    });
  });

  describe('with custom validation schema', () => {
    it('should use custom schema for validation', () => {
      const customSchema: JSONSchemaType<{ customField: string }> = {
        type: 'object',
        properties: {
          customField: { type: 'string' },
        },
        required: ['customField'],
      };

      const validCustomConfig = {
        customField: 'custom value',
      };
      const configJson = JSON.stringify(validCustomConfig);

      mockJoin.mockReturnValue('/path/to/tiden.config.json');
      mockReadFileSync.mockReturnValue(configJson);

      const loader = new ConfigLoader(customSchema);
      const result = loader.load();

      expect(result).toEqual(validCustomConfig);
    });

    it('should throw error for invalid custom schema', () => {
      const customSchema: JSONSchemaType<{ customField: string }> = {
        type: 'object',
        properties: {
          customField: { type: 'string' },
        },
        required: ['customField'],
      };

      const invalidCustomConfig = {
        // Missing required customField
      };
      const configJson = JSON.stringify(invalidCustomConfig);

      mockJoin.mockReturnValue('/path/to/tiden.config.json');
      mockReadFileSync.mockReturnValue(configJson);

      const loader = new ConfigLoader(customSchema);
      expect(() => loader.load()).toThrow('Invalid config: "it" must have required property \'customField\'');
    });
  });
}); 
