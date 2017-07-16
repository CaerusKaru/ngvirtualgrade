import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CanLoadAdmin, CanLoadCourses, CanLoadGrading} from './shared/guards/auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '', loadChildren: './landing/landing.module#LandingModule'
      },
      {
        path: 'courses', loadChildren: './courses/courses.module#CoursesModule', canLoad: [CanLoadCourses]
      },
      {
        path: 'grading', loadChildren: './grading/grading.module#GradingModule', canLoad: [CanLoadGrading]
      },
      {
        path: 'admin', loadChildren: './admin/admin.module#AdminModule', canLoad: [CanLoadAdmin]
      },
      {
        path: '**', redirectTo: '', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
