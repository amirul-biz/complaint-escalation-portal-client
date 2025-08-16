import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { ILogin, IAuthToken } from '../../../interfaces/interface.auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'access_token';
  private readonly apiUrl = 'http://localhost:3000';
  readonly $accessToken = new BehaviorSubject<string>('');

  constructor(private readonly http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.$accessToken.next(sessionStorage.getItem(this.TOKEN_KEY) || '');
    }
  }

  login(req: ILogin): Observable<IAuthToken> {
    return this.http
      .post<IAuthToken>(`${this.apiUrl}/login`, req, {
        withCredentials: true,
      })
      .pipe(
        tap((response: IAuthToken) => {
          this.setToken(response.token);
        })
      );
  }

  getNewToken(): Observable<string> {
    return this.http
      .get<IAuthToken>(`${this.apiUrl}/refresh-token`, {
        withCredentials: true,
      })
      .pipe(
        map((response: IAuthToken) => {
          this.setToken(response.token);
          return response.token;
        })
      );
  }

  logout() {
    this.removeToken();
  }

  getToken(): string | null {
    return this.$accessToken.getValue();
  }

  private setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(this.TOKEN_KEY, token);
      this.$accessToken.next(token);
    }
  }

  private removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(this.TOKEN_KEY);
    }
    this.$accessToken.next('');
  }
}
