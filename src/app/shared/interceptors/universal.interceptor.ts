import { Injectable, Inject, Optional } from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Request } from 'express';
import { REQUEST } from '@nguniversal/express-engine/tokens';

@Injectable()
export class UniversalInterceptor implements HttpInterceptor {

  constructor(
    @Optional() @Inject(REQUEST) protected request: Request
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    let serverReq;
    if (this.request) {
      let newUrl = `${this.request.protocol}://${this.request.get('host')}`;
      if (!req.url.startsWith('/')) {
        newUrl += '/';
      }
      newUrl += req.url;
      serverReq = req.clone({
        url: `${newUrl}`,
        // NOTE: in order for this work, you need to disable xhr2 _restrictedHeaders
        // see angular/angular#15730
        headers: this.request.headers.cookie ? new HttpHeaders({ cookie: this.request.headers.cookie }) : null
      });
    } else {
      serverReq = req;
    }

    return next.handle(serverReq);
  }
}
