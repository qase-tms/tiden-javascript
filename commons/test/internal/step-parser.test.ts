import { describe, expect, it } from '@jest/globals';
import { extractAndCleanStep } from '../../src/internal/step-parser';

describe('extractAndCleanStep', () => {
  it('returns nulls and original string when no markers are present', () => {
    expect(extractAndCleanStep('do something')).toEqual({
      expectedResult: null,
      data: null,
      cleanedString: 'do something',
    });
  });

  it('extracts both expected result and data', () => {
    const result = extractAndCleanStep('click button TidenExpRes: button is highlighted TidenData: blue');
    expect(result.expectedResult).toBe('button is highlighted');
    expect(result.data).toBe('blue');
    expect(result.cleanedString).toBe('click button');
  });

  it('handles double-colon variant', () => {
    const result = extractAndCleanStep('step TidenExpRes:: yes TidenData:: data');
    expect(result.expectedResult).toBe('yes');
    expect(result.data).toBe('data');
    expect(result.cleanedString).toBe('step');
  });

  it('extracts an expected result with no data marker', () => {
    const result = extractAndCleanStep('step TidenExpRes: yes');
    expect(result.expectedResult).toBe('yes');
    expect(result.data).toBeNull();
    expect(result.cleanedString).toBe('step');
  });

  it('extracts data with no expected-result marker', () => {
    const result = extractAndCleanStep('step TidenData: blue');
    expect(result.expectedResult).toBeNull();
    expect(result.data).toBe('blue');
    expect(result.cleanedString).toBe('step');
  });

  it('keeps a multiline marker value intact', () => {
    const result = extractAndCleanStep('step TidenExpRes: line one\nline two TidenData: d');
    expect(result.expectedResult).toBe('line one\nline two');
    expect(result.data).toBe('d');
  });

  it('stays linear on a long run of spaces after a marker', () => {
    // Regression: the previous single-regex implementation had an ambiguous
    // `\s*:?\s*` prefix and backtracked polynomially on this input
    // (CodeQL js/polynomial-redos).
    const input = 'TidenExpRes:' + ' '.repeat(50_000) + '!';
    const started = Date.now();
    const result = extractAndCleanStep(input);
    expect(Date.now() - started).toBeLessThan(1000);
    expect(result.expectedResult).toBe('!');
  });

  it('returns nulls for empty input', () => {
    expect(extractAndCleanStep('')).toEqual({
      expectedResult: null,
      data: null,
      cleanedString: '',
    });
  });
});
