import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatInputModule,
  MatNativeDateModule,
  MatProgressBarModule, MatExpansionModule, MatRadioModule, MatTableModule, MatPaginatorModule, MatSortModule,
  MatIconModule,
  MatTabsModule, MatRippleModule, MatSlideToggleModule, MatToolbarModule, MatListModule, MatTooltipModule, MatMenuModule
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    CdkTableModule,
    MatTabsModule,
    MatRippleModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatListModule,
    MatTooltipModule,
    MatMenuModule,
  ],
  declarations: []
})
export class MaterialModule { }
