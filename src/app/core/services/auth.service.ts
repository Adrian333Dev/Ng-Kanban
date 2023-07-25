import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { ITokens } from 'src/app/auth/models/tokens.interface';
import {
  LoginBody,
  RegisterBody,
} from 'src/app/auth/models/request-body.types';
import { AuthInterceptor } from '../interceptors/auth.interceptor';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.url;
  isLoggedIn(): boolean {
    const loggedIn = false;
    if (loggedIn) {
      console.log('logged in');
      return true;
    }
    console.log('not logged in');
    return false;
  }

  // /api/auth/token/get/
  // /api/auth/token/refresh/
  // /api/user/create/

  login(body: LoginBody): Observable<ITokens> {
    return this.http
      .post<ITokens>(`${this.apiUrl}auth/token/get/`, body, {
        withCredentials: true,
      })
      .pipe(
        tap(({ access_token }) => (AuthInterceptor.accessToken = access_token))
      );
  }

  register(body: RegisterBody): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}user/create/`,
      body
    );
  }

  constructor(private http: HttpClient, private router: Router) {}
}
