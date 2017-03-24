import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradesHomeComponent } from './grades-home/grades-home.component';
import {GradesRoutingModule} from "./grades-routing.module";
import {CovalentCoreModule} from "@covalent/core";
import {MaterialModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import { GradesItemComponent } from './grades-item/grades-item.component';

@NgModule({
  imports: [
    CommonModule,
    GradesRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    CovalentCoreModule
  ],
  declarations: [GradesHomeComponent, GradesItemComponent]
})
export class GradesModule { }
