import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingHomeComponent} from './landing-home/landing-home.component';
import {LandingHelpComponent} from './landing-help/landing-help.component';
import {LandingAboutComponent} from './landing-about/landing-about.component';

export const landingRoutes: Routes = [
    {
      path: '',
      component: LandingHomeComponent
    },
  {
    path: 'help',
    component: LandingHelpComponent
  },
  {
    path: 'about',
    component: LandingAboutComponent
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

