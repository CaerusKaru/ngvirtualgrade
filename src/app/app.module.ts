import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CovalentCoreModule } from '@covalent/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {MenuService} from "./menu/shared/menu.service";
import {UserService} from "./shared/user.service";
import {MaterialModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import "hammerjs";
import "d3";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import { SigninComponent } from './signin/signin.component';
import {AuthService} from "./shared/auth.service";
import {AuthGuard} from "./shared/auth.guard";
import {HomeComponent} from "./home/home.component";
import {MenuToggleComponent} from "./menu/menu-toggle/menu-toggle.component";
import {NospacePipe} from "./menu/shared/nospace.pipe";
import {SortByPipe} from "./menu/shared/sort-by.pipe";
import {MenuLinkComponent} from "./menu/menu-link/menu-link.component";
import {ArchonModule} from "./archon/archon.module";
import {GradingModule} from "./grading/grading.module";
import {GradesModule} from "./grades/grades.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

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
    NgxChartsModule,
    CovalentCoreModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    MaterialModule,
    AppRoutingModule,
    GradesModule,
    GradingModule,
    ArchonModule
  ],
  providers: [UserService, MenuService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
