import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdButtonModule, MdCardModule, MdIconModule, MdInputModule, MdMenuModule, MdSidenavModule,
  MdTabsModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MdCardModule,
    MdButtonModule,
    MdInputModule,
    MdIconModule,
    MdTabsModule,
    MdSidenavModule,
    MdMenuModule
  ],
  declarations: []
})
export class AppMaterialModule { }
