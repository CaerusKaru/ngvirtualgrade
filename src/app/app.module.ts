import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {UserService} from './shared/user.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import 'hammerjs';
import 'd3';
import { SigninComponent } from './signin/signin.component';
import {AuthService} from './shared/auth.service';
import {AuthGuard} from './shared/auth.guard';
import {HomeComponent} from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './app-material/app-material.module';
// import {NavMenuModule} from './nav-menu/in';

@NgModule({
  declarations: [
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
    // NavMenuModule,
    AppMaterialModule,
    AppRoutingModule
  ],
  providers: [UserService, AuthService, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
