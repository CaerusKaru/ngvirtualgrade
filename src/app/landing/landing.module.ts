import { NgModule } from '@angular/core';
import {SharedModule} from '@app/shared';
import {LandingHomeComponent, LandingHelpComponent, LandingAboutComponent} from '@app/landing';
import {LandingRoutingModule} from '@app/landing/landing-routing.module';

@NgModule({
  imports: [
    SharedModule,
    LandingRoutingModule
  ],
  declarations: [LandingHomeComponent, LandingHelpComponent, LandingAboutComponent]
})
export class LandingModule { }
