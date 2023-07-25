import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  static accessToken: string = '';

  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (AuthInterceptor.accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${AuthInterceptor.accessToken}`,
        },
      });
    }

    return next.handle(request);
  }
}
