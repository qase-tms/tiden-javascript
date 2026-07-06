/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unnecessary-type-assertion, @typescript-eslint/require-await */
import { expect } from '@jest/globals';
import { ReporterFactory } from '../../src/qase/reporter-factory';
import { ModeEnum, OptionsType } from '../../src/options';
import { ConfigType } from '../../src/config';
import { EnvApiEnum, EnvTidenEnum } from '../../src/env';
import { LoggerInterface } from '../../src/utils/logger';
import { HostData } from '../../src/models/host-data';
import { DisabledException } from '../../src/utils/disabled-exception';
import { TestOpsReporter, ReportReporter } from '../../src/reporters';
import { TidenApiClient } from '../../src/client/tiden-client';

const silentLogger = (): jest.Mocked<LoggerInterface> => ({
  log: jest.fn(),
  logDebug: jest.fn(),
  logError: jest.fn(),
});

const emptyHostData: HostData = {} as HostData;

const baseOptions = (): ConfigType & OptionsType =>
  ({
    frameworkName: 'playwright',
    frameworkPackage: 'playwright',
    reporterName: 'qase-playwright',
  }) as unknown as ConfigType & OptionsType;

describe('ReporterFactory', () => {
  let factory: ReporterFactory;

  beforeEach(() => {
    jest.clearAllMocks();
    factory = new ReporterFactory(silentLogger(), emptyHostData);
  });

  describe('off mode', () => {
    it('throws DisabledException', () => {
      expect(() => factory.create(ModeEnum.off, baseOptions(), false)).toThrow(
        DisabledException,
      );
    });
  });

  describe('tiden mode validation', () => {
    it('throws when token missing', () => {
      const opts = { ...baseOptions(), tiden: { product: 'DEMO' } } as any;
      expect(() => factory.create(ModeEnum.tiden, opts, false)).toThrow(
        new RegExp(`tiden.api.token.*${EnvApiEnum.token}`),
      );
    });

    it('throws when product missing', () => {
      const opts = { ...baseOptions(), tiden: { api: { token: 't' } } } as any;
      expect(() => factory.create(ModeEnum.tiden, opts, false)).toThrow(
        new RegExp(`tiden.product.*${EnvTidenEnum.product}`),
      );
    });

    it('creates TestOpsReporter when options are valid', () => {
      const opts = {
        ...baseOptions(),
        tiden: { api: { token: 't' }, product: 'DEMO' },
      } as any;
      const r = factory.create(ModeEnum.tiden, opts, false);
      expect(r).toBeInstanceOf(TestOpsReporter);
      // The reporter's api client should be a TidenApiClient wired against the
      // supplied tiden config (private field access, mirrors the client_meta
      // plumb-through in ReporterFactory.createTestOps).
      expect((r as TestOpsReporter)['api']).toBeInstanceOf(TidenApiClient);
    });

    it('builds client_meta from hostData and framework/reporter names', () => {
      const hostData: HostData = {
        system: 'linux',
        machineName: 'host',
        release: '1.0',
        version: '1.0',
        arch: 'x64',
        language: 'v20',
        packageManager: 'npm',
        framework: '1.2.3',
        reporter: '4.5.6',
        commons: '7.8.9',
      };
      const localFactory = new ReporterFactory(silentLogger(), hostData);
      const opts = {
        ...baseOptions(),
        tiden: { api: { token: 't' }, product: 'DEMO' },
      } as any;
      localFactory.create(ModeEnum.tiden, opts, false);
      expect(opts.tiden.clientMeta).toEqual({
        framework: 'playwright',
        reporter: 'qase-playwright',
        framework_version: '1.2.3',
        reporter_version: '4.5.6',
        commons_version: '7.8.9',
        os: 'linux',
        node: 'v20',
      });
    });
  });

  describe('report mode', () => {
    it('creates ReportReporter', () => {
      const opts = { ...baseOptions() } as any;
      const r = factory.create(ModeEnum.report, opts, false);
      expect(r).toBeInstanceOf(ReportReporter);
    });
  });

  describe('unknown mode', () => {
    it('throws', () => {
      expect(() =>
        factory.create('garbage' as ModeEnum, baseOptions(), false),
      ).toThrow('Unknown mode type');
    });
  });
});
