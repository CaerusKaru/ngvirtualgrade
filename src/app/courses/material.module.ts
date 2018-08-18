import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MatExpansionModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatRippleModule,
    MatIconModule,
    MatDialogModule,
  ],
  declarations: []
})
export class MaterialModule { }
