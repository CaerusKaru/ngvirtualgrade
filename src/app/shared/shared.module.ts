import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {CardButtonModule} from '@app/card-button';
import {ColorNameModule} from '@app/color-name';
import {HomeMenuService} from '@app/home/home-menu.service';
import {SortByPipe, SortPipe} from '@app/shared/pipes';

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
