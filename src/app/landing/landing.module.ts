import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LandingRoutingModule} from './landing-routing.module';
import { LandingHomeComponent } from './landing-home/landing-home.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { LandingHelpComponent } from './landing-help/landing-help.component';
import { LandingAboutComponent } from './landing-about/landing-about.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    LandingRoutingModule
  ],
  declarations: [LandingHomeComponent, LandingHelpComponent, LandingAboutComponent]
})
export class LandingModule { }
