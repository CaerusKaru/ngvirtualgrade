import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CardButtonComponent
} from './card-button';
import {MatCardModule, MatRippleModule} from '@angular/material';
import {ColorNameModule} from '../color-name';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatRippleModule,
    ColorNameModule,
  ],
  declarations: [
    CardButtonComponent
  ],
  providers: [],
  exports: [
    CardButtonComponent
  ]
})
export class CardButtonModule { }

export * from './card-button'
