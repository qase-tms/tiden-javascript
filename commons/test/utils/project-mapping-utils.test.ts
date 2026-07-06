import { describe, expect, it, jest } from '@jest/globals';
import {
  parseProjectMappingFromTitle,
  parseProjectMappingFromTags,
} from '../../src/utils/project-mapping-utils';

describe('parseProjectMappingFromTitle', () => {
  it('parses a legacy id from a title', () => {
    const parsed = parseProjectMappingFromTitle('Login (Tiden ID: 5)');
    expect(parsed.legacyIds).toEqual([5]);
    expect(parsed.projectMapping).toEqual({});
    expect(parsed.cleanedTitle).toBe('Login');
  });

  it('parses a comma-separated legacy id list', () => {
    const parsed = parseProjectMappingFromTitle('Login (Tiden ID: 1,2,3)');
    expect(parsed.legacyIds).toEqual([1, 2, 3]);
  });

  it('parses a project mapping marker', () => {
    const parsed = parseProjectMappingFromTitle('Login (Tiden PROJ1: 1,2)');
    expect(parsed.legacyIds).toEqual([]);
    expect(parsed.projectMapping).toEqual({ PROJ1: [1, 2] });
  });

  it('drops zero ids from legacy markers', () => {
    const parsed = parseProjectMappingFromTitle('Login (Tiden ID: 1,0,2)');
    expect(parsed.legacyIds).toEqual([1, 2]);
  });

  it('drops negative ids from legacy markers', () => {
    const parsed = parseProjectMappingFromTitle('Login (Tiden ID: -3,4)');
    expect(parsed.legacyIds).toEqual([4]);
  });

  it('omits a project entirely when all of its ids are non-positive', () => {
    const parsed = parseProjectMappingFromTitle('Login (Tiden PROJ1: 0)');
    expect(parsed.projectMapping).toEqual({});
  });

  it('keeps positive ids in a project when some are invalid', () => {
    const parsed = parseProjectMappingFromTitle('Login (Tiden PROJ1: 0,5)');
    expect(parsed.projectMapping).toEqual({ PROJ1: [5] });
  });

  it('passes warnings to the provided logger', () => {
    const log = jest.fn();
    const logger = { log, logError: jest.fn(), logDebug: jest.fn() };
    parseProjectMappingFromTitle('Login (Tiden ID: 0)', logger);
    expect(log).toHaveBeenCalledTimes(1);
    expect(log.mock.calls[0]?.[0]).toContain('got "0"');
  });
});

describe('parseProjectMappingFromTags', () => {
  it('parses @tidenid(1,2)', () => {
    const parsed = parseProjectMappingFromTags(['@tidenid(1,2)']);
    expect(parsed.legacyIds).toEqual([1, 2]);
  });

  it('parses @tidenid.PROJ1(1,2)', () => {
    const parsed = parseProjectMappingFromTags(['@tidenid.PROJ1(1,2)']);
    expect(parsed.projectMapping).toEqual({ PROJ1: [1, 2] });
  });

  it('drops zero ids', () => {
    const parsed = parseProjectMappingFromTags(['@tidenid(1,0,2)']);
    expect(parsed.legacyIds).toEqual([1, 2]);
  });

  it('drops negative ids', () => {
    const parsed = parseProjectMappingFromTags(['@tidenid(-1,3)']);
    expect(parsed.legacyIds).toEqual([3]);
  });

  it('omits a project entirely when all of its tag ids are non-positive', () => {
    const parsed = parseProjectMappingFromTags(['@tidenid.PROJ1(0)']);
    expect(parsed.projectMapping).toEqual({});
  });

  it('keeps positive ids in a project tag when some are invalid', () => {
    const parsed = parseProjectMappingFromTags(['@tidenid.PROJ1(0,5)']);
    expect(parsed.projectMapping).toEqual({ PROJ1: [5] });
  });

  it('passes warnings to the provided logger', () => {
    const log = jest.fn();
    const logger = { log, logError: jest.fn(), logDebug: jest.fn() };
    parseProjectMappingFromTags(['@tidenid(0)'], logger);
    expect(log).toHaveBeenCalledTimes(1);
    expect(log.mock.calls[0]?.[0]).toContain('got "0"');
  });
});
