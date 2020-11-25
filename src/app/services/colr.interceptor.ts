import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class ColrInterceptor implements HttpInterceptor {
intercept(req: HttpRequest<any>, next: HttpHandler) {
    const httpReq = req.clone({
      setHeaders: {
        // NOT WORKING, GETTING FAIL RESPONSE
        // 'Cache-Control':  'no-cache, no-store, must-revalidate, post- check=0, pre-check=0',
        // 'Pragma': 'no-cache',
        // 'Expires': '0'
      },
      url: `${req.url}?${Math.floor(Math.random()*100)}`
    });
    return next.handle(httpReq);
  }
}