import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ManageHomeComponent} from './manage-home/manage-home.component';
import {ManageCourseComponent} from './manage-course/manage-course.component';
import {ManageDeptComponent} from './manage-dept/manage-dept.component';

export const manageRoutes: Routes = [
  {
    path: '',
    component: ManageHomeComponent,
    data: {
      depth: 1
    }
  },
  {
    path: ':dept',
    component: ManageDeptComponent,
    data: {
      depth: 2
    }
  }
  ,
  {
    path: ':dept/:id',
    component: ManageCourseComponent,
    data: {
      depth: 3
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(manageRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ManageRoutingModule {}

