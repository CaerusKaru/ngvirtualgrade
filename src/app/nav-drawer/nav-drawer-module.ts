import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {NavDrawerService} from './shared/nav-drawer.service';
import {NospacePipe} from './shared/nospace.pipe';
import {
  NavDrawerContainerComponent, NavDrawerHeaderDirective, NavDrawerLinkComponent,
  NavDrawerToggleComponent
} from './nav-drawer';
import {MatButtonModule, MatIconModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  declarations: [
    NospacePipe,
    NavDrawerHeaderDirective,
    NavDrawerToggleComponent,
    NavDrawerLinkComponent,
    NavDrawerContainerComponent
  ],
  providers: [NavDrawerService],
  exports: [
    NavDrawerHeaderDirective,
    NavDrawerLinkComponent,
    NavDrawerToggleComponent,
    NavDrawerContainerComponent
  ]
})
export class NavDrawerModule { }
