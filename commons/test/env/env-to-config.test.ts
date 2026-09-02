import { expect } from '@jest/globals';
import { envToConfig } from '../../src/env/env-to-config';
import { EnvType } from '../../src/env/env-type';
import { EnvConfigurationsEnum, EnvEnum } from '../../src/env/env-enum';

describe('envToConfig', () => {
  describe('rootDir', () => {
    // The base a case signature's spec-file segment is measured from. Every
    // producer reporting into one product must agree on it, or the same test
    // lands as two cases — see qase-tms/tiden-app#445.
    it('maps TIDEN_ROOT_DIR onto rootDir', () => {
      const env: EnvType = { [EnvEnum.rootDir]: '/repo' };

      expect(envToConfig(env).rootDir).toBe('/repo');
    });

    it('leaves rootDir undefined when TIDEN_ROOT_DIR is unset', () => {
      expect(envToConfig({}).rootDir).toBeUndefined();
    });
  });

  describe('configurations', () => {
    it('should parse configurations values from environment variable', () => {
      const env: EnvType = {
        [EnvConfigurationsEnum.values]: 'group1=value1,group2=value2,group3=value3',
      };

      const result = envToConfig(env);

      expect(result.tiden?.configurations).toEqual({
        values: [
          { name: 'group1', value: 'value1' },
          { name: 'group2', value: 'value2' },
          { name: 'group3', value: 'value3' },
        ],
      });
    });

    it('should handle configurations values with spaces', () => {
      const env: EnvType = {
        [EnvConfigurationsEnum.values]: 'group1=value1, group2 = value2 , group3= value3',
      };

      const result = envToConfig(env);

      expect(result.tiden?.configurations).toEqual({
        values: [
          { name: 'group1', value: 'value1' },
          { name: 'group2', value: 'value2' },
          { name: 'group3', value: 'value3' },
        ],
      });
    });

    it('should handle empty value in configurations', () => {
      const env: EnvType = {
        [EnvConfigurationsEnum.values]: 'group1=value1,group2=,group3=value3',
      };

      const result = envToConfig(env);

      expect(result.tiden?.configurations).toEqual({
        values: [
          { name: 'group1', value: 'value1' },
          { name: 'group2', value: '' },
          { name: 'group3', value: 'value3' },
        ],
      });
    });

    it('should return undefined when configurations values are not provided', () => {
      const env: EnvType = {};

      const result = envToConfig(env);

      expect(result.tiden?.configurations).toBeUndefined();
    });

    it('should handle single configurations value', () => {
      const env: EnvType = {
        [EnvConfigurationsEnum.values]: 'group1=value1',
      };

      const result = envToConfig(env);

      expect(result.tiden?.configurations).toEqual({
        values: [
          { name: 'group1', value: 'value1' },
        ],
      });
    });
  });
}); 
