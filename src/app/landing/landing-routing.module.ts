import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingHomeComponent} from './landing-home/landing-home.component';

export const landingRoutes: Routes = [
    {
      path: '',
      component: LandingHomeComponent
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(landingRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LandingRoutingModule {}

