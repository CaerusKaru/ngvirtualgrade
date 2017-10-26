import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoursesHomeComponent} from '@app/courses/courses-home';
import {CoursesCourseComponent} from '@app/courses/courses-course';
import {CoursesItemComponent} from '@app/courses/courses-item';

const coursesRoutes: Routes = [
  {
    path: '',
    component: CoursesHomeComponent,
    data: {
      depth: 1
    }
  },
  {
    path: ':course',
    component: CoursesCourseComponent,
    data: {
      depth: 2
    }
  },
  {
    path: ':course/:id',
    component: CoursesItemComponent,
    data: {
      depth: 3
    }
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

