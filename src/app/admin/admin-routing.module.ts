import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminHomeComponent} from '@app/admin/admin-home';
import {AdminCourseComponent} from '@app/admin/admin-course';
import {AdminGuard} from '@app/admin/shared';
import {AdminCreateComponent} from '@app/admin/admin-create';
import {AdminGradebookComponent} from '@app/admin/admin-gradebook';
import {AdminCalendarComponent} from '@app/admin/admin-calendar';
import {AdminGradersComponent} from '@app/admin/admin-graders';
import {AdminItemComponent} from '@app/admin/admin-item';


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
    canActivate: [AdminGuard],
    data: {
      depth: 2
    }
  },
  {
    path: ':course/create',
    component: AdminCreateComponent,
    canActivate: [AdminGuard],
    data: {
      depth: 3
    }
  },
  {
    path: ':course/gradebook',
    component: AdminGradebookComponent,
    canActivate: [AdminGuard],
    data: {
      depth: 3
    }
  },
  {
    path: ':course/calendar',
    component: AdminCalendarComponent,
    canActivate: [AdminGuard],
    data: {
      depth: 3
    }
  },
  {
    path: ':course/graders',
    component: AdminGradersComponent,
    canActivate: [AdminGuard],
    data: {
      depth: 3
    }
  },
  {
    path: ':course/:id',
    component: AdminItemComponent,
    canActivate: [AdminGuard],
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

