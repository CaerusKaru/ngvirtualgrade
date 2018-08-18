import { NgModule } from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';
import {AppModule} from './app.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {UniversalInterceptor} from '@app/shared/interceptors';
import {GraphQLServerModule} from '@app/graphql.server.module';
import {FlexLayoutServerModule} from '@angular/flex-layout/server';

@NgModule({
  imports: [
    NoopAnimationsModule,
    ServerModule,
    AppModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule,
    GraphQLServerModule,
    FlexLayoutServerModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: UniversalInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppServerModule { }
