import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradingHomeComponent } from './grading-home/grading-home.component';
import {GradingRoutingModule} from "./grading-routing.module";
import {GradingItemComponent, GradingItemPDFDialog} from './grading-item/grading-item.component';
import {MaterialModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {FormsModule} from "@angular/forms";
import { SvgWrapperDirective } from './grading-item/svg-wrapper.directive';

@NgModule({
  imports: [
    FormsModule,
    NgxChartsModule,
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    GradingRoutingModule
  ],
  declarations: [
    GradingItemPDFDialog,
    GradingHomeComponent,
    GradingItemComponent,
    SvgWrapperDirective
  ],
  entryComponents: [
    GradingItemPDFDialog
  ]
})
export class GradingModule { }
