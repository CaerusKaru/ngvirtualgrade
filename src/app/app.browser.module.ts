import { NgModule } from '@angular/core';
import {AppModule} from './app.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserTransferStateModule} from '@angular/platform-browser';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '@env/environment';
import {GraphQLBrowserModule} from '@app/graphql.browser.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    AppModule,
    BrowserTransferStateModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
    GraphQLBrowserModule,
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }
