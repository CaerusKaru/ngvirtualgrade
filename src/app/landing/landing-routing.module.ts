import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingHomeComponent} from '@app/landing/landing-home';
import {LandingHelpComponent} from '@app/landing/landing-help';
import {LandingAboutComponent} from '@app/landing/landing-about';

export const landingRoutes: Routes = [
  {
    path: '',
    component: LandingHomeComponent,
    data: {
      depth: 1
    }
  },
  {
    path: 'help',
    component: LandingHelpComponent,
    data: {
      depth: 1
    }
  },
  {
    path: 'about',
    component: LandingAboutComponent,
    data: {
      depth: 1
    }
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

