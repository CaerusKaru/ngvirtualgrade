import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {MaterialModule} from './material.module';
import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';
import {TransferHttpCacheModule} from '@nguniversal/common';
import {CoreModule} from '@app/core';
import {SharedModule} from '@app/shared';
import {NavDrawerModule} from '@app/nav-drawer';
import {SigninDialogComponent, HomeComponent} from '@app/home/home.component';
import {GraphQLModule} from '@app/graphql.module';


@NgModule({
  declarations: [
    AppComponent,
    SigninDialogComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'universal' }),
    NavDrawerModule,
    MaterialModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    TransferHttpCacheModule,
    GraphQLModule,
  ],
  providers: [
    {
      provide: MATERIAL_COMPATIBILITY_MODE, useValue: true
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [SigninDialogComponent]
})
export class AppModule { }
