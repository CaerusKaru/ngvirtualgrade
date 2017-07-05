import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdButtonModule, MdCardModule, MdCheckboxModule, MdChipsModule, MdDatepickerModule, MdInputModule, MdNativeDateModule,
  MdProgressBarModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MdInputModule,
    MdButtonModule,
    MdCardModule,
    MdProgressBarModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdChipsModule,
    MdCheckboxModule
  ],
  declarations: []
})
export class AdminMaterialModule { }
