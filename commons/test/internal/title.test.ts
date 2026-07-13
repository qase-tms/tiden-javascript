import { describe, expect, it } from '@jest/globals';
import { removeTidenIdsFromTitle } from '../../src/internal/title';

describe('removeTidenIdsFromTitle', () => {
  it('strips a single Tiden ID with colon at end', () => {
    expect(removeTidenIdsFromTitle('login flow (Tiden ID: 1)')).toBe('login flow');
  });

  it('strips a comma-separated id list at end', () => {
    expect(removeTidenIdsFromTitle('login flow (Tiden ID: 1,2,3)')).toBe('login flow');
  });

  it('accepts the optional colon variant', () => {
    expect(removeTidenIdsFromTitle('login flow (Tiden ID 42)')).toBe('login flow');
  });

  it('is case-insensitive', () => {
    expect(removeTidenIdsFromTitle('login flow (tiden id: 7)')).toBe('login flow');
  });

  it('only strips the trailing match, not mid-title', () => {
    expect(removeTidenIdsFromTitle('foo (Tiden ID: 1) bar')).toBe('foo (Tiden ID: 1) bar');
  });

  it('returns the original title when nothing matches', () => {
    expect(removeTidenIdsFromTitle('plain title')).toBe('plain title');
  });

  it('trims trailing whitespace after removal', () => {
    expect(removeTidenIdsFromTitle('hello   (Tiden ID: 9)')).toBe('hello');
  });

  it('handles empty string', () => {
    expect(removeTidenIdsFromTitle('')).toBe('');
  });
});
