import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {UserService} from './shared/services/user.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import 'hammerjs';
import 'd3';
import {AuthService} from './shared/services/auth.service';
import {CanLoadAdmin, CanLoadGrades, CanLoadGrading} from './shared/guards/auth.guard';
import {HomeComponent, SigninDialogComponent} from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './app-material/app-material.module';
import {NavMenuModule} from './nav-menu/index';
import {SortByPipe} from './shared/pipes/sort-by.pipe';
import {SortPipe} from './shared/pipes/sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SigninDialogComponent,
    HomeComponent,
    SortByPipe,
    SortPipe
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    NavMenuModule,
    AppMaterialModule,
    AppRoutingModule
  ],
  providers: [UserService, AuthService, CanLoadGrades, CanLoadGrading, CanLoadAdmin],
  bootstrap: [AppComponent],
  entryComponents: [SigninDialogComponent]
})
export class AppModule { }
