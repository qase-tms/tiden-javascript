import type { ProjectCaseMapping } from '../models';
import { filterPositiveIds } from '../internal/filter-positive-ids';
import { LoggerInterface } from './logger';

/**
 * Result of parsing project/ID markers from a test title.
 * - legacyIds: from "(Tiden ID: 123)" or "(Tiden ID: 123,124)" — single-project mode.
 * - projectMapping: from "(Tiden PROJ1: 123)" etc. — multi-project mode (project code -> IDs).
 * - cleanedTitle: title with all such patterns removed.
 */
export interface ParsedProjectMapping {
  legacyIds: number[];
  projectMapping: ProjectCaseMapping;
  cleanedTitle: string;
}

/**
 * Result of parsing @tidenid / @tidenid.PROJ tags.
 * - legacyIds: from @tidenid(123) or @tidenid(123,124).
 * - projectMapping: from @tidenid.PROJ1(123,124).
 */
export interface ParsedTagsProjectMapping {
  legacyIds: number[];
  projectMapping: ProjectCaseMapping;
}

/** Matches @tidenid(123) or @tidenid.PROJ1(123,124). Allows negative numbers. */
const TIDENID_TAG_REGEXP = /@tidenid(?:\.([A-Za-z0-9_]+))?\(([-\d,]+)\)/gi;

/**
 * Parse @tidenid and @tidenid.PROJECT tags into legacy IDs and project mapping.
 *
 * @param tags — e.g. ["@tidenid(1,2)", "@tidenid.PROJ2(3)"]
 * @returns legacyIds from @tidenid(...), projectMapping from @tidenid.PROJ(...)
 */
export function parseProjectMappingFromTags(
  tags: string[],
  logger?: LoggerInterface,
): ParsedTagsProjectMapping {
  const legacyIds: number[] = [];
  const projectMapping: ProjectCaseMapping = {};

  for (const tag of tags) {
    let m: RegExpExecArray | null;
    const re = new RegExp(TIDENID_TAG_REGEXP.source, 'gi');
    while ((m = re.exec(tag)) !== null) {
      const projectCode = m[1]; // undefined for @tidenid(1)
      const idsStr = m[2] ?? '';
      const rawIds = idsStr
        .split(',')
        .map((s) => parseInt(s, 10))
        .filter((n) => !Number.isNaN(n));
      const ids = filterPositiveIds(rawIds, logger);

      if (!projectCode || projectCode.toUpperCase() === 'ID') {
        legacyIds.push(...ids);
      } else if (ids.length > 0) {
        const existing = projectMapping[projectCode] ?? [];
        projectMapping[projectCode] = [...existing, ...ids];
      }
    }
  }

  return { legacyIds, projectMapping };
}

/** Matches "(Tiden ID: 123)" or "(Tiden PROJ1: 123,124)" — optional space after "Tiden". Allows negative numbers. */
const TIDEN_MARKER_REGEXP = /\(Tiden\s+([A-Za-z0-9_]+):\s*([-\d,]+)\)/gi;

/**
 * Parse multi-project and legacy Tiden ID markers from a test title.
 * - "(Tiden ID: 123)" or "(Tiden ID: 123,124)" → legacyIds, single-project.
 * - "(Tiden PROJ1: 123)" or "(Tiden PROJ2: 456)" → projectMapping for multi-project mode.
 *
 * @param title — test title that may contain "(Tiden ID: …)" or "(Tiden PROJECT_CODE: …)".
 * @returns legacyIds, projectMapping, and cleanedTitle with all markers stripped.
 */
export function parseProjectMappingFromTitle(
  title: string,
  logger?: LoggerInterface,
): ParsedProjectMapping {
  const legacyIds: number[] = [];
  const projectMapping: ProjectCaseMapping = {};
  let cleanedTitle = title;

  let m: RegExpExecArray | null;
  const re = new RegExp(TIDEN_MARKER_REGEXP.source, 'gi');
  while ((m = re.exec(title)) !== null) {
    const projectCode = m[1] ?? '';
    const idsStr = m[2] ?? '';
    const rawIds = idsStr
      .split(',')
      .map((s) => parseInt(s, 10))
      .filter((n) => !Number.isNaN(n));
    const ids = filterPositiveIds(rawIds, logger);

    if (projectCode.toUpperCase() === 'ID') {
      legacyIds.push(...ids);
    } else if (projectCode && ids.length > 0) {
      const existing = projectMapping[projectCode] ?? [];
      projectMapping[projectCode] = [...existing, ...ids];
    }
    cleanedTitle = cleanedTitle.replace(m[0], '');
  }

  cleanedTitle = cleanedTitle.replace(/\s+/g, ' ').trim();
  return { legacyIds, projectMapping, cleanedTitle };
}

/**
 * Build a test title with multi-project markers for use in test names.
 * Use this (or framework-specific tiden.projects()) so the reporter can parse project and IDs.
 *
 * @param title — base test title (e.g. "Login flow").
 * @param mapping — project code → list of test case IDs (e.g. { PROJ1: [1, 2], PROJ2: [3] }).
 * @returns title with appended markers, e.g. "Login flow (Tiden PROJ1: 1,2) (Tiden PROJ2: 3)".
 */
export function formatTitleWithProjectMapping(
  title: string,
  mapping: ProjectCaseMapping,
): string {
  if (!title || typeof title !== 'string') {
    return title;
  }
  const parts = Object.entries(mapping)
    .filter(([, ids]) => Array.isArray(ids) && ids.length > 0)
    .map(([code, ids]) => `(Tiden ${code}: ${ids.join(',')})`);
  if (parts.length === 0) {
    return title.trim();
  }
  return `${title.trim()} ${parts.join(' ')}`;
}
