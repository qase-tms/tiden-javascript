/* eslint-disable */
import { describe, expect, it, beforeEach } from '@jest/globals';
import { AnnotationExtractor } from '../src/annotation-extractor';

describe('AnnotationExtractor', () => {
  let extractor: AnnotationExtractor;

  beforeEach(() => {
    extractor = new AnnotationExtractor();
  });

  describe('extractTidenIds', () => {
    it('returns an empty array when no tidenId annotations are present', () => {
      expect(extractor.extractTidenIds([{ type: 'tag', description: 'smoke' }])).toEqual([]);
    });

    it('parses a single id', () => {
      expect(extractor.extractTidenIds([{ type: 'tidenId', description: '7' }])).toEqual([7]);
    });

    it('parses a comma-separated list', () => {
      expect(extractor.extractTidenIds([{ type: 'tidenId', description: '1,2,3' }])).toEqual([1, 2, 3]);
    });

    it('is case-insensitive on the annotation type', () => {
      expect(extractor.extractTidenIds([{ type: 'TIDENID', description: '42' }])).toEqual([42]);
    });
  });

  describe('extractSuite', () => {
    it('collects tidenSuite descriptions in order', () => {
      expect(
        extractor.extractSuite([
          { type: 'tidenSuite', description: 'A' },
          { type: 'tidenSuite', description: 'B' },
        ]),
      ).toEqual(['A', 'B']);
    });
  });
});
