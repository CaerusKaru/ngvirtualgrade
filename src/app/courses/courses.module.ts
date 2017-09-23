import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesHomeComponent } from './courses-home/courses-home.component';
import {CoursesRoutingModule} from './courses-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { CoursesItemComponent } from './courses-item/courses-item.component';
import {CoursesMaterialModule} from './courses-material/courses-material.module';
import {CoursesCourseComponent, SubmitAssignmentDialogComponent} from './courses-course/courses-course.component';
import {CardButtonModule} from '../card-button/index';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    CoursesRoutingModule,
    FlexLayoutModule,
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
