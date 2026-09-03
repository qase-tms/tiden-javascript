/* eslint-disable */
import { describe, it, expect } from '@jest/globals';
import path from 'path';

import { ResultBuilder } from '../src/result-builder';
import { MetadataApplier } from '../src/metadata-applier';
import { Metadata } from '../src/models';

// api.v1.ResultCreate.id is an idempotency key the API validates as a UUID.
const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const SPEC = path.join(process.cwd(), 'src/utils/login.test.ts');

const mkAssertion = (overrides: any = {}): any => ({
  title: 'logs in',
  fullName: 'Auth logs in',
  ancestorTitles: ['Auth'],
  status: 'passed',
  duration: 120,
  failureDetails: [],
  failureMessages: [],
  ...overrides,
});

const build = (overrides: any = {}, metadata: Metadata = MetadataApplier.empty()) =>
  ResultBuilder.build({
    value: mkAssertion(overrides),
    path: SPEC,
    metadata,
    profilerSteps: [],
    ...(overrides.__args ?? {}),
  });

describe('id (API idempotency key)', () => {
  it('is a generated UUID, never a Jest identifier', () => {
    const result = build();
    expect(result.id).toMatch(UUID_V4);
    expect(result.id).not.toBe('Auth logs in');
    expect(result.id).not.toContain(SPEC);
  });

  it('is distinct for every result', () => {
    const ids = new Set([build().id, build().id, build().id]);
    expect(ids.size).toBe(3);
  });
});

describe('signature (case identity)', () => {
  it('is the structural path: file segments, describes, then the leaf title', () => {
    expect(build().signature).toBe('src::utils::login.test.ts::auth::logs_in');
  });

  it('prefixes a single case id', () => {
    const result = build({ title: 'logs in (Tiden ID: 7)' });
    expect(result.case_id).toBe(7);
    expect(result.signature).toBe('7::src::utils::login.test.ts::auth::logs_in');
  });

  it('joins multiple case ids with a dash', () => {
    const result = build({ title: 'logs in (Tiden ID: 7,9)' });
    expect(result.case_id).toEqual([7, 9]);
    expect(result.signature).toBe('7-9::src::utils::login.test.ts::auth::logs_in');
  });

  it('is param-free: parameters do not change identity', () => {
    const withParams = MetadataApplier.empty();
    withParams.parameters = { browser: 'chrome' };
    expect(build({}, withParams).signature).toBe(build().signature);
  });

  it('strips the id marker out of the title segment', () => {
    const withId = build({ title: 'logs in (Tiden ID: 7)' });
    expect(withId.signature.endsWith('::logs_in')).toBe(true);
  });

  it('does not include nested describes twice', () => {
    const result = build({
      ancestorTitles: ['Auth', 'when signed out'],
      title: 'redirects',
    });
    expect(result.signature).toBe(
      'src::utils::login.test.ts::auth::when_signed_out::redirects',
    );
  });
});

describe('title', () => {
  it('strips the Tiden ID marker', () => {
    expect(build({ title: 'logs in (Tiden ID: 7)' }).title).toBe('logs in');
  });

  it('is overridden by metadata', () => {
    const meta = MetadataApplier.empty();
    meta.title = 'Custom title';
    expect(build({}, meta).title).toBe('Custom title');
  });
});

describe('timing', () => {
  it('reports Unix seconds derived from the start hook, duration in ms', () => {
    const result = ResultBuilder.build({
      value: mkAssertion({ duration: 1500 }),
      path: SPEC,
      metadata: MetadataApplier.empty(),
      profilerSteps: [],
      startTimeMs: 1_700_000_000_000,
    });
    expect(result.execution.start_time).toBe(1_700_000_000);
    expect(result.execution.end_time).toBe(1_700_000_001.5);
    expect(result.execution.duration).toBe(1500);
  });

  it('leaves timestamps null when the start hook never fired', () => {
    const result = build();
    expect(result.execution.start_time).toBeNull();
    expect(result.execution.end_time).toBeNull();
    expect(result.execution.duration).toBe(120);
  });
});

