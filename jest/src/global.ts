import { Attachment, TestStepType } from '@tiden/reporter-commons';

import { JestTidenReporter } from './reporter';

/**
 * The bridge the userland `tiden.*` helpers in `./jest` call through.
 *
 * The reporter installs one instance as `global.Tiden` in its constructor.
 * That makes the whole metadata API in-process only: Jest runs specs in worker
 * processes while reporters live in the main process, so metadata written from
 * a test reaches the reporter only under `--runInBand` / `maxWorkers=1`. The
 * title-encoded `tiden(id, name)` channel has no such limitation.
 */
export class Tiden {
  private reporter: JestTidenReporter;

  constructor(reporter: JestTidenReporter) {
    this.reporter = reporter;
  }

  title(title: string): void {
    this.reporter.addTitle(title);
  }

  ignore(): void {
    this.reporter.addIgnore();
  }

  comment(value: string): void {
    this.reporter.addComment(value);
  }

  suite(value: string): void {
    this.reporter.addSuite(value);
  }

  fields(values: Record<string, string>): void {
    this.reporter.addFields(Tiden.stringify(values));
  }

  parameters(values: Record<string, string>): void {
    this.reporter.addParameters(Tiden.stringify(values));
  }

  groupParams(values: Record<string, string>): void {
    this.reporter.addGroupParams(Tiden.stringify(values));
  }

  tags(values: string[]): void {
    this.reporter.addTags(values);
  }

  step(step: TestStepType): void {
    this.reporter.addStep(step);
  }

  attachment(attachment: Attachment): void {
    this.reporter.addAttachment(attachment);
  }

  private static stringify(values: Record<string, string>): Record<string, string> {
    const stringRecord: Record<string, string> = {};
    for (const [key, value] of Object.entries(values)) {
      stringRecord[String(key)] = String(value);
    }
    return stringRecord;
  }
}
