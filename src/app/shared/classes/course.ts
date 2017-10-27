import {Assignment} from './assignment';
import {Term} from '@app/shared/classes/term';
export class Course {
  id: number;
  name: string;
  assigns: Assignment[];
  term: Term;
}
