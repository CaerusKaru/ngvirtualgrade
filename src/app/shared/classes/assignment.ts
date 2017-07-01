import {Submission} from './submission';
import {GradingComponent} from './grading-component';
export class Assignment {
  id: number;
  name: string;
  submissions: Submission[];
  components: GradingComponent[];
}
