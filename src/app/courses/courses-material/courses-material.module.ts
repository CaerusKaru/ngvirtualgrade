import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MdButtonModule, MdCardModule, MdCheckboxModule, MdExpansionModule, MdRippleModule,} from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MdExpansionModule,
    MdCheckboxModule,
    MdButtonModule,
    MdCardModule,
    MdRippleModule
  ],
  declarations: []
})
export class CoursesMaterialModule { }
