import { NgModule } from '@angular/core';
import {SharedModule} from '@app/shared';
import {LandingRoutingModule} from '@app/landing/landing-routing.module';
import {LandingHomeComponent} from '@app/landing/landing-home';
import {LandingHelpComponent} from '@app/landing/landing-help';
import {LandingAboutComponent} from '@app/landing/landing-about';

@NgModule({
  imports: [
    SharedModule,
    LandingRoutingModule
  ],
  declarations: [
    LandingHomeComponent,
    LandingHelpComponent,
    LandingAboutComponent
  ]
})
export class LandingModule { }
