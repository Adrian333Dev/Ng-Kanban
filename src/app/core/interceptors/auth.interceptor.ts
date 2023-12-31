import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, catchError, switchMap } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { ITokens } from 'src/app/auth/models/tokens.interface';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessToken = this.authService.getAccessToken();
    if (accessToken) return this.handleRequest(request, next, accessToken);
    return next.handle(request);
  }

  handleRequest(
    request: HttpRequest<unknown>,
    next: HttpHandler,
    accessToken: string
  ): Observable<HttpEvent<unknown>> {
    const authRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
    });
    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap((tokens: ITokens) => {
              this.authService.setTokens(tokens);
              return this.handleRequest(request, next, tokens.access);
            }),
            catchError((error: HttpErrorResponse) => {
              this.authService.logout();
              throw error;
            })
          );
        } else throw error;
      })
    );
  }
}

export const authInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
