// enum SubmissionType {
//   STUDENT_UPLOAD = 'student',
//   INSTRUCTOR_UPLOAD = 'instructor'
// }

export class GradingComponent {
  id: number;
  name: string;
  files: string[];
  submission_type: 'student' | 'instructor';
  max_score: number;
  is_extra_credit: boolean;
}
