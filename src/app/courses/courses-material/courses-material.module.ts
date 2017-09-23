import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdButtonModule, MdCardModule, MdCheckboxModule, MdExpansionModule, MdRippleModule, MdIconModule,
  MdDialogModule,
} from '@angular/material';

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
    MdIconModule,
    MdDialogModule,
  ],
  declarations: []
})
export class CoursesMaterialModule { }
