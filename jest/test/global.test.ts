/* eslint-disable */
import { describe, it, expect, beforeEach } from '@jest/globals';

import { Tiden } from '../src/global';

const reporter = {
  addTitle: jest.fn(),
  addIgnore: jest.fn(),
  addComment: jest.fn(),
  addSuite: jest.fn(),
  addFields: jest.fn(),
  addParameters: jest.fn(),
  addGroupParams: jest.fn(),
  addTags: jest.fn(),
  addStep: jest.fn(),
  addAttachment: jest.fn(),
};

let bridge: Tiden;

beforeEach(() => {
  jest.clearAllMocks();
  bridge = new Tiden(reporter as any);
});

describe('Tiden bridge', () => {
  it('forwards title, comment, suite and ignore', () => {
    bridge.title('T');
    bridge.comment('C');
    bridge.suite('S');
    bridge.ignore();

    expect(reporter.addTitle).toHaveBeenCalledWith('T');
    expect(reporter.addComment).toHaveBeenCalledWith('C');
    expect(reporter.addSuite).toHaveBeenCalledWith('S');
    expect(reporter.addIgnore).toHaveBeenCalledTimes(1);
  });

  it('forwards tags as an array', () => {
    bridge.tags(['smoke', 'regression']);
    expect(reporter.addTags).toHaveBeenCalledWith(['smoke', 'regression']);
  });

  it('coerces field, parameter and group-param values to strings', () => {
    bridge.fields({ count: 3 } as any);
    bridge.parameters({ flag: true } as any);
    bridge.groupParams({ shard: 1 } as any);

    expect(reporter.addFields).toHaveBeenCalledWith({ count: '3' });
    expect(reporter.addParameters).toHaveBeenCalledWith({ flag: 'true' });
    expect(reporter.addGroupParams).toHaveBeenCalledWith({ shard: '1' });
  });

  it('forwards steps and attachments unchanged', () => {
    const step = { id: 's' } as any;
    const attachment = { id: 'a' } as any;
    bridge.step(step);
    bridge.attachment(attachment);

    expect(reporter.addStep).toHaveBeenCalledWith(step);
    expect(reporter.addAttachment).toHaveBeenCalledWith(attachment);
  });
});