describe('status classification', () => {
  it('maps a passed spec to passed', () => {
    expect(build().execution.status).toBe('passed');
  });

  it('maps pending to skipped and todo to disabled', () => {
    expect(build({ status: 'pending', duration: null }).execution.status).toBe('skipped');
    expect(build({ status: 'todo', duration: null }).execution.status).toBe('disabled');
  });

  it('classifies an assertion failure as failed', () => {
    const result = build({
      status: 'failed',
      failureDetails: [{ matcherResult: { message: 'expect(received).toBe(expected)' } }],
      failureMessages: ['Error: expect(received).toBe(expected)\n    at foo.ts:1:1'],
    });
    expect(result.execution.status).toBe('failed');
    expect(result.message).toContain('expect(received)');
  });

  it('reports the real error message when a failure has no matcher result', () => {
    // Upstream substitutes the literal 'Runtime exception' here, losing the
    // actual error text.
    const result = build({
      status: 'failed',
      failureDetails: [{}],
      failureMessages: ['Error: database went away\n    at foo.ts:1:1'],
    });
    expect(result.message).toBe('Error: database went away');
  });

  it('classifies a non-assertion runtime error as invalid', () => {
    // Commons' shared rule: assertion failures are `failed`, everything else is
    // `invalid`. The Playwright and Vitest reporters classify identically.
    const result = build({
      status: 'failed',
      failureDetails: [{}],
      failureMessages: ['Error: database went away\n    at foo.ts:1:1'],
    });
    expect(result.execution.status).toBe('invalid');
  });

  it('strips ANSI colour codes from the stacktrace', () => {
    const esc = String.fromCharCode(27);
    const result = build({
      status: 'failed',
      failureDetails: [{ matcherResult: { message: 'expect failed' } }],
      failureMessages: [`${esc}[31mError: expect failed${esc}[39m`],
    });
    expect(result.execution.stacktrace).toBe('Error: expect failed');
    expect(result.execution.stacktrace).not.toContain(esc);
  });
});

describe('relations and multi-project', () => {
  it('builds the suite tree from file segments plus ancestor titles', () => {
    const titles = build().relations!.suite!.data.map((d) => d.title);
    expect(titles).toEqual(['src', 'utils', 'login.test.ts', 'Auth']);
  });

  it('never sets project_case_mapping (multi-project is dropped)', () => {
    expect(build().project_case_mapping).toBeNull();
    expect(build({ title: 'x (Tiden PROJ1: 1)' }).project_case_mapping).toBeNull();
  });
});

describe('metadata overlay', () => {
  it('applies comment, suite, fields, params, tags', () => {
    const meta = MetadataApplier.empty();
    meta.comment = 'a note';
    meta.suite = 'Custom Suite';
    meta.fields = { severity: 'high' };
    meta.parameters = { browser: 'chrome' };
    meta.groupParams = { shard: '1' };
    meta.tags = ['smoke'];

    const result = build({}, meta);
    expect(result.message).toBe('a note');
    expect(result.relations!.suite!.data).toEqual([
      { title: 'Custom Suite', public_id: null },
    ]);
    expect(result.fields).toEqual({ severity: 'high' });
    expect(result.params).toEqual({ browser: 'chrome' });
    expect(result.group_params).toEqual({ shard: '1' });
    expect(result.tags).toEqual(['smoke']);
  });
});

describe('rootDir', () => {
  // Only the BASE is configurable. jest keeps splitting the path on '/' into
  // one segment per directory — that shape is jest's and is unchanged here.
  it('resolves the spec file against rootDir when set', () => {
    const result = ResultBuilder.build({
      value: mkAssertion(),
      path: '/repo/app/frontend/src/login.test.ts',
      metadata: MetadataApplier.empty(),
      profilerSteps: [],
      rootDir: '/repo',
    });
    expect(result.signature).toBe('app::frontend::src::login.test.ts::auth::logs_in');
  });

  it('still splits the path on / — jest keeps its own segment shape', () => {
    const result = ResultBuilder.build({
      value: mkAssertion(),
      path: '/repo/a/b/login.test.ts',
      metadata: MetadataApplier.empty(),
      profilerSteps: [],
      rootDir: '/repo',
    });
    // The vitest reporter keeps the file whole ('a/b/login.test.ts'); jest
    // does not. Both are correct for their own reporter and must not be
    // carried across — see qase-tms/tiden-app#445.
    expect(result.signature).toBe('a::b::login.test.ts::auth::logs_in');
  });

  it('applies rootDir to the reported suite path too', () => {
    const result = ResultBuilder.build({
      value: mkAssertion(),
      path: '/repo/app/frontend/src/login.test.ts',
      metadata: MetadataApplier.empty(),
      profilerSteps: [],
      rootDir: '/repo',
    });
    const titles = result.relations?.suite?.data?.map((d: any) => d.title);
    expect(titles).toEqual(['app', 'frontend', 'src', 'login.test.ts', 'Auth']);
  });

  it('falls back to process.cwd() when rootDir is not set', () => {
    expect(build().signature).toBe(
      ResultBuilder.build({
        value: mkAssertion(),
        path: SPEC,
        metadata: MetadataApplier.empty(),
        profilerSteps: [],
        rootDir: process.cwd(),
      }).signature,
    );
  });
});

describe('normalizePath', () => {
  it('makes the path relative to the working directory', () => {
    expect(ResultBuilder.normalizePath(SPEC)).toBe('src/utils/login.test.ts');
  });

  it('leaves an unrelated path alone', () => {
    expect(ResultBuilder.normalizePath('/elsewhere/a.test.ts')).toBe('/elsewhere/a.test.ts');
  });

  it('normalizes Windows separators', () => {
    expect(ResultBuilder.normalizePath('C:\\repo\\a.test.ts')).toBe('C:/repo/a.test.ts');
  });
});
