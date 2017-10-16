import { NgModule } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';
import {CoursesMaterialModule, CoursesHomeComponent, CoursesItemComponent, CoursesCourseComponent,
  SubmitAssignmentDialogComponent
} from '@app/courses';
import {CardButtonModule} from '@app/card-button';
import {SharedModule} from '@app/shared';
import {CoursesRoutingModule} from '@app/courses/courses-routing.module';

@NgModule({
  imports: [
    CoursesRoutingModule,
    SharedModule,
    CoursesMaterialModule,
    CardButtonModule,
    FileUploadModule,
  ],
  declarations: [
    CoursesHomeComponent,
    CoursesItemComponent,
    CoursesCourseComponent,
    SubmitAssignmentDialogComponent,
  ],
  entryComponents: [
    SubmitAssignmentDialogComponent,
  ],
  bootstrap: [
  ]
})
export class CoursesModule { }
