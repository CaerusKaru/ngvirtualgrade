import {Course} from './course';

export class Department {
  id: number;
  name: string;
  courses: Course[];
  privileges: string[];
}
