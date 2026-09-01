export interface ExtractedStep {
  expectedResult: string | null;
  data: string | null;
  cleanedString: string;
}

const EXPECTED_RESULT_MARKER = 'TidenExpRes:';
const DATA_MARKER = 'TidenData:';

/**
 * Drops the marker's optional second colon and the surrounding whitespace, so
 * that both `TidenExpRes: value` and `TidenExpRes:: value` yield `value`.
 *
 * Anchored and always matchable, so it cannot backtrack.
 */
function readMarkerValue(raw: string): string {
  return raw.replace(/^\s*:?\s*/, '').trim();
}

/**
 * Parses a step string for inline `TidenExpRes:` (expected result) and `TidenData:`
 * (data) markers. Returns the extracted parts and the input string with markers
 * removed. If no markers are present, returns nulls and the original string.
 *
 * Index-based rather than regex-matched: a single pattern spanning both markers
 * needs an ambiguous `\s*:?\s*` prefix, which backtracks polynomially on a step
 * name containing a long run of spaces (CodeQL js/polynomial-redos). Slicing is
 * linear, and it also keeps multiline marker values intact, which `.` did not.
 */
export function extractAndCleanStep(input: string): ExtractedStep {
  const expectedResultIndex = input.indexOf(EXPECTED_RESULT_MARKER);
  const dataIndex = input.indexOf(DATA_MARKER);

  if (expectedResultIndex === -1 && dataIndex === -1) {
    return { expectedResult: null, data: null, cleanedString: input };
  }

  // Each marker's value runs until the next marker, or to the end of the input.
  const expectedResultEnd = dataIndex > expectedResultIndex ? dataIndex : input.length;
  const dataEnd = expectedResultIndex > dataIndex ? expectedResultIndex : input.length;

  const expectedResult =
    expectedResultIndex === -1
      ? null
      : readMarkerValue(
          input.slice(expectedResultIndex + EXPECTED_RESULT_MARKER.length, expectedResultEnd),
        );

  const data =
    dataIndex === -1
      ? ''
      : readMarkerValue(input.slice(dataIndex + DATA_MARKER.length, dataEnd));

  const markerIndexes = [expectedResultIndex, dataIndex].filter((index) => index !== -1);

  return {
    expectedResult,
    // an omitted data value stays `null`, matching the long-standing contract
    data: data === '' ? null : data,
    cleanedString: input.slice(0, Math.min(...markerIndexes)).trim(),
  };
}
