import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdButtonModule, MdButtonToggleModule, MdCardModule, MdCheckboxModule, MdDialogModule, MdIconModule, MdInputModule,
  MdListModule,
  MdMenuModule, MdPaginatorModule,
  MdProgressBarModule, MdRippleModule,
  MdSidenavModule, MdSortModule, MdTableModule,
  MdToolbarModule,
  MdTooltipModule
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk';

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
    MdCheckboxModule,
    MdCardModule,
    MdTableModule,
    MdPaginatorModule,
    MdSortModule,
    CdkTableModule,
    MdRippleModule
  ],
  declarations: []
})
export class GradingMaterialModule { }
