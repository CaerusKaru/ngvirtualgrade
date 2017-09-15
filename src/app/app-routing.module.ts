import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CanLoadAdmin, CanLoadCourses, CanLoadGrading, CanLoadManage} from './shared/guards/auth.guard';
import {AdminResolver} from './shared/resolvers/admin-resolver';
import {GradingResolver} from './shared/resolvers/grading-resolver';
import {CoursesResolver} from './shared/resolvers/courses-resolver';
import {LandingResolver} from './shared/resolvers/landing-resolver';
import {ManageResolver} from './shared/resolvers/manage-resolver';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: './landing/landing.module#LandingModule',
        resolve: {data: LandingResolver}
      },
      {
        path: 'courses',
        loadChildren: './courses/courses.module#CoursesModule',
        canLoad: [CanLoadCourses],
        resolve: {data: CoursesResolver}
      },
      {
        path: 'grading',
        loadChildren: './grading/grading.module#GradingModule',
        canLoad: [CanLoadGrading],
        resolve: {data: GradingResolver}
      },
      {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
        canLoad: [CanLoadAdmin],
        resolve: {data: AdminResolver}
      },
      {
        path: 'manage',
        loadChildren: './manage/manage.module#ManageModule',
        canLoad: [CanLoadManage],
        resolve: {data: ManageResolver}
      },
      {
        path: '**', redirectTo: '', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      initialNavigation: 'enabled'
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
