import { Attachment, TestStepType } from '@tiden/reporter-commons';

/**
 * Per-test metadata collected from the userland `tiden.*` API between two
 * `onTestCaseResult` hooks. Populated through the `global.Tiden` bridge, so it
 * is only reachable when the tests and the reporter share a process — see the
 * README's note on `--runInBand`.
 */
export interface Metadata {
  title: string | undefined;
  ignore: boolean;
  comment: string | undefined;
  suite: string | undefined;
  fields: Record<string, string>;
  parameters: Record<string, string>;
  groupParams: Record<string, string>;
  tags: string[];
  steps: TestStepType[];
  attachments: Attachment[];
}
