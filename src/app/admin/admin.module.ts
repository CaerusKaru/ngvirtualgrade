import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '@app/shared';
import {AdminRoutingModule} from '@app/admin/admin-routing.module';
import {AdminHomeComponent} from '@app/admin/admin-home';
import {AdminItemComponent} from '@app/admin/admin-item';
import {
  AdminCreateComponent, CreateComponentComponent, CreateInstructorComponent,
  CreateStepComponent, CreateStudentComponent
} from '@app/admin/admin-create';
import {AdminGradersComponent} from '@app/admin/admin-graders';
import {AdminCourseComponent} from '@app/admin/admin-course';
import {AdminGradebookComponent} from '@app/admin/admin-gradebook';
import {AdminCalendarComponent} from '@app/admin/admin-calendar';
import {AdminGuard} from '@app/admin/shared';
import {MaterialModule} from '@app/admin/material.module';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    AdminRoutingModule,
  ],
  declarations: [
    AdminHomeComponent,
    AdminItemComponent,
    AdminCreateComponent,
    AdminCourseComponent,
    AdminGradersComponent,
    AdminGradebookComponent,
    AdminCalendarComponent,
    CreateStepComponent,
    CreateComponentComponent,
    CreateStudentComponent,
    CreateInstructorComponent,
  ],
  providers: [
    AdminGuard
  ],
  entryComponents: [
  ]
})
export class AdminModule { }
