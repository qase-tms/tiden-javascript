/* eslint-disable */
import { buildTestIdentity } from '@tiden/reporter-commons/internal';

// The "identity not sent" warning is once per PROCESS. These suites build
// results for fake files and assert on console.warn for the file_path
// warnings, so an identity warning landing inside one of those tests would
// change its count (or satisfy a `toHaveBeenCalled` it should not). Spend it
// here, before any test runs, so the outcome never depends on which test builds
// first. The identity tests reset the flag themselves and live in their own
// file.
const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
buildTestIdentity({ file: undefined, describes: [], title: 'spend the once-per-process warning' });
warn.mockRestore();
