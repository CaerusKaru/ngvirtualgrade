import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradingHomeComponent } from './grading-home/grading-home.component';
import {GradingRoutingModule} from "./grading-routing.module";
import {GradingItemComponent, GradingItemPDFDialog} from './grading-item/grading-item.component';
import {MaterialModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {FormsModule} from "@angular/forms";
import { SvgTextDirective } from './grading-item/svg/svg-text.directive';
import { SvgSelectDirective } from './grading-item/svg/svg-select.directive';
import { SvgDragDirective } from './grading-item/svg/svg-drag.directive';
import { WrapperComponent } from './grading-item/svg/wrapper/wrapper.component';

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
    SvgTextDirective,
    SvgSelectDirective,
    SvgDragDirective,
    WrapperComponent
  ],
  entryComponents: [
    GradingItemPDFDialog
  ]
})
export class GradingModule { }
