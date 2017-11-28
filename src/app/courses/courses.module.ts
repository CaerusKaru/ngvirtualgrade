import { NgModule } from '@angular/core';
import {CardButtonModule} from '@app/card-button';
import {SharedModule} from '@app/shared';
import {CoursesRoutingModule} from '@app/courses/courses-routing.module';
import {MaterialModule} from '@app/courses/material.module';
import {CoursesHomeComponent} from '@app/courses/courses-home';
import {CoursesItemComponent} from '@app/courses/courses-item';
import {CoursesCourseComponent, SubmitAssignmentDialogComponent} from '@app/courses/courses-course';

@NgModule({
  imports: [
    CoursesRoutingModule,
    SharedModule,
    MaterialModule,
    CardButtonModule,
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
