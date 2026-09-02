import { normalizeSpecPath } from '../../src/internal/spec-path';

describe('normalizeSpecPath', () => {
  it('makes an absolute path project-relative', () => {
    expect(normalizeSpecPath('/repo/src/a.test.ts', '/repo')).toBe('src/a.test.ts');
  });

  it('keeps slashes intact — the result is ONE signature segment', () => {
    expect(normalizeSpecPath('/repo/src/deep/a.test.ts', '/repo')).toBe('src/deep/a.test.ts');
  });

  it('normalizes Windows separators', () => {
    expect(normalizeSpecPath('C:\\repo\\src\\a.test.ts', 'C:\\repo')).toBe('src/a.test.ts');
  });

  it('tolerates a trailing slash on the root', () => {
    expect(normalizeSpecPath('/repo/src/a.test.ts', '/repo/')).toBe('src/a.test.ts');
  });

  it('returns a path outside the root unchanged rather than forcing it relative', () => {
    expect(normalizeSpecPath('/elsewhere/a.test.ts', '/repo')).toBe('/elsewhere/a.test.ts');
  });

  it('returns a virtual module id unchanged', () => {
    expect(normalizeSpecPath('virtual:generated-tests', '/repo')).toBe('virtual:generated-tests');
  });

  it('does not treat a sibling directory sharing the root prefix as inside it', () => {
    expect(normalizeSpecPath('/repo-other/a.test.ts', '/repo')).toBe('/repo-other/a.test.ts');
  });
});
