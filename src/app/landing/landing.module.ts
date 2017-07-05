import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LandingRoutingModule} from './landing-routing.module';
import { LandingHomeComponent } from './landing-home/landing-home.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    LandingRoutingModule
  ],
  declarations: [LandingHomeComponent]
})
export class LandingModule { }
