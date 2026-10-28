/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unnecessary-type-assertion, @typescript-eslint/require-await, @typescript-eslint/unbound-method */
import { expect } from '@jest/globals';
import { OptionsResolver } from '../../src/core/options-resolver';
import { ModeEnum } from '../../src/options';
import { EnvEnum, EnvRunEnum } from '../../src/env';

jest.mock('../../src/state/state', () => ({
  StateManager: {
    isStateExists: jest.fn(),
    getState: jest.fn(),
  },
}));

import { StateManager } from '../../src/state/state';

const resetEnv = () => {
  delete process.env[EnvEnum.mode];
  delete process.env[EnvRunEnum.id];
  delete process.env.TIDEN_MODE;
  delete process.env.TIDEN_API_TOKEN;
  delete process.env[EnvRunEnum.buildSha];
};

describe('OptionsResolver', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    resetEnv();
  });

  describe('detect withState', () => {
    it('is true for cypress frameworkName', () => {
      (StateManager.isStateExists as jest.Mock).mockReturnValue(false);
      const r = new OptionsResolver().resolve({
        frameworkName: 'cypress',
        frameworkPackage: 'cypress',
        reporterName: 'tiden-cypress',
        mode: ModeEnum.off,
      });
      expect(r.withState).toBe(true);
    });

    it('is true when frameworkName is missing', () => {
      (StateManager.isStateExists as jest.Mock).mockReturnValue(false);
      const r = new OptionsResolver().resolve({
        frameworkName: '',
        frameworkPackage: '',
        reporterName: '',
        mode: ModeEnum.off,
      });
      expect(r.withState).toBe(true);
    });

    it('is false for non-cypress frameworks', () => {
      (StateManager.isStateExists as jest.Mock).mockReturnValue(false);
      const r = new OptionsResolver().resolve({
        frameworkName: 'playwright',
        frameworkPackage: 'playwright',
        reporterName: 'tiden-playwright',
        mode: ModeEnum.off,
      });
      expect(r.withState).toBe(false);
    });
  });

  describe('state restore', () => {
    it('restores Mode env var when state flags mode changed', () => {
      (StateManager.isStateExists as jest.Mock).mockReturnValue(true);
      (StateManager.getState as jest.Mock).mockReturnValue({
        RunId: undefined,
        Mode: ModeEnum.report,
        IsModeChanged: true,
      });
      new OptionsResolver().resolve({
        frameworkName: 'cypress',
        frameworkPackage: 'cypress',
        reporterName: 'tiden-cypress',
      });
      expect(process.env[EnvEnum.mode]).toBe(ModeEnum.report.toString());
    });

    it('restores Run id env var when state has one', () => {
      (StateManager.isStateExists as jest.Mock).mockReturnValue(true);
      (StateManager.getState as jest.Mock).mockReturnValue({
        RunId: 42,
        Mode: undefined,
        IsModeChanged: false,
      });
      new OptionsResolver().resolve({
        frameworkName: 'cypress',
        frameworkPackage: 'cypress',
        reporterName: 'tiden-cypress',
      });
      expect(process.env[EnvRunEnum.id]).toBe('42');
    });

    it('does not read state when withState is false', () => {
      (StateManager.isStateExists as jest.Mock).mockReturnValue(true);
      new OptionsResolver().resolve({
        frameworkName: 'playwright',
        frameworkPackage: 'playwright',
        reporterName: 'tiden-playwright',
      });
      expect(StateManager.getState).not.toHaveBeenCalled();
    });
  });

  describe('effective modes', () => {
    it('defaults both mode and fallback to off when unset', () => {
      (StateManager.isStateExists as jest.Mock).mockReturnValue(false);
      const r = new OptionsResolver().resolve({
        frameworkName: 'playwright',
        frameworkPackage: 'playwright',
        reporterName: 'tiden-playwright',
      });
      expect(r.effectiveMode).toBe(ModeEnum.off);
      expect(r.effectiveFallback).toBe(ModeEnum.off);
    });

    it('passes through user-specified mode and fallback', () => {
      (StateManager.isStateExists as jest.Mock).mockReturnValue(false);
      const r = new OptionsResolver().resolve({
        frameworkName: 'playwright',
        frameworkPackage: 'playwright',
        reporterName: 'tiden-playwright',
        mode: ModeEnum.tiden,
        fallback: ModeEnum.report,
      });
      expect(r.effectiveMode).toBe(ModeEnum.tiden);
      expect(r.effectiveFallback).toBe(ModeEnum.report);
    });
  });

  describe('build SHA', () => {
    const resolveWith = (buildSha?: string) =>
      new OptionsResolver().resolve({
        frameworkName: 'playwright',
        frameworkPackage: 'playwright',
        reporterName: 'tiden-playwright',
        ...(buildSha === undefined ? {} : { tiden: { run: { buildSha } } }),
      } as any).composed.tiden?.run?.buildSha;

    beforeEach(() => {
      (StateManager.isStateExists as jest.Mock).mockReturnValue(false);
    });

    afterEach(() => {
      delete process.env[EnvRunEnum.buildSha];
    });

    it('prefers run.buildSha from the config over TIDEN_BUILD_SHA', () => {
      process.env[EnvRunEnum.buildSha] = 'from-env';

      expect(resolveWith('from-config')).toBe('from-config');
    });

    it('takes TIDEN_BUILD_SHA when the config sets no run.buildSha', () => {
      process.env[EnvRunEnum.buildSha] = 'from-env';

      expect(resolveWith()).toBe('from-env');
    });

    it('takes TIDEN_BUILD_SHA when the config\'s run.buildSha is blank', () => {
      process.env[EnvRunEnum.buildSha] = 'from-env';

      expect(resolveWith('  ')).toBe('from-env');
    });

    it('leaves run.buildSha unset when neither the config nor the environment sets it', () => {
      expect(resolveWith()).toBeUndefined();
    });
  });
});
