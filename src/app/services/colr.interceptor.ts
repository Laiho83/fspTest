import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class ColrInterceptor implements HttpInterceptor {
// Note: Response is being cached on the browser so the header 'Cache-control', ... need to be set 
// As soon as the request header is changed, http request fails.
// For this reason there is a propsed solution with the Math.random add to url to prevent caching
intercept(req: HttpRequest<any>, next: HttpHandler) {
    const httpReq = req.clone({
      url: `${req.url}?${Math.floor(Math.random()*100)}`
    });
    return next.handle(httpReq);
  }
}