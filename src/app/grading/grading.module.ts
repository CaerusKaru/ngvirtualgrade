import { NgModule } from '@angular/core';
import {SharedModule} from '@app/shared';
import {GradingMaterialModule, ScoringItemDialogComponent, GradingItemPDFDialogComponent,
  GradingHomeComponent, GradingItemComponent, SvgSelectDirective, SvgDragDirective, WrapperComponent, TextComponent,
  LineComponent, GradingCourseComponent, SvgService, GradingGuard
} from '@app/grading';
import {CardButtonModule} from '@app/card-button';
import {GradingRoutingModule} from '@app/grading/grading-routing.module';

@NgModule({
  imports: [
    SharedModule,
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
