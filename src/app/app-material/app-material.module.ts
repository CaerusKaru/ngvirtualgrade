import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdButtonModule, MdCardModule, MdDialogModule, MdIconModule, MdInputModule, MdMenuModule, MdSidenavModule,
  MdSnackBarModule,
  MdTabsModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MdDialogModule,
    MdCardModule,
    MdButtonModule,
    MdInputModule,
    MdIconModule,
    MdTabsModule,
    MdSidenavModule,
    MdMenuModule,
    MdSnackBarModule
  ],
  declarations: []
})
export class AppMaterialModule { }
