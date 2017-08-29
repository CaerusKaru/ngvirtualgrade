import { NgModule } from '@angular/core';
import {AppModule} from './app.module';
import {AppComponent} from './app.component';
import {BrowserPrebootModule} from 'preboot/src/browser/browser-preboot.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SwUpdatesModule} from './sw-updates/sw-updates.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    AppModule,
    BrowserPrebootModule.replayEvents(),
    SwUpdatesModule
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }
