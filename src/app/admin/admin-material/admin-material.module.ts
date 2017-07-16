import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdButtonModule, MdCardModule, MdCheckboxModule, MdChipsModule, MdDatepickerModule, MdInputModule, MdNativeDateModule,
  MdProgressBarModule, MdExpansionModule, MdRadioModule, MdTableModule, MdPaginatorModule, MdSortModule, MdIconModule,
  MdTabsModule
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk';

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
    MdCheckboxModule,
    MdExpansionModule,
    MdRadioModule,
    MdTableModule,
    MdPaginatorModule,
    MdSortModule,
    MdIconModule,
    CdkTableModule,
    MdTabsModule
  ],
  declarations: []
})
export class AdminMaterialModule { }
