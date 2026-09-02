import { ModeEnum, OptionsType } from '../../src/options';
import type { TidenReporter as TidenReporterType } from '../../src/tiden';

/**
 * A disabled reporter is indistinguishable from a working one: the suite runs,
 * the tests pass, and nothing reaches Tiden. A field user concluded the
 * reporter was broken and spent an hour on it before finding `mode: 'off'` in
 * their own jest.config.js (report of 2026-09-02). These assert that the
 * reporter says why it is inert, on the console, without needing debug mode.
 */
describe('TidenReporter disabled announcement', () => {
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.resetModules();
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const lines = (): string =>
    (logSpy.mock.calls as unknown[][])
      .map((call) => String(call[0]))
      .join('\n');

  // Re-required per case: TidenReporter is a singleton with no reset, so a
  // fresh module registry is the only way to build it twice with different
  // options.
  const build = (options: Partial<OptionsType>): void => {
    const mod = jest.requireActual<{
      TidenReporter: { getInstance(o: OptionsType): TidenReporterType };
    }>('../../src/tiden');
    mod.TidenReporter.getInstance({
      frameworkPackage: 'jest',
      frameworkName: 'jest',
      reporterName: '@tiden/jest-reporter',
      ...options,
    } as OptionsType);
  };

  it('says why it is disabled when mode is off', () => {
    build({ mode: ModeEnum.off });

    const out = lines();
    expect(out).toContain('reporter disabled');
    expect(out).toContain('nothing will be reported to Tiden');
    expect(out).toContain('mode is "off"');
  });

  it('names the missing credentials when tiden mode cannot start and fallback is off', () => {
    build({ mode: ModeEnum.tiden, fallback: ModeEnum.off, tiden: {} });

    const out = lines();
    expect(out).toContain('reporter disabled');
    // The three env vars the factory requires, which is the whole point: the
    // old behavior left the operator to discover them from a stack trace.
    expect(out).toContain('TIDEN_API_TOKEN');
    expect(out).toContain('TIDEN_PRODUCT_ID');
    expect(out).toContain('TIDEN_BASE_URL');
  });

  it('stays quiet when the reporter is actually working', () => {
    build({ mode: ModeEnum.report });

    expect(lines()).not.toContain('reporter disabled');
  });
});
