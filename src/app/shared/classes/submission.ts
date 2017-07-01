import {SubmissionFile} from './submission-file';
import {GradingComponent} from './grading-component';
export class Submission {
  id: number;
  user: string;
  files: SubmissionFile[];
  components: GradingComponent[];
}
