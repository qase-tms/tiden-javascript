import { expect } from '@jest/globals';
import { generateSignature } from '../../src/utils/signature';

describe('generateSignature', () => {
  it('should generate signature with caseIds and suites', () => {
    const result = generateSignature(
      [1, 2, 3],
      ['Suite1', 'Suite2'],
    );
    expect(result).toBe('1-2-3::suite1::suite2');
  });

  it('should process suite values correctly', () => {
    const result = generateSignature(
      null,
      ['  Suite With Spaces  ', 'Suite\tWith\tTabs'],
    );
    expect(result).toBe('suite_with_spaces::suite::with::tabs');
  });

  it('should handle complex suite names', () => {
    const result = generateSignature(
      null,
      ['test/fields.spec.js::Example: Fields.spec.js\tTest Cases With Field: Layer::Layer = Unit'],
    );
    expect(result).toBe('test/fields.spec.js::example:_fields.spec.js::test_cases_with_field:_layer::layer_=_unit');
  });

  it('should generate signature with null caseIds', () => {
    const result = generateSignature(
      null,
      ['suite1', 'suite2'],
    );
    expect(result).toBe('suite1::suite2');
  });

  it('should generate signature with empty caseIds array', () => {
    const result = generateSignature(
      [],
      ['suite1', 'suite2'],
    );
    expect(result).toBe('suite1::suite2');
  });

  it('should generate signature with only caseIds', () => {
    const result = generateSignature(
      [1, 2, 3],
      [],
    );
    expect(result).toBe('1-2-3');
  });

  it('should generate signature with caseIds and a single suite', () => {
    const result = generateSignature(
      [1, 2, 3],
      ['suite1'],
    );
    expect(result).toBe('1-2-3::suite1');
  });

  it('should generate empty signature when all inputs are empty', () => {
    const result = generateSignature(
      null,
      [],
    );
    expect(result).toBe('');
  });

  it('should normalize backslashes in suite names to forward slashes', () => {
    const result = generateSignature(
      null,
      ['e2e\\file.spec.ts', 'Suite1'],
    );
    expect(result).toBe('e2e/file.spec.ts::suite1');
  });

  it('should produce identical signatures regardless of slash direction', () => {
    const withBackslash = generateSignature(null, ['e2e\\nested\\file.spec.ts']);
    const withForwardSlash = generateSignature(null, ['e2e/nested/file.spec.ts']);
    expect(withBackslash).toBe(withForwardSlash);
  });

  it('is param-free: two arities only, identical output regardless of params (delta c)', () => {
    expect(generateSignature([12], ['Checkout', 'Cards'])).toBe('12::checkout::cards');
    // @ts-expect-error — the third parameter is gone by design
    generateSignature([12], ['a'], { browser: 'chromium' });
  });
});
