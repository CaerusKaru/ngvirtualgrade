import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdButtonModule, MdButtonToggleModule, MdCheckboxModule, MdDialogModule, MdIconModule, MdInputModule, MdListModule,
  MdMenuModule,
  MdProgressBarModule,
  MdSidenavModule,
  MdToolbarModule,
  MdTooltipModule
} from "@angular/material";

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MdInputModule,
    MdButtonModule,
    MdSidenavModule,
    MdTooltipModule,
    MdToolbarModule,
    MdMenuModule,
    MdListModule,
    MdProgressBarModule,
    MdIconModule,
    MdDialogModule,
    MdButtonToggleModule,
    MdCheckboxModule
  ],
  declarations: []
})
export class GradingMaterialModule { }
