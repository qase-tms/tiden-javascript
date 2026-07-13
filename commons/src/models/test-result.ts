import { TestStepType } from './test-step';
import { Attachment } from './attachment';
import { TestExecution } from './test-execution';

/**
 * Project code to test case IDs mapping for multi-project support.
 * Key: project code (string), Value: array of test case IDs (numbers).
 */
export type ProjectCaseMapping = Record<string, number[]>;

export class TestResultType {
  id: string;
  title: string;
  signature: string;
  run_id: number | null;
  case_id: number | number[] | null;
  /**
   * Multi-project mapping: project code -> array of test case IDs.
   * When set, overrides case_id for multi-project mode.
   * If empty/null, fall back to case_id for single project.
   */
  project_case_mapping: ProjectCaseMapping | null;
  execution: TestExecution;
  fields: Record<string, string>;
  attachments: Attachment[];
  steps: TestStepType[];
  params: Record<string, string>;
  group_params: Record<string, string>;
  author: string | null;
  relations: Relation | null;
  muted: boolean;
  message: string | null;
  tags: string[];
  preparedAttachments?: string[];

  constructor(title: string) {
    this.id = '';
    this.title = title;
    this.signature = '';
    this.run_id = null;
    this.case_id = null;
    this.project_case_mapping = null;
    this.execution = new TestExecution();
    this.fields = {};
    this.attachments = [];
    this.steps = [];
    this.params = {};
    this.group_params = {};
    this.author = null;
    this.relations = null;
    this.muted = false;
    this.message = null;
    this.tags = [];
    this.preparedAttachments = [];
  }
}

export interface Relation {
  suite?: Suite
}

export interface Suite {
  data: SuiteData[]
}

export interface SuiteData {
  title: string
  public_id: number | null
}
