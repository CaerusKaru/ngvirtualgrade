import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {GradingHomeComponent} from './grading-home/grading-home.component';
import {GradingItemComponent} from './grading-item/grading-item.component';
import {GradingCourseComponent} from './grading-course/grading-course.component';
import {GradingGuard} from './shared/grading.guard';

export const gradingRoutes: Routes = [
  {
    path: '',
    component: GradingHomeComponent,
    data: {
      depth: 1
    }
  },
  {
    path: ':course',
    component: GradingCourseComponent,
    canActivate: [GradingGuard],
    data: {
      depth: 2
    }
  },
  {
    path: ':course/:id',
    component: GradingItemComponent,
    canActivate: [GradingGuard],
    data: {
      depth: 3
    }
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

