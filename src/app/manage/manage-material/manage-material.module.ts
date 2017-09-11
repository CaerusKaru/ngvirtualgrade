import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MdButtonModule, MdCardModule, MdStepperModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MdCardModule,
    MdStepperModule,
    MdButtonModule
  ],
  declarations: []
})
export class ManageMaterialModule { }
