import { NgModule } from '@angular/core';
import {AppModule} from './app.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SwUpdatesModule} from './sw-updates/sw-updates.module';
import {BrowserPrebootModule} from 'preboot/src/browser/browser-preboot.module';
import {BrowserTransferStateModule} from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    AppModule,
    BrowserPrebootModule.replayEvents(),
    SwUpdatesModule,
    BrowserTransferStateModule,
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }
