import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {GradingHomeComponent} from './grading-home/grading-home.component';
import {GradingItemComponent} from './grading-item/grading-item.component';
import {GradingCourseComponent} from './grading-course/grading-course.component';

export const gradingRoutes: Routes = [
  {
    path: '',
    component: GradingHomeComponent
  },
  {
    path: ':course',
    component: GradingCourseComponent
  },
  {
    path: ':course/:id',
    component: GradingItemComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(gradingRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class GradingRoutingModule {}

