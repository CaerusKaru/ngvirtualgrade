import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradingHomeComponent } from './grading-home/grading-home.component';
import {GradingRoutingModule} from "./grading-routing.module";
import {GradingItemComponent, GradingItemPDFDialog, ScoringItemDialog} from './grading-item/grading-item.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {FormsModule} from "@angular/forms";
import { SvgSelectDirective } from './grading-item/svg/shared/svg-select.directive';
import { SvgDragDirective } from './grading-item/svg/shared/svg-drag.directive';
import { WrapperComponent } from './grading-item/svg/wrapper/wrapper.component';
import { TextComponent } from './grading-item/svg/text/text.component';
import { LineComponent } from './grading-item/svg/line/line.component';
import {SvgService} from "./grading-item/svg/shared/svg.service";
import {GradingMaterialModule} from "./grading-material/grading-material.module";

@NgModule({
  imports: [
    FormsModule,
    NgxChartsModule,
    CommonModule,
    FlexLayoutModule,
    GradingMaterialModule,
    GradingRoutingModule
  ],
  declarations: [
    ScoringItemDialog,
    GradingItemPDFDialog,
    GradingHomeComponent,
    GradingItemComponent,
    SvgSelectDirective,
    SvgDragDirective,
    WrapperComponent,
    TextComponent,
    LineComponent
  ],
  providers: [
    SvgService
  ],
  entryComponents: [
    LineComponent,
    TextComponent,
    GradingItemPDFDialog,
    ScoringItemDialog
  ],
  bootstrap: [
  ]
})
export class GradingModule { }
