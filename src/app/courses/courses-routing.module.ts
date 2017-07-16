import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {CoursesHomeComponent} from './courses-home/courses-home.component';
import {CoursesItemComponent} from './courses-item/courses-item.component';
import {CoursesCourseComponent} from './courses-course/courses-course.component';

const coursesRoutes: Routes = [
  {
    path: '',
    component: CoursesHomeComponent
  },
  {
    path: ':course',
    component: CoursesCourseComponent
  },
  {
    path: ':course/:id',
    component: CoursesItemComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(coursesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CoursesRoutingModule {}

