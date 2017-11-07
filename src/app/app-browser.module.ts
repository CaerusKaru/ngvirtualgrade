import { NgModule } from '@angular/core';
import {AppModule} from './app.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserTransferStateModule} from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    AppModule,
    BrowserTransferStateModule,
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }
