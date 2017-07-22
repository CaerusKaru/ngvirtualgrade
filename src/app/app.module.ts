import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {UserService} from './shared/services/user.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import 'hammerjs';
import 'd3';
import {AuthService} from './shared/services/auth.service';
import {CanLoadAdmin, CanLoadCourses, CanLoadGrading, CanLoadManage} from './shared/guards/auth.guard';
import {HomeComponent, SigninDialogComponent} from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './app-material/app-material.module';
import {NavMenuModule} from './nav-menu/index';
import {SortByPipe} from './shared/pipes/sort-by.pipe';
import {SortPipe} from './shared/pipes/sort.pipe';
import {SwUpdatesModule} from './sw-updates/sw-updates.module';
import {HomeMenuService} from './home/home-menu.service';
import {AdminResolver} from './shared/resolvers/admin-resolver';
import {CoursesResolver} from './shared/resolvers/courses-resolver';
import {GradingResolver} from './shared/resolvers/grading-resolver';
import {LandingResolver} from './shared/resolvers/landing-resolver';
import {ManageResolver} from './shared/resolvers/manage-resolver';

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
    HttpClientModule,
    FlexLayoutModule,
    NavMenuModule,
    AppMaterialModule,
    AppRoutingModule,
    SwUpdatesModule
  ],
  providers: [
    UserService,
    AuthService,
    CanLoadCourses,
    CanLoadGrading,
    CanLoadAdmin,
    CanLoadManage,
    HomeMenuService,
    AdminResolver,
    CoursesResolver,
    GradingResolver,
    LandingResolver,
    ManageResolver,
  ],
  bootstrap: [AppComponent],
  entryComponents: [SigninDialogComponent]
})
export class AppModule { }
