import { NgModule } from '@angular/core';
import {ServerModule} from '@angular/platform-server';
import {AppModule} from './app.module';
import {AppComponent} from './app.component';
import {UniversalInterceptor} from 'app/shared/interceptors/universal.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ServerPrebootModule} from 'preboot/src/server/server-preboot.module';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerPrebootModule.recordEvents({ appRoot: 'vg-root' })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: UniversalInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppServerModule { }
