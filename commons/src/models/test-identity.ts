/**
 * The parts a test's identity is made of, as sent in `ResultCreate.identity`.
 * The server builds the identity key from them; a reporter never does.
 */
export interface TestIdentity {
  /** Language token (`[a-z0-9-]{1,20}`); always `js` for the JavaScript reporters. */
  language: string;
  /** Raw repository remote or `host/owner/repo`; the server normalizes it. */
  repository: string;
  /** Structural location: the repo-relative POSIX test file. */
  scope: string[];
  /** Test name path: describe titles, then the test title, all raw. */
  name: string[];
}
