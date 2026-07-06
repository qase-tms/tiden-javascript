/* eslint-disable */
import { describe, expect, it, afterEach } from '@jest/globals';
import { getTidenApiHost } from '../src/fixture';

describe('getTidenApiHost', () => {
  const ENV_KEY = 'TIDEN_BASE_URL';
  const originalEnvValue = process.env[ENV_KEY];

  afterEach(() => {
    if (originalEnvValue === undefined) {
      delete process.env[ENV_KEY];
    } else {
      process.env[ENV_KEY] = originalEnvValue;
    }
  });

  it('returns the host for a valid config baseUrl', () => {
    delete process.env[ENV_KEY];
    expect(getTidenApiHost('https://api.tiden.example/path')).toBe('api.tiden.example');
  });

  it('returns undefined for an invalid config baseUrl', () => {
    delete process.env[ENV_KEY];
    expect(getTidenApiHost('not-a-url')).toBeUndefined();
  });

  it('falls back to TIDEN_BASE_URL env var when the config baseUrl is unset', () => {
    process.env[ENV_KEY] = 'https://env.tiden.example';
    expect(getTidenApiHost(undefined)).toBe('env.tiden.example');
  });

  it('prefers the config baseUrl over the env var when both are set', () => {
    process.env[ENV_KEY] = 'https://env.tiden.example';
    expect(getTidenApiHost('https://config.tiden.example')).toBe('config.tiden.example');
  });

  it('returns undefined when neither the config baseUrl nor the env var is set', () => {
    delete process.env[ENV_KEY];
    expect(getTidenApiHost(undefined)).toBeUndefined();
  });
});
