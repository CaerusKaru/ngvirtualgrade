import { NgModule } from '@angular/core';
import {AppModule} from './app.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SwUpdatesModule} from './sw-updates/sw-updates.module';
import {provideClient} from './apollo.browser';
import {ApolloModule} from 'apollo-angular';
import {BrowserPrebootModule} from 'preboot/src/browser/browser-preboot.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    AppModule,
    BrowserPrebootModule.replayEvents(),
    SwUpdatesModule,
    ApolloModule.withClient(provideClient),
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }
