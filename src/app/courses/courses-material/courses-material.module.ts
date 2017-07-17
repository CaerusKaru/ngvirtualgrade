import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MdButtonModule, MdCardModule, MdCheckboxModule, MdExpansionModule, MdRippleModule, MdIconModule,} from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MdExpansionModule,
    MdCheckboxModule,
    MdButtonModule,
    MdCardModule,
    MdRippleModule,
    MdIconModule
  ],
  declarations: []
})
export class CoursesMaterialModule { }
