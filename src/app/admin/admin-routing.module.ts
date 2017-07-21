import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AdminHomeComponent} from './admin-home/admin-home.component';
import {AdminItemComponent} from './admin-item/admin-item.component';
import {AdminCreateComponent} from './admin-create/admin-create.component';
import {AdminCourseComponent} from './admin-course/admin-course.component';
import {AdminGradebookComponent} from './admin-gradebook/admin-gradebook.component';
import {AdminCalendarComponent} from './admin-calendar/admin-calendar.component';
import {AdminGradersComponent} from './admin-graders/admin-graders.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminHomeComponent,
    data: {
      depth: 1
    }
  },
  {
    path: ':course',
    component: AdminCourseComponent,
    data: {
      depth: 2
    }
  },
  {
    path: ':course/create',
    component: AdminCreateComponent,
    data: {
      depth: 3
    }
  },
  {
    path: ':course/gradebook',
    component: AdminGradebookComponent,
    data: {
      depth: 3
    }
  },
  {
    path: ':course/calendar',
    component: AdminCalendarComponent,
    data: {
      depth: 3
    }
  },
  {
    path: ':course/graders',
    component: AdminGradersComponent,
    data: {
      depth: 3
    }
  },
  {
    path: ':course/:id',
    component: AdminItemComponent,
    data: {
      depth: 3
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}

