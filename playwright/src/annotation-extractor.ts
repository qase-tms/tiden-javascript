import { parseTidenIdsFromString } from '@tiden/reporter-commons/internal';

export type Annotation = { type: string; description?: string };

export class AnnotationExtractor {
  extractTidenIds(annotations: Annotation[]): number[] {
    const ids: number[] = [];
    for (const item of annotations) {
      if (item.type.toLowerCase() === 'tidenid' && item.description) {
        ids.push(...parseTidenIdsFromString(item.description));
      }
    }
    return ids;
  }

  extractSuite(annotations: Annotation[]): string[] {
    const suites: string[] = [];
    for (const item of annotations) {
      if (item.type.toLowerCase() === 'tidensuite' && item.description) {
        suites.push(item.description);
      }
    }
    return suites;
  }
}
