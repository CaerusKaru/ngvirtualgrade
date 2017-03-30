import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CovalentCoreModule } from '@covalent/core';

import { AppComponent } from './app.component';
import {GradesModule} from "./grades/grades.module";
import {GradingModule} from "./grading/grading.module";
import {ArchonModule} from "./archon/archon.module";
import {AppRoutingModule} from "./app-routing.module";
import { MenuToggleComponent } from './menu/menu-toggle/menu-toggle.component';
import { NospacePipe } from './menu/shared/nospace.pipe';
import { MenuLinkComponent } from './menu/menu-link/menu-link.component';
import { SortByPipe } from './menu/shared/sort-by.pipe';
import {MenuService} from "./menu/shared/menu.service";
import {UserService} from "./user.service";
import {MaterialModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import "hammerjs";
import "d3";
import {NgxChartsModule} from "@swimlane/ngx-charts";

@NgModule({
  declarations: [
    SortByPipe,
    NospacePipe,
    MenuLinkComponent,
    MenuToggleComponent,
    AppComponent
  ],
  imports: [
    NgxChartsModule,
    CovalentCoreModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    MaterialModule,
    GradesModule,
    GradingModule,
    ArchonModule,
    AppRoutingModule
  ],
  providers: [UserService, MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
