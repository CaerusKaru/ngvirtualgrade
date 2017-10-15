import { NgModule } from '@angular/core';
import {ServerModule} from '@angular/platform-server';
import {AppModule} from './app.module';
import {AppComponent} from './app.component';
import {UniversalInterceptor} from './shared/interceptors/universal.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ServerPrebootModule} from 'preboot/src/server/server-preboot.module';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';
import {ApolloModule} from 'apollo-angular';
import {provideClient} from './apollo.server';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    NoopAnimationsModule,
    ServerModule,
    AppModule,
    ServerPrebootModule.recordEvents({ appRoot: 'vg-root' }),
    ModuleMapLoaderModule,
    ApolloModule.withClient(provideClient),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: UniversalInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppServerModule { }
