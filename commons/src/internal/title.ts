const TIDEN_ID_TRAILER_REGEXP = /\(Tiden ID:? ([\d,]+)\)$/i;

/**
 * Strips a trailing `(Tiden ID: 1,2,3)` (or `(Tiden ID 1)` without colon) from a test title.
 * Returns the original title untouched if no match is found.
 */
export function removeTidenIdsFromTitle(title: string): string {
  const match = title.match(TIDEN_ID_TRAILER_REGEXP);
  if (match) {
    return title.replace(match[0], '').trimEnd();
  }
  return title;
}
