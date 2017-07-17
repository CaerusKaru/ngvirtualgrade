import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ColorNameDirective
} from './color-name';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ColorNameDirective
  ],
  providers: [],
  exports: [
    ColorNameDirective
  ]
})
export class ColorNameModule { }

export * from './color-name'
