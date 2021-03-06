import {GradingComponent} from './grading-component';
import {SubmissionException} from './submission-exception';
export class SubmissionStep {
  id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  components: GradingComponent[];
  files: string[];
  allow_other_files: boolean;
  exceptions: SubmissionException[];
}
