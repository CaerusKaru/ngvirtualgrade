import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {MenuService} from "./menu/shared/menu.service";
import {UserService} from "./shared/user.service";
import {FlexLayoutModule} from "@angular/flex-layout";
import "hammerjs";
import "d3";
import { SigninComponent } from './signin/signin.component';
import {AuthService} from "./shared/auth.service";
import {AuthGuard} from "./shared/auth.guard";
import {HomeComponent} from "./home/home.component";
import {MenuToggleComponent} from "./menu/menu-toggle/menu-toggle.component";
import {NospacePipe} from "./menu/shared/nospace.pipe";
import {SortByPipe} from "./menu/shared/sort-by.pipe";
import {MenuLinkComponent} from "./menu/menu-link/menu-link.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppMaterialModule} from "./app-material/app-material.module";

@NgModule({
  declarations: [
    SortByPipe,
    NospacePipe,
    MenuLinkComponent,
    MenuToggleComponent,
    AppComponent,
    SigninComponent,
    HomeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    AppMaterialModule,
    AppRoutingModule
  ],
  providers: [UserService, MenuService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
