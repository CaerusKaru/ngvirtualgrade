import { NgModule } from '@angular/core';
import {SharedModule} from '@app/shared';
import {ManageMaterialModule, ManageHomeComponent, ManageCourseComponent, ManageDeptComponent,
  ManageUsersComponent, ManageCreateComponent
} from '@app/manage';
import {CardButtonModule} from '@app/card-button';
import {ManageRoutingModule} from '@app/manage/manage-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ManageMaterialModule,
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
