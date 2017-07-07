import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradesHomeComponent } from './grades-home/grades-home.component';
import {GradesRoutingModule} from './grades-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { GradesItemComponent } from './grades-item/grades-item.component';
import {GradesMaterialModule} from './grades-material/grades-material.module';

@NgModule({
  imports: [
    CommonModule,
    GradesRoutingModule,
    FlexLayoutModule,
    GradesMaterialModule
  ],
  declarations: [GradesHomeComponent, GradesItemComponent]
})
export class GradesModule { }
