import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import {SigninComponent} from "./signin/signin.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./shared/guards/auth.guard";

export const appRoutes: Routes = [
  { path: 'signin', component: SigninComponent},
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'grades', loadChildren: './grades/grades.module#GradesModule'
      },
      {
        path: 'grading', loadChildren: './grading/grading.module#GradingModule'
      },
      {
        path: 'archon', loadChildren: './archon/archon.module#ArchonModule'
      },
      {
        path: '**', redirectTo: 'grades', pathMatch: 'full'
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
