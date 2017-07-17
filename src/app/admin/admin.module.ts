import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import {AdminRoutingModule} from './admin-routing.module';
import { AdminItemComponent } from './admin-item/admin-item.component';
import { AdminCreateComponent } from './admin-create/admin-create.component';
import {AdminMaterialModule} from './admin-material/admin-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import { AdminCourseComponent } from './admin-course/admin-course.component';
import {ColorNameModule} from '../color-name/index';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FlexLayoutModule,
    AdminMaterialModule,
    AdminRoutingModule,
    ColorNameModule
  ],
  declarations: [AdminHomeComponent, AdminItemComponent, AdminCreateComponent, AdminCourseComponent]
})
export class AdminModule { }
