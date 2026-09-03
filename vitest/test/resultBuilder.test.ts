/* eslint-disable */
import { describe, it, expect } from '@jest/globals';
import { ResultBuilder } from '../src/modules/resultBuilder';
import type { MetadataShape } from '../src/modules/metadataAccumulator';

jest.mock('@tiden/reporter-commons', () => {
  const actual = jest.requireActual<typeof import('@tiden/reporter-commons')>('@tiden/reporter-commons');
  return {
    ...actual,
    determineTestStatus: jest.fn((error: unknown, originalStatus: string) => {
      if (error) return 'failed';
      if (originalStatus === 'passed') return 'passed';
      if (originalStatus === 'skipped') return 'skipped';
      return 'failed';
    }),
  };
});

// Vitest hands a reporter the spec file via `testCase.module.moduleId` — an
// absolute path (see vitest/node's TestModule). `fullName` carries the describe
// chain and the leaf title ONLY; it never contains the file. Fixtures here must
// keep those two separate or they assert a shape Vitest cannot produce.
const SPEC = 'src/example.test.ts';
const mkTestCase = (overrides: any = {}) => {
  const { moduleId = `${process.cwd()}/${SPEC}`, ...rest } = overrides;
  return {
    name: 'Test',
    id: 'test-id',
    fullName: 'Suite > Test',
    module: moduleId === null ? undefined : { moduleId },
    result: jest.fn().mockReturnValue({ state: 'passed', errors: [] }),
    diagnostic: jest.fn().mockReturnValue({ duration: 100, startTime: 1_700_000_000_000 }),
    ...rest,
  } as any;
};

const emptyMeta = (): MetadataShape => ({
  steps: [],
  attachments: [],
});

