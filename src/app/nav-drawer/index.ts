import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {NavMenuService} from './shared/nav-menu.service';
import {NospacePipe} from './shared/nospace.pipe';
import {
  NavDrawerContainerComponent, NavDrawerHeaderDirective, NavDrawerLinkComponent,
  NavDrawerToggleComponent
} from './nav-drawer';
import {MdButtonModule, MdIconModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdIconModule,
    RouterModule
  ],
  declarations: [
    NospacePipe,
    NavDrawerHeaderDirective,
    NavDrawerToggleComponent,
    NavDrawerLinkComponent,
    NavDrawerContainerComponent
  ],
  providers: [NavMenuService],
  exports: [
    NavDrawerHeaderDirective,
    NavDrawerLinkComponent,
    NavDrawerToggleComponent,
    NavDrawerContainerComponent
  ]
})
export class NavDrawerModule { }

export * from './nav-drawer'
