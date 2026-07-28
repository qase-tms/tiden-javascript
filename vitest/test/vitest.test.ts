/* eslint-disable */
import { describe, it, expect } from '@jest/globals';
import { addTidenId } from '../src/vitest';

describe('vitest.ts - Main functions', () => {
  describe('addTidenId', () => {
    it('should add Tiden ID to test name', () => {
      const name = 'Test Name';
      const caseIds = [123, 456];
      const result = addTidenId(name, caseIds);
      expect(result).toBe('Test Name (Tiden ID: 123,456)');
    });

    it('should handle single Tiden ID', () => {
      const name = 'Single Test';
      const caseIds = [789];
      const result = addTidenId(name, caseIds);
      expect(result).toBe('Single Test (Tiden ID: 789)');
    });

    it('should handle empty array of Tiden IDs', () => {
      const name = 'Empty Test';
      const caseIds: number[] = [];
      const result = addTidenId(name, caseIds);
      expect(result).toBe('Empty Test (Tiden ID: )');
    });

    it('should handle special characters in name', () => {
      const name = 'Test with special chars: !@#$%^&*()';
      const caseIds = [123];
      const result = addTidenId(name, caseIds);
      expect(result).toBe('Test with special chars: !@#$%^&*() (Tiden ID: 123)');
    });
  });

  describe('withTiden', () => {
    it('should be a function', () => {
      const { withTiden } = require('../src/vitest');
      expect(typeof withTiden).toBe('function');
    });

    it('should return a function', () => {
      const { withTiden } = require('../src/vitest');
      const testFn = () => {};
      const wrappedFn = withTiden(testFn);
      expect(typeof wrappedFn).toBe('function');
    });

    it('injects a tiden wrapper into the test context', async () => {
      const { withTiden } = require('../src/vitest');
      const annotate = jest.fn().mockResolvedValue(undefined);
      let seen: any;
      await withTiden(async (ctx: any) => { seen = ctx; })({ annotate });
      expect(typeof seen.tiden.title).toBe('function');
      expect(seen.annotate).toBe(annotate);
    });

    it('tiden.title emits a "Tiden Title" annotation', async () => {
      const { withTiden } = require('../src/vitest');
      const annotate = jest.fn().mockResolvedValue(undefined);
      await withTiden(async ({ tiden }: any) => { await tiden.title('My Title'); })({ annotate });
      expect(annotate).toHaveBeenCalledWith('Tiden Title: My Title', {
        type: 'tiden-title',
        body: 'My Title',
      });
    });
  });

  describe('Exports', () => {
    it('should export addTidenId', () => {
      const { addTidenId } = require('../src/vitest');
      expect(typeof addTidenId).toBe('function');
    });

    it('should export withTiden', () => {
      const { withTiden } = require('../src/vitest');
      expect(typeof withTiden).toBe('function');
    });
  });
});
