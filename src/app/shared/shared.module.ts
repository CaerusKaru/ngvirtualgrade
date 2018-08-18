import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ADD_FLEX_STYLES, FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {CardButtonModule} from '../card-button';
import {ColorNameModule} from '../color-name';
import {HomeMenuService} from '../home/home-menu.service';
import {SortByPipe, SortPipe} from '@app/shared/pipes';
import {WindowRef} from '@app/shared/window-ref';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SortByPipe,
    SortPipe
  ],
  providers: [
    HomeMenuService,
    WindowRef,
    {provide: ADD_FLEX_STYLES, useValue: true},
  ],
  exports: [
    SortByPipe,
    SortPipe,
    FormsModule,
    FlexLayoutModule,
    CardButtonModule,
    ColorNameModule,
    CommonModule
  ]
})
export class SharedModule { }
