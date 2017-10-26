import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatExpansionModule, MatRippleModule, MatIconModule,
  MatDialogModule,
} from '@angular/material';

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
