import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradingHomeComponent } from './grading-home/grading-home.component';
import {GradingRoutingModule} from './grading-routing.module';
import {GradingItemComponent, GradingItemPDFDialogComponent,
  ScoringItemDialogComponent} from './grading-item/grading-item.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {FormsModule} from '@angular/forms';
import { SvgSelectDirective } from './grading-item/svg/shared/svg-select.directive';
import { SvgDragDirective } from './grading-item/svg/shared/svg-drag.directive';
import { WrapperComponent } from './grading-item/svg/wrapper/wrapper.component';
import { TextComponent } from './grading-item/svg/text/text.component';
import { LineComponent } from './grading-item/svg/line/line.component';
import {SvgService} from './grading-item/svg/shared/svg.service';
import {GradingMaterialModule} from './grading-material/grading-material.module';
import { GradingCourseComponent } from './grading-course/grading-course.component';
import {CardButtonModule} from '../card-button/index';

@NgModule({
  imports: [
    FormsModule,
    NgxChartsModule,
    CommonModule,
    FlexLayoutModule,
    GradingMaterialModule,
    GradingRoutingModule,
    CardButtonModule
  ],
  declarations: [
    ScoringItemDialogComponent,
    GradingItemPDFDialogComponent,
    GradingHomeComponent,
    GradingItemComponent,
    SvgSelectDirective,
    SvgDragDirective,
    WrapperComponent,
    TextComponent,
    LineComponent,
    GradingCourseComponent
  ],
  providers: [
    SvgService
  ],
  entryComponents: [
    LineComponent,
    TextComponent,
    GradingItemPDFDialogComponent,
    ScoringItemDialogComponent
  ],
  bootstrap: [
  ]
})
export class GradingModule { }
