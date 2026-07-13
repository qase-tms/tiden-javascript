export interface ExtractedStep {
  expectedResult: string | null;
  data: string | null;
  cleanedString: string;
}

/**
 * Parses a step string for inline `TidenExpRes:` (expected result) and `TidenData:`
 * (data) markers. Returns the extracted parts and the input string with markers
 * removed. If no markers are present, returns nulls and the original string.
 */
export function extractAndCleanStep(input: string): ExtractedStep {
  let expectedResult: string | null = null;
  let data: string | null = null;
  let cleanedString = input;

  const hasExpectedResult = input.includes('TidenExpRes:');
  const hasData = input.includes('TidenData:');

  if (hasExpectedResult || hasData) {
    const regex = /TidenExpRes:\s*:?\s*(.*?)\s*(?=TidenData:|$)TidenData:\s*:?\s*(.*)?/;
    const match = input.match(regex);

    if (match) {
      expectedResult = match[1]?.trim() ?? null;
      data = match[2]?.trim() ?? null;

      cleanedString = input
        .replace(/TidenExpRes:\s*:?\s*.*?(?=TidenData:|$)/, '')
        .replace(/TidenData:\s*:?\s*.*/, '')
        .trim();
    }
  }

  return { expectedResult, data, cleanedString };
}
