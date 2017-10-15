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
import {CardButtonModule} from '../card-button/index';
import {ColorNameModule} from '../color-name';
import { AdminGradersComponent } from './admin-graders/admin-graders.component';
import { AdminGradebookComponent } from './admin-gradebook/admin-gradebook.component';
import { AdminCalendarComponent } from './admin-calendar/admin-calendar.component';
import { CreateStepComponent } from './admin-create/create-step/create-step.component';
import { CreateComponentComponent } from './admin-create/create-component/create-component.component';
import {AdminGuard} from './shared/admin.guard';
import { CreateStudentComponent } from './admin-create/create-student/create-student.component';
import { CreateInstructorComponent } from './admin-create/create-instructor/create-instructor.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FlexLayoutModule,
    AdminMaterialModule,
    AdminRoutingModule,
    CardButtonModule,
    ColorNameModule
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
