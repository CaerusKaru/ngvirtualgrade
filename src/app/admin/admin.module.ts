import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '@app/shared';
import {AdminGuard, AdminMaterialModule, AdminCreateComponent, AdminCalendarComponent, CreateComponentComponent,
  CreateInstructorComponent, CreateStepComponent, CreateStudentComponent, AdminHomeComponent, AdminItemComponent,
  AdminCourseComponent, AdminGradersComponent, AdminGradebookComponent
} from '@app/admin';
import {AdminRoutingModule} from '@app/admin/admin-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    AdminMaterialModule,
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
