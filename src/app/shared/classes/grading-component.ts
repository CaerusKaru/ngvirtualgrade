import {SubmissionFile} from './submission-file';
import {GradingRubric} from './grading-rubric';
import {Grader} from './grader';
export class GradingComponent {
  id: number;
  name: string;
  files: SubmissionFile[];
  rubric: GradingRubric;
  graders: Grader[];
  restricted: boolean;
}
