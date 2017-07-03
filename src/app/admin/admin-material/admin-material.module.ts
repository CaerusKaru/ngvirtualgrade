import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MdButtonModule, MdCardModule, MdInputModule, MdProgressBarModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MdInputModule,
    MdButtonModule,
    MdCardModule,
    MdProgressBarModule
  ],
  declarations: []
})
export class AdminMaterialModule { }
