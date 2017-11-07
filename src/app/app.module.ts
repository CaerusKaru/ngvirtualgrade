import { BrowserModule } from '@angular/platform-browser';
import {NgModule, ApplicationRef} from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from '@app/app-routing.module';
import {MaterialModule} from '@app/material.module';
import {TransferHttpCacheModule} from '@nguniversal/common';
import {CoreModule} from '@app/core';
import {SharedModule} from '@app/shared';
import {NavDrawerModule} from '@app/nav-drawer';
import {SigninDialogComponent, HomeComponent} from '@app/home/home.component';
import {GraphQLModule} from '@app/graphql.module';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '@env/environment';


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
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
  ],
  bootstrap: [AppComponent],
  entryComponents: [SigninDialogComponent]
})
export class AppModule { }
