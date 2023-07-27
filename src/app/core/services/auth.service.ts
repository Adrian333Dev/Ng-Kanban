import { UserService } from './user.service';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'environments/environment';
import { ITokens } from 'src/app/auth/models/tokens.interface';
import { LoginBody } from 'src/app/auth/models/request-body.types';
import { CreateUser } from 'src/app/user/models/user.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.url + 'auth/';

  login(body: LoginBody): Observable<ITokens> {
    return this.http
      .post<ITokens>(`${this.apiUrl}token/get/`, body)
      .pipe(tap({ next: (tokens) => this.setTokens(tokens) }));
  }

  refreshToken(): Observable<ITokens> {
    return this.http
      .post<ITokens>(`${this.apiUrl}token/refresh/`, {
        refresh: this.getRefreshToken(),
      })
      .pipe(tap({ next: (tokens) => this.setTokens(tokens) }));
  }

  register(body: CreateUser): Observable<{ message: string }> {
    return this.userService.create(body);
  }

  logout(): void {
    this.setTokens({ access: '', refresh: '' });
    localStorage.setItem('username', '');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  // Helpers

  public getAccessToken(): string {
    return localStorage.getItem('access_token') || '';
  }

  public getRefreshToken(): string {
    return localStorage.getItem('refresh_token') || '';
  }

  public setTokens({ access, refresh }: ITokens): void {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  }

  public getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getAccessToken()}`,
    });
  }
}
