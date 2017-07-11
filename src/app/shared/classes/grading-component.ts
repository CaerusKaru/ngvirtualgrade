import {SubmissionFile} from './submission-file';
import {GradingRubric} from './grading-rubric';
import {Grader} from './grader';

enum SubmissionType {
  STUDENT_UPLOAD = 'student',
  INSTRUCTOR_UPLOAD = 'instructor'
}

export class GradingComponent {
  id: number;
  name: string;
  files: string[];
  graders: Grader[];
  submission_type: SubmissionType;
  max_score: number;
  is_extra_credit: boolean;
}
