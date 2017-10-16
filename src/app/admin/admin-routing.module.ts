import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminGuard, AdminHomeComponent, AdminCourseComponent, AdminCreateComponent, AdminGradebookComponent,
  AdminCalendarComponent, AdminGradersComponent, AdminItemComponent
} from '@app/admin';

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

