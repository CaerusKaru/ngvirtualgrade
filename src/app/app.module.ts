import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {UserService} from './shared/services/user.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AuthService} from './shared/services/auth.service';
import {CanLoadAdmin, CanLoadCourses, CanLoadGrading, CanLoadManage} from './shared/guards/auth.guard';
import {HomeComponent, SigninDialogComponent} from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './app-material/app-material.module';
import {NavDrawerModule} from './nav-drawer/index';
import {SortByPipe} from './shared/pipes/sort-by.pipe';
import {SortPipe} from './shared/pipes/sort.pipe';
// import {SwUpdatesModule} from './sw-updates/sw-updates.module';
import {HomeMenuService} from './home/home-menu.service';
import {AdminResolver} from './shared/resolvers/admin-resolver';
import {CoursesResolver} from './shared/resolvers/courses-resolver';
import {GradingResolver} from './shared/resolvers/grading-resolver';
import {LandingResolver} from './shared/resolvers/landing-resolver';
import {ManageResolver} from './shared/resolvers/manage-resolver';
import {BrowserPrebootModule} from 'preboot/src/browser/browser-preboot.module';

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
    BrowserModule.withServerTransition({ appId: 'universal' }),
    // BrowserPrebootModule.replayEvents(),
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    NavDrawerModule,
    AppMaterialModule,
    AppRoutingModule,
    // SwUpdatesModule
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
