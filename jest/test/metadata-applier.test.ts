/* eslint-disable */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { StepType, TestStepType } from '@tiden/reporter-commons';

import { MetadataApplier } from '../src/metadata-applier';

let applier: MetadataApplier;

beforeEach(() => {
  applier = new MetadataApplier();
});

describe('empty', () => {
  it('starts with nothing set', () => {
    const meta = MetadataApplier.empty();
    expect(meta.title).toBeUndefined();
    expect(meta.ignore).toBe(false);
    expect(meta.fields).toEqual({});
    expect(meta.tags).toEqual([]);
    expect(meta.steps).toEqual([]);
    expect(meta.attachments).toEqual([]);
  });
});

describe('scalar values overwrite', () => {
  it('applies title, comment and suite', () => {
    applier.applyTitle('T');
    applier.applyComment('C');
    applier.applySuite('S');
    expect(applier.get()).toMatchObject({ title: 'T', comment: 'C', suite: 'S' });
  });

  it('latches ignore', () => {
    applier.applyIgnore();
    expect(applier.get().ignore).toBe(true);
  });
});

describe('record values replace wholesale', () => {
  it('replaces fields, parameters and group params', () => {
    applier.applyFields({ a: '1' });
    applier.applyFields({ b: '2' });
    applier.applyParameters({ p: '1' });
    applier.applyGroupParams({ g: '1' });

    expect(applier.get().fields).toEqual({ b: '2' });
    expect(applier.get().parameters).toEqual({ p: '1' });
    expect(applier.get().groupParams).toEqual({ g: '1' });
  });
});

describe('tags accumulate', () => {
  it('appends across calls', () => {
    applier.applyTags(['smoke']);
    applier.applyTags(['regression']);
    expect(applier.get().tags).toEqual(['smoke', 'regression']);
  });
});

describe('applyStep', () => {
  const mkStep = (action: string) => {
    const step = new TestStepType(StepType.TEXT);
    step.data = { action, expected_result: null, data: null } as any;
    return step;
  };

  it('splits the expected result and data back out of the step name', () => {
    applier.applyStep(mkStep('Open page TidenExpRes:: Page opens TidenData:: url=/home'));
    const stored = applier.get().steps[0]!.data as any;
    expect(stored.action).toBe('Open page');
    expect(stored.expected_result).toBe('Page opens');
    expect(stored.data).toBe('url=/home');
  });

  it('leaves a plain step name untouched', () => {
    applier.applyStep(mkStep('Open page'));
    const stored = applier.get().steps[0]!.data as any;
    expect(stored.action).toBe('Open page');
    expect(stored.expected_result).toBeNull();
  });
});

describe('attachments', () => {
  it('accumulates', () => {
    applier.applyAttachment({
      id: 'a',
      file_name: 'f.txt',
      mime_type: 'text/plain',
      file_path: null,
      content: 'x',
      size: 1,
    });
    expect(applier.get().attachments).toHaveLength(1);
  });
});

describe('reset', () => {
  it('clears everything between tests', () => {
    applier.applyTitle('T');
    applier.applyTags(['smoke']);
    applier.applyIgnore();
    applier.reset();

    expect(applier.get().title).toBeUndefined();
    expect(applier.get().tags).toEqual([]);
    expect(applier.get().ignore).toBe(false);
  });
});
