import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCardModule, MdStepperModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MatCardModule,
    MdStepperModule,
    MatButtonModule
  ],
  declarations: []
})
export class ManageMaterialModule { }
