import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import {SigninComponent} from "./signin/signin.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./shared/auth.guard";
import {GradesModule} from "./grades/grades.module";
import {GradingModule} from "./grading/grading.module";
import {ArchonModule} from "./archon/archon.module";

export const appRoutes: Routes = [
  { path: 'signin', component: SigninComponent},
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'grades', loadChildren: () => GradesModule
      },
      {
        path: 'grading', loadChildren: () => GradingModule
      },
      {
        path: 'archon', loadChildren: () => ArchonModule
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
