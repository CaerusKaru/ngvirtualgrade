import { Injectable, Inject, Optional } from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Request } from 'express';
import { REQUEST } from '@nguniversal/express-engine/tokens';

@Injectable()
export class UniversalInterceptor implements HttpInterceptor {

  constructor(
    @Optional() @Inject('serverUrl') protected serverUrl: string,
    @Optional() @Inject(REQUEST) protected request: Request
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    let serverReq;

    if (this.serverUrl) {
      serverReq = req.clone({
        url: `${this.serverUrl}${req.url}`,
        // NOTE: in order for this work, you need to disable xhr2 _restrictedHeaders
        // see angular/angular#15730
        headers: new HttpHeaders({ cookie: this.request.headers.cookie })
      });
    } else {
      serverReq = req;
    }

    return next.handle(serverReq);
  }
}
