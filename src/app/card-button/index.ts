import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  CardButtonComponent
} from './card-button';
import {MdCardModule, MdRippleModule} from '@angular/material';
import {ColorNameModule} from '../color-name';

@NgModule({
  imports: [
    CommonModule,
    MdCardModule,
    MdRippleModule,
    ColorNameModule,
    FlexLayoutModule
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