// api.v1.ResultCreate.id is an idempotency key the API validates as a UUID.
const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe('ResultBuilder.build', () => {
  it('builds a passed result with default execution shape', () => {
    const result = ResultBuilder.build({
      testCase: mkTestCase(),
      metadata: undefined,
      currentSuite: undefined,
      profilerSteps: [],
    });
    expect(result.execution.status).toBe('passed');
    // Vitest exposes the absolute startTime; reporter emits it as Unix seconds.
    expect(result.execution.start_time).toBe(1_700_000_000);
    expect(result.execution.end_time).toBe(1_700_000_000.1);
    expect(result.execution.duration).toBe(100);
    // Identity is commons' generateSignature() over the structural path,
    // matching the Playwright reporter — not the raw Vitest fullName.
    expect(result.signature).toBe('src/example.test.ts::suite::test');
    expect(result.steps).toEqual([]);
  });

  describe('id (API idempotency key)', () => {
    it('reports a generated UUID, never Vitest\'s own testCase.id', () => {
      const result = ResultBuilder.build({
        testCase: mkTestCase({ id: '1971115177_8_1' }),
        metadata: undefined,
        currentSuite: undefined,
        profilerSteps: [],
      });
      // Regression guard: the API rejects a non-UUID id with
      // INVALID_RESULT_ID, which silently drops every result in the run.
      expect(result.id).toMatch(UUID_V4);
      expect(result.id).not.toBe('1971115177_8_1');
    });

    it('generates a distinct id per built result', () => {
      const a = ResultBuilder.build({
        testCase: mkTestCase(), metadata: undefined, currentSuite: undefined, profilerSteps: [],
      });
      const b = ResultBuilder.build({
        testCase: mkTestCase(), metadata: undefined, currentSuite: undefined, profilerSteps: [],
      });
      expect(a.id).not.toBe(b.id);
    });

    it('uses UUIDs for internal step and attachment ids too', () => {
      const meta = emptyMeta();
      meta.steps = [{ name: 'do thing', status: 'end' }];
      meta.attachments = [{ name: 'a.txt', content: 'hello', contentType: 'text/plain' }];
      const result = ResultBuilder.build({
        testCase: mkTestCase(),
        metadata: meta,
        currentSuite: undefined,
        profilerSteps: [],
      });
      // Neither reaches the wire (commons rebuilds steps; attachments upload by
      // name/content), but they must not regress to truncated Math.random().
      expect(result.steps[0]?.id).toMatch(UUID_V4);
      expect(result.attachments[0]?.id).toMatch(UUID_V4);
    });
  });

  describe('signature (case identity)', () => {
    it('joins the spec file, the nested suites and the leaf test title with ::', () => {
      const result = ResultBuilder.build({
        testCase: mkTestCase({
          name: 'search works across browsers',
          fullName: 'Search > search works across browsers',
          moduleId: `${process.cwd()}/tests/search.spec.ts`,
        }),
        metadata: undefined,
        currentSuite: undefined,
        profilerSteps: [],
      });
      expect(result.signature).toBe('tests/search.spec.ts::search::search_works_across_browsers');
    });

    it('keeps the spec file as ONE segment, slashes intact', () => {
      const result = ResultBuilder.build({
        testCase: mkTestCase({
          name: 'nested',
          fullName: 'Outer > nested',
          moduleId: `${process.cwd()}/src/deep/nested/thing.test.ts`,
        }),
        metadata: undefined,
        currentSuite: undefined,
        profilerSteps: [],
      });
      // Same segment shape and normalization as the app's CI transform
      // (.github/scripts/vitest-to-tiden.mjs), which joins
      // [relFile, ...describes, title] identically. Splitting the path on '/'
      // would mint yet another identity for the same case — tiden-app#445.
      //
      // Shape only: the two agree byte-for-byte just when they resolve the
      // file against the SAME base. This reporter uses process.cwd() (the
      // jest reporter's `normalizePath` convention); a caller resolving
      // against a different root gets a different — still self-consistent —
      // identity. See the cwd test below.
      expect(result.signature).toBe('src/deep/nested/thing.test.ts::outer::nested');
    });

    it('distinguishes same-named tests living in different spec files', () => {
      const mk = (moduleId: string) => ResultBuilder.build({
        testCase: mkTestCase({ name: 'renders', fullName: 'Widget > renders', moduleId }),
        metadata: undefined,
        currentSuite: undefined,
        profilerSteps: [],
      });
      const a = mk(`${process.cwd()}/src/a/widget.test.ts`);
      const b = mk(`${process.cwd()}/src/b/widget.test.ts`);
      expect(a.signature).not.toBe(b.signature);
    });

    it('resolves the spec file against process.cwd(), not the filesystem root', () => {
      const result = ResultBuilder.build({
        testCase: mkTestCase({
          fullName: 'Suite > Test',
          moduleId: `${process.cwd()}/src/example.test.ts`,
        }),
        metadata: undefined,
        currentSuite: undefined,
        profilerSteps: [],
      });
      expect(result.signature.startsWith('src/example.test.ts::')).toBe(true);
    });

    it('leaves a spec file outside cwd absolute rather than guessing a root', () => {
      const result = ResultBuilder.build({
        testCase: mkTestCase({ fullName: 'Suite > Test', moduleId: '/elsewhere/x.test.ts' }),
        metadata: undefined,
        currentSuite: undefined,
        profilerSteps: [],
      });
      expect(result.signature).toBe('/elsewhere/x.test.ts::suite::test');
    });

    it('resolves the spec file against rootDir when it is set', () => {
      const result = ResultBuilder.build({
        testCase: mkTestCase({
          fullName: 'Suite > Test',
          moduleId: `${process.cwd()}/packages/web/src/a.test.ts`,
        }),
        metadata: undefined,
        currentSuite: undefined,
        profilerSteps: [],
        rootDir: `${process.cwd()}/packages/web`,
      });
      expect(result.signature).toBe('src/a.test.ts::suite::test');
    });

    it('rootDir above cwd widens the segment, matching a repo-root producer', () => {
      // The case this exists for: vitest runs from app/frontend, but CI
      // resolves the same file against the repo root. Both producers must
      // agree on the base or one test becomes two cases.
      const result = ResultBuilder.build({
        testCase: mkTestCase({
          fullName: 'Suite > Test',
          moduleId: '/repo/app/frontend/src/a.test.ts',
        }),
        metadata: undefined,
        currentSuite: undefined,
        profilerSteps: [],
        rootDir: '/repo',
      });
      expect(result.signature).toBe('app/frontend/src/a.test.ts::suite::test');
    });

    it('falls back to process.cwd() when rootDir is not set', () => {
      const without = ResultBuilder.build({
        testCase: mkTestCase({ fullName: 'Suite > Test' }),
        metadata: undefined,
        currentSuite: undefined,
        profilerSteps: [],
      });
      const explicit = ResultBuilder.build({
        testCase: mkTestCase({ fullName: 'Suite > Test' }),
        metadata: undefined,
        currentSuite: undefined,
        profilerSteps: [],
        rootDir: process.cwd(),
      });
      expect(without.signature).toBe(explicit.signature);
    });

    it('omits the file segment when Vitest reports no module id', () => {
      const result = ResultBuilder.build({
        testCase: mkTestCase({ fullName: 'Suite > Test', moduleId: null }),
        metadata: undefined,
        currentSuite: undefined,
        profilerSteps: [],
      });
      expect(result.signature).toBe('suite::test');
    });

    it('prefixes the parsed Tiden id when the title carries one', () => {
      const result = ResultBuilder.build({
        testCase: mkTestCase({
          name: 'user can login (Tiden ID: 7)',
          fullName: 'Auth > user can login (Tiden ID: 7)',
        }),
        metadata: undefined,
        currentSuite: undefined,
        profilerSteps: [],
      });
      expect(result.case_id).toBe(7);
      expect(result.signature).toBe('7::src/example.test.ts::auth::user_can_login_(tiden_id:_7)');
    });

    it('joins multiple parsed ids with - before the path', () => {
      const result = ResultBuilder.build({
        testCase: mkTestCase({
          name: 'covers two cases (Tiden ID: 1,2)',
          fullName: 'Auth > covers two cases (Tiden ID: 1,2)',
        }),
        metadata: undefined,
        currentSuite: undefined,
        profilerSteps: [],
      });
      expect(result.signature).toBe('1-2::src/example.test.ts::auth::covers_two_cases_(tiden_id:_1,2)');
    });

    it('is param-free: parameters do not change identity', () => {
      const withParams = emptyMeta();
      withParams.parameters = { browser: 'firefox' };
      const base = ResultBuilder.build({
        testCase: mkTestCase({ fullName: 'Suite > Test' }),
        metadata: undefined,
        currentSuite: undefined,
        profilerSteps: [],
      });
      const parametrized = ResultBuilder.build({
        testCase: mkTestCase({ fullName: 'Suite > Test' }),
        metadata: withParams,
        currentSuite: undefined,
        profilerSteps: [],
      });
      expect(parametrized.signature).toBe(base.signature);
    });

    it('falls back to the test name alone when fullName has no suite path', () => {
      const result = ResultBuilder.build({
        testCase: mkTestCase({ name: 'standalone test', fullName: 'standalone test' }),
        metadata: undefined,
        currentSuite: undefined,
        profilerSteps: [],
      });
      expect(result.signature).toBe('src/example.test.ts::standalone_test');
    });
  });

  it('extracts single legacy id from name (Tiden ID: 123)', () => {
    const result = ResultBuilder.build({
      testCase: mkTestCase({ name: 'Test (Tiden ID: 123)', fullName: 'Suite > Test (Tiden ID: 123)' }),
      metadata: undefined,
      currentSuite: undefined,
      profilerSteps: [],
    });
    expect(result.case_id).toBe(123);
    expect(result.title).toBe('Test');
  });

  it('extracts multiple legacy ids', () => {
    const result = ResultBuilder.build({
      testCase: mkTestCase({ name: 'Test (Tiden ID: 1,2,3)' }),
      metadata: undefined,
      currentSuite: undefined,
      profilerSteps: [],
    });
    expect(result.case_id).toEqual([1, 2, 3]);
  });

  it('leaves case_id null when the title carries no id marker', () => {
    const result = ResultBuilder.build({
      testCase: mkTestCase(),
      metadata: undefined,
      currentSuite: undefined,
      profilerSteps: [],
    });
    expect(result.case_id).toBeNull();
  });

  it('always sends a null project_case_mapping (multi-project mode removed)', () => {
    const result = ResultBuilder.build({
      testCase: mkTestCase({ name: 'Test (Tiden ID: 123)' }),
      metadata: undefined,
      currentSuite: undefined,
      profilerSteps: [],
    });
    expect(result.project_case_mapping).toBeNull();
  });

  it('uses metadata.title when provided', () => {
    const meta = emptyMeta();
    meta.title = 'Override Title';
    const result = ResultBuilder.build({
      testCase: mkTestCase(),
      metadata: meta,
      currentSuite: undefined,
      profilerSteps: [],
    });
    expect(result.title).toBe('Override Title');
  });

  it('maps failed result with errors to status=failed and stacktrace', () => {
    const error = new Error('boom');
    error.stack = 'STACK';
    const result = ResultBuilder.build({
      testCase: mkTestCase({
        result: jest.fn().mockReturnValue({ state: 'failed', errors: [error] }),
      }),
      metadata: undefined,
      currentSuite: undefined,
      profilerSteps: [],
    });
    expect(result.execution.status).toBe('failed');
    expect(result.execution.stacktrace).toContain('STACK');
    expect(result.message).toBe('boom');
  });

  it('maps skipped result with note to status=skipped and message=note', () => {
    const result = ResultBuilder.build({
      testCase: mkTestCase({
        result: jest.fn().mockReturnValue({ state: 'skipped', note: 'cond fail', errors: [] }),
      }),
      metadata: undefined,
      currentSuite: undefined,
      profilerSteps: [],
    });
    expect(result.execution.status).toBe('skipped');
    expect(result.message).toBe('cond fail');
  });

  it('uses metadata.suite for relations when present', () => {
    const meta = emptyMeta();
    meta.suite = 'My Suite - Sub';
    const result = ResultBuilder.build({
      testCase: mkTestCase(),
      metadata: meta,
      currentSuite: 'CurrentSuite',
      profilerSteps: [],
    });
    expect(result.relations).toEqual({
      suite: { data: [
        { title: 'My Suite', public_id: null },
        { title: 'Sub', public_id: null },
      ] },
    });
  });

  const suiteTitles = (result: any): string[] | undefined =>
    result.relations?.suite?.data?.map((d: any) => d.title);

  it('reports the spec file then the full describe chain, one segment each', () => {
    const result = ResultBuilder.build({
      testCase: mkTestCase({ fullName: 'Outer > Inner > Test', name: 'Test' }),
      metadata: undefined,
      currentSuite: undefined,
      profilerSteps: [],
    });
    // Was ['Outer > Inner'] — the derived chain was joined with ' > ' and the
    // caller split it on ' - ', so a nested path collapsed into ONE suite.
    expect(suiteTitles(result)).toEqual(['src/example.test.ts', 'Outer', 'Inner']);
  });

  it('matches the app CI transform, which reports [relFile, ...describes]', () => {
    const result = ResultBuilder.build({
      testCase: mkTestCase({
        fullName: 'Catalog parity > en vs es > same keys',
        name: 'same keys',
        moduleId: `${process.cwd()}/src/i18n/catalog.test.ts`,
      }),
      metadata: undefined,
      currentSuite: undefined,
      profilerSteps: [],
    });
    expect(suiteTitles(result)).toEqual(['src/i18n/catalog.test.ts', 'Catalog parity', 'en vs es']);
  });

  it('reports the spec file alone for a test with no describe', () => {
    const result = ResultBuilder.build({
      testCase: mkTestCase({ fullName: 'top level test', name: 'top level test' }),
      metadata: undefined,
      currentSuite: undefined,
      profilerSteps: [],
    });
    // Was [] — a top-level test reported no suite at all.
    expect(suiteTitles(result)).toEqual(['src/example.test.ts']);
  });

  it('does not let currentSuite truncate the derived path', () => {
    const result = ResultBuilder.build({
      testCase: mkTestCase({ fullName: 'Outer > Inner > Test', name: 'Test' }),
      metadata: undefined,
      currentSuite: 'Inner',
      profilerSteps: [],
    });
    // currentSuite is one describe's name from onTestSuiteReady. Preferring it
    // reported every nested test as just its innermost describe, with no file.
    expect(suiteTitles(result)).toEqual(['src/example.test.ts', 'Outer', 'Inner']);
  });

  it('applies rootDir to the suite path as well as the signature', () => {
    const result = ResultBuilder.build({
      testCase: mkTestCase({
        fullName: 'Outer > Test',
        name: 'Test',
        moduleId: '/repo/app/frontend/src/a.test.ts',
      }),
      metadata: undefined,
      currentSuite: undefined,
      profilerSteps: [],
      rootDir: '/repo',
    });
    expect(suiteTitles(result)).toEqual(['app/frontend/src/a.test.ts', 'Outer']);
  });

  it('falls back to currentSuite only when there is no file and no describe', () => {
    const result = ResultBuilder.build({
      testCase: mkTestCase({ fullName: 'Test', name: 'Test', moduleId: null }),
      metadata: undefined,
      currentSuite: 'OuterSuite',
      profilerSteps: [],
    });
    expect(suiteTitles(result)).toEqual(['OuterSuite']);
  });

  it('never splits currentSuite: a describe named "A - B" is one suite', () => {
    const result = ResultBuilder.build({
      testCase: mkTestCase({ fullName: 'Test', name: 'Test', moduleId: null }),
      metadata: undefined,
      currentSuite: 'Feature - edge cases',
      profilerSteps: [],
    });
    expect(suiteTitles(result)).toEqual(['Feature - edge cases']);
  });

  it('reports no suite when there is no file, no describe and no currentSuite', () => {
    const result = ResultBuilder.build({
      testCase: mkTestCase({ fullName: 'Test', name: 'Test', moduleId: null }),
      metadata: undefined,
      currentSuite: undefined,
      profilerSteps: [],
    });
    expect(result.relations).toBeNull();
  });

  it('applies metadata.fields/parameters/groupParameters/tags', () => {
    const meta = emptyMeta();
    meta.fields = { severity: 'major' };
    meta.parameters = { env: 'prod' };
    meta.groupParameters = { region: 'eu' };
    meta.tags = ['smoke'];
    const result = ResultBuilder.build({
      testCase: mkTestCase(),
      metadata: meta,
      currentSuite: undefined,
      profilerSteps: [],
    });
    expect(result.fields).toEqual({ severity: 'major' });
    expect(result.params).toEqual({ env: 'prod' });
    expect(result.group_params).toEqual({ region: 'eu' });
    expect(result.tags).toEqual(['smoke']);
  });

  it('applies metadata.comment as message', () => {
    const meta = emptyMeta();
    meta.comment = 'Override comment';
    const result = ResultBuilder.build({
      testCase: mkTestCase(),
      metadata: meta,
      currentSuite: undefined,
      profilerSteps: [],
    });
    expect(result.message).toBe('Override comment');
  });

  it('builds steps from metadata.steps with extractAndCleanStep applied', () => {
    const meta = emptyMeta();
    meta.steps = [
      { name: 'do thing TidenExpRes: ok', status: 'end' },
      { name: 'failed step', status: 'failed' },
    ];
    const result = ResultBuilder.build({
      testCase: mkTestCase(),
      metadata: meta,
      currentSuite: undefined,
      profilerSteps: [],
    });
    expect(result.steps.length).toBe(2);
    expect(result.steps[0]?.execution?.status).toBe('passed');
    expect(result.steps[1]?.execution?.status).toBe('failed');
  });

  it('builds attachments from metadata.attachments', () => {
    const meta = emptyMeta();
    meta.attachments = [
      { name: 'a.txt', content: 'hello', contentType: 'text/plain' },
      { name: 'b.bin', path: '/tmp/b.bin' },
    ];
    const result = ResultBuilder.build({
      testCase: mkTestCase(),
      metadata: meta,
      currentSuite: undefined,
      profilerSteps: [],
    });
    expect(result.attachments.length).toBe(2);
    expect(result.attachments[0]?.file_name).toBe('a.txt');
    expect(result.attachments[0]?.mime_type).toBe('text/plain');
    expect(result.attachments[1]?.file_path).toBe('/tmp/b.bin');
    expect(result.attachments[1]?.mime_type).toBe('application/octet-stream');
  });

  it('appends metadata._profilerSteps when present', () => {
    const meta = emptyMeta();
    (meta as any)._profilerSteps = [{ id: 'meta-prof-1' }];
    const result = ResultBuilder.build({
      testCase: mkTestCase(),
      metadata: meta,
      currentSuite: undefined,
      profilerSteps: [],
    });
    expect(result.steps).toEqual([{ id: 'meta-prof-1' }]);
  });

  it('appends profilerSteps argument after metadata steps', () => {
    const meta = emptyMeta();
    meta.steps = [{ name: 'manual', status: 'end' }];
    const result = ResultBuilder.build({
      testCase: mkTestCase(),
      metadata: meta,
      currentSuite: undefined,
      profilerSteps: [{ id: 'prof-1' } as any],
    });
    expect(result.steps.length).toBe(2);
    expect(result.steps[1]).toEqual({ id: 'prof-1' });
  });
});

