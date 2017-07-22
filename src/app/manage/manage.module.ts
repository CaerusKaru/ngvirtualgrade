import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ManageRoutingModule} from './manage-routing.module';
import {ManageMaterialModule} from './manage-material/manage-material.module';
import { ManageHomeComponent } from './manage-home/manage-home.component';
import { ManageCourseComponent } from './manage-course/manage-course.component';
import { ManageDeptComponent } from './manage-dept/manage-dept.component';

@NgModule({
  imports: [
    CommonModule,
    ManageMaterialModule,
    ManageRoutingModule
  ],
  declarations: [ManageHomeComponent, ManageCourseComponent, ManageDeptComponent]
})
export class ManageModule { }
