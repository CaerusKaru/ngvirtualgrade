import { NgModule } from '@angular/core';
import {SharedModule} from '@app/shared';
import {CardButtonModule} from '@app/card-button';
import {GradingRoutingModule} from '@app/grading/grading-routing.module';
import {MaterialModule} from '@app/grading/material.module';
import {
  GradingItemComponent, GradingItemPDFDialogComponent, LineComponent,
  ScoringItemDialogComponent, SvgDragDirective, SvgSelectDirective, SvgService, TextComponent, WrapperComponent
} from '@app/grading/grading-item';
import {GradingHomeComponent} from '@app/grading/grading-home';
import {GradingCourseComponent} from '@app/grading/grading-course';
import {GradingGuard} from '@app/grading/shared';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
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
    SvgService,
    GradingGuard
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
