import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GradingHomeComponent} from '@app/grading/grading-home';
import {GradingCourseComponent} from '@app/grading/grading-course';
import {GradingGuard} from '@app/grading/shared';
import {GradingItemComponent} from '@app/grading/grading-item';

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

