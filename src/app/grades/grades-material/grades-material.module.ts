import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MdButtonModule, MdCardModule, MdCheckboxModule, MdExpansionModule, } from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MdExpansionModule,
    MdCheckboxModule,
    MdButtonModule
  ],
  declarations: []
})
export class GradesMaterialModule { }
