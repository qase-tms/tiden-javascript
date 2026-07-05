/**
 * Generates a signature string from testops IDs and suites.
 *
 * Param-free by design: signature is the case-level identity input, kept
 * stable across every parameter combination of a parametrized case. Params
 * are hashed separately (at the attempt level) rather than folded in here.
 * @param testopsIds - Array of testops IDs or null
 * @param suites - Array of suite names
 * @returns Formatted signature string
 */
export const generateSignature = (
  testopsIds: number[] | null,
  suites: string[],
): string => {
  const parts: string[] = [];

  if (testopsIds && testopsIds.length > 0) {
    parts.push(testopsIds.join('-'));
  }

  if (suites.length > 0) {
    const processedSuites = suites
      .map(suite => suite.trim())
      .map(suite => suite.replace(/\\/g, '/'))
      .flatMap(suite => suite.split('::'))
      .map(suite => suite.trim())
      .flatMap(suite => suite.split('\t'))
      .map(suite => suite.trim())
      .map(suite => suite.replace(/\s+/g, '_'))
      .map(suite => suite.toLowerCase())
      .filter(suite => suite.length > 0);

    parts.push(processedSuites.join('::'));
  }

  return parts.join('::');
};
