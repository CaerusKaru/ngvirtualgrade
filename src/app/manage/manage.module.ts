import { NgModule } from '@angular/core';
import {SharedModule} from '@app/shared';
import {CardButtonModule} from '@app/card-button';
import {ManageRoutingModule} from '@app/manage/manage-routing.module';
import {ManageHomeComponent} from '@app/manage/manage-home';
import {ManageCourseComponent} from '@app/manage/manage-course';
import {ManageDeptComponent} from '@app/manage/manage-dept';
import {ManageUsersComponent} from '@app/manage/manage-users';
import {ManageCreateComponent} from '@app/manage/manage-create';
import {MaterialModule} from '@app/manage/material.module';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    ManageRoutingModule,
    CardButtonModule,
  ],
  declarations: [
    ManageHomeComponent,
    ManageCourseComponent,
    ManageDeptComponent,
    ManageUsersComponent,
    ManageCreateComponent,
  ]
})
export class ManageModule { }
