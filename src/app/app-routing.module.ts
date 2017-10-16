import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from '@app/home/home.component';
import {HomeResolver, LandingResolver, CoursesResolver, GradingResolver, AdminResolver, ManageResolver} from '@app/shared/resolvers';
import {CanLoadCourses, CanLoadGrading, CanLoadAdmin, CanLoadManage} from '@app/shared/guards';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      data: HomeResolver
    },
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
