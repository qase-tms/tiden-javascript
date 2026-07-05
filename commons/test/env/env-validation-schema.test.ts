import { expect } from '@jest/globals';
import envSchema from 'env-schema';
import { envValidationSchema } from '../../src/env/env-validation-schema';
import { EnvConfigurationsEnum } from '../../src/env/env-enum';

describe('envValidationSchema', () => {
  describe('configurations environment variables', () => {
    it('should validate valid configurations values', () => {
      const env = {
        [EnvConfigurationsEnum.values]: 'group1=value1,group2=value2',
      };

      const result = envSchema({
        schema: envValidationSchema,
        data: env,
      });

      expect(result[EnvConfigurationsEnum.values]).toBe('group1=value1,group2=value2');
    });

    it('should validate configurations values as string', () => {
      const env = {
        [EnvConfigurationsEnum.values]: 'group1=value1',
      };

      const result = envSchema({
        schema: envValidationSchema,
        data: env,
      });

      expect(result[EnvConfigurationsEnum.values]).toBe('group1=value1');
    });

    it('should handle missing configurations values', () => {
      const env = {};

      const result = envSchema({
        schema: envValidationSchema,
        data: env,
      });

      expect(result[EnvConfigurationsEnum.values]).toBeUndefined();
    });

    it('should handle null configurations values', () => {
      const env = {
        [EnvConfigurationsEnum.values]: null,
      };

      const result = envSchema({
        schema: envValidationSchema,
        data: env,
      });

      expect(result[EnvConfigurationsEnum.values]).toBeNull();
    });
  });
}); 
