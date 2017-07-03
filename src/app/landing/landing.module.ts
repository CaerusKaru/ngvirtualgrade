import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LandingRoutingModule} from './landing-routing.module';
import { LandingHomeComponent } from './landing-home/landing-home.component';

@NgModule({
  imports: [
    CommonModule,
    LandingRoutingModule
  ],
  declarations: [LandingHomeComponent]
})
export class LandingModule { }
