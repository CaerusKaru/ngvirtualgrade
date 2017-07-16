import {SubmissionStep} from './submission-step';
export class Assignment {
  id: number;
  name: string;
  description?: string;
  steps: SubmissionStep[];
}
