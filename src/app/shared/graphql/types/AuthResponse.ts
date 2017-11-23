import {Course, Manage, Term} from '@app/shared/classes';

export interface AuthResponse {
  user: {
    id: number;
    grading: Course[];
    admin: Course[];
    courses: Course[];
    instr: Course[];
    manage: Manage;
    username: string;
    term: Term;
  }
}
