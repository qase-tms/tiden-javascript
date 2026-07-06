import { filterPositiveIds } from '../internal/filter-positive-ids';
import { LoggerInterface } from './logger';

/**
 * Result of parsing "(Tiden ID: n)" markers from a test title.
 * - legacyIds: from "(Tiden ID: 123)" or "(Tiden ID: 123,124)".
 * - cleanedTitle: title with all such patterns removed.
 */
export interface ParsedTidenId {
  legacyIds: number[];
  cleanedTitle: string;
}

/** Matches "(Tiden ID: 123)" or "(Tiden ID: 123,124)". Allows negative numbers. */
const TIDEN_ID_MARKER_REGEXP = /\(Tiden\s+ID:\s*([-\d,]+)\)/gi;

/**
 * Parse "(Tiden ID: …)" markers from a test title.
 *
 * @param title — test title that may contain "(Tiden ID: …)".
 * @returns legacyIds and cleanedTitle with all markers stripped.
 */
export function parseTidenIdFromTitle(
  title: string,
  logger?: LoggerInterface,
): ParsedTidenId {
  const legacyIds: number[] = [];
  let cleanedTitle = title;

  let m: RegExpExecArray | null;
  const re = new RegExp(TIDEN_ID_MARKER_REGEXP.source, 'gi');
  while ((m = re.exec(title)) !== null) {
    const idsStr = m[1] ?? '';
    const rawIds = idsStr
      .split(',')
      .map((s) => parseInt(s, 10))
      .filter((n) => !Number.isNaN(n));
    legacyIds.push(...filterPositiveIds(rawIds, logger));
    cleanedTitle = cleanedTitle.replace(m[0], '');
  }

  cleanedTitle = cleanedTitle.replace(/\s+/g, ' ').trim();
  return { legacyIds, cleanedTitle };
}
