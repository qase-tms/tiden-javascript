import { describe, expect, it, jest } from '@jest/globals';
import { parseTidenIdFromTitle } from '../../src/utils/project-mapping-utils';

describe('parseTidenIdFromTitle', () => {
  it('parses a legacy id from a title', () => {
    const parsed = parseTidenIdFromTitle('Login (Tiden ID: 5)');
    expect(parsed.legacyIds).toEqual([5]);
    expect(parsed.cleanedTitle).toBe('Login');
  });

  it('parses a comma-separated legacy id list', () => {
    const parsed = parseTidenIdFromTitle('Login (Tiden ID: 1,2,3)');
    expect(parsed.legacyIds).toEqual([1, 2, 3]);
  });

  it('drops zero ids from legacy markers', () => {
    const parsed = parseTidenIdFromTitle('Login (Tiden ID: 1,0,2)');
    expect(parsed.legacyIds).toEqual([1, 2]);
  });

  it('drops negative ids from legacy markers', () => {
    const parsed = parseTidenIdFromTitle('Login (Tiden ID: -3,4)');
    expect(parsed.legacyIds).toEqual([4]);
  });

  it('passes warnings to the provided logger', () => {
    const log = jest.fn();
    const logger = { log, logError: jest.fn(), logDebug: jest.fn() };
    parseTidenIdFromTitle('Login (Tiden ID: 0)', logger);
    expect(log).toHaveBeenCalledTimes(1);
    expect(log.mock.calls[0]?.[0]).toContain('got "0"');
  });
});
