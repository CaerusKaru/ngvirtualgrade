import {Grader} from './grader';
import {Admin} from './admin';
import {Assignment} from './assignment';
export class Course {
  id: number;
  name: string;
  graders: Grader[];
  admins: Admin[];
  assignments: Assignment[];
}