describe('ResultBuilder.splitFullName', () => {
  it('splits a nested fullName into path segments, leaf title last', () => {
    const tc = mkTestCase({ fullName: 'A > B > Test', name: 'Test' });
    expect(ResultBuilder.splitFullName(tc)).toEqual(['A', 'B', 'Test']);
  });

  it('returns a single segment when there is no suite path', () => {
    const tc = mkTestCase({ fullName: 'Test', name: 'Test' });
    expect(ResultBuilder.splitFullName(tc)).toEqual(['Test']);
  });
});

describe('ResultBuilder.extractSuiteFromTestCase', () => {
  it('extracts suite from "Suite > Test" format', () => {
    const tc = mkTestCase({ fullName: 'Outer > Test' });
    expect(ResultBuilder.extractSuiteFromTestCase(tc)).toBe('Outer');
  });

  it('extracts multi-level suite from "A > B > Test" format', () => {
    const tc = mkTestCase({ fullName: 'A > B > Test' });
    expect(ResultBuilder.extractSuiteFromTestCase(tc)).toBe('A > B');
  });

  it('returns undefined when no suite separator', () => {
    const tc = mkTestCase({ fullName: 'JustATest', name: 'JustATest' });
    expect(ResultBuilder.extractSuiteFromTestCase(tc)).toBeUndefined();
  });

  it('falls back to testCase.name when fullName missing', () => {
    const tc = { name: 'OnlyName' } as any;
    expect(ResultBuilder.extractSuiteFromTestCase(tc)).toBeUndefined();
  });
});
