import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesHomeComponent } from './courses-home/courses-home.component';
import {CoursesRoutingModule} from './courses-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { CoursesItemComponent } from './courses-item/courses-item.component';
import {CoursesMaterialModule} from './courses-material/courses-material.module';
import { CoursesCourseComponent } from './courses-course/courses-course.component';

@NgModule({
  imports: [
    CommonModule,
    CoursesRoutingModule,
    FlexLayoutModule,
    CoursesMaterialModule
  ],
  declarations: [CoursesHomeComponent, CoursesItemComponent, CoursesCourseComponent]
})
export class CoursesModule { }
