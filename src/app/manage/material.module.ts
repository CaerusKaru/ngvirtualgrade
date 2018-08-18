import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MatCardModule,
    MatStepperModule,
    MatButtonModule
  ],
  declarations: []
})
export class MaterialModule { }
