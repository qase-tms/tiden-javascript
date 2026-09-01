/* eslint-disable */
import { describe, it, expect } from '@jest/globals';

import { ProfilerTracker } from '../src/profiler-tracker';

describe('with no profiler configured', () => {
  it('no-ops and yields no steps', () => {
    const tracker = new ProfilerTracker(null);
    expect(() => tracker.enable()).not.toThrow();
    expect(() => tracker.restore()).not.toThrow();
    expect(tracker.getNewSteps()).toEqual([]);
  });
});

describe('with a profiler', () => {
  const mkProfiler = (steps: any[]) => ({
    enable: jest.fn(),
    restore: jest.fn(),
    getAllSteps: jest.fn(() => steps),
  });

  it('delegates enable and restore', () => {
    const profiler = mkProfiler([]);
    const tracker = new ProfilerTracker(profiler as any);
    tracker.enable();
    tracker.restore();
    expect(profiler.enable).toHaveBeenCalledTimes(1);
    expect(profiler.restore).toHaveBeenCalledTimes(1);
  });

  it('returns only steps recorded since the previous call', () => {
    const steps: any[] = [{ id: 1 }];
    const tracker = new ProfilerTracker(mkProfiler(steps) as any);

    expect(tracker.getNewSteps()).toEqual([{ id: 1 }]);
    expect(tracker.getNewSteps()).toEqual([]);

    steps.push({ id: 2 });
    expect(tracker.getNewSteps()).toEqual([{ id: 2 }]);
  });
});
