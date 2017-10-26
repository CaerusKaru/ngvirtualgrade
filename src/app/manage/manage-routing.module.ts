import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ManageHomeComponent} from '@app/manage/manage-home';
import {ManageCreateComponent} from '@app/manage/manage-create';
import {ManageUsersComponent} from '@app/manage/manage-users';
import {ManageDeptComponent} from '@app/manage/manage-dept';
import {ManageCourseComponent} from '@app/manage/manage-course';

export const manageRoutes: Routes = [
  {
    path: '',
    component: ManageHomeComponent,
    data: {
      depth: 1
    }
  },
  {
    path: 'create',
    component: ManageCreateComponent,
    data: {
      depth: 2
    }
  },
  {
    path: 'users',
    component: ManageUsersComponent,
    data: {
      depth: 2
    }
  },
  {
    path: ':dept',
    component: ManageDeptComponent,
    data: {
      depth: 2
    }
  },
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

