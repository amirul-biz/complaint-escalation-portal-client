import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { ILogin } from '../../../interfaces/interface.auth';

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

  login(req: ILogin): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/login`, req).pipe(
      tap((accessToken: string) => {
        this.setToken(accessToken);
      })
    );
  }

  getNewToken(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/refresh-token`).pipe(
      map((accesstoken) => {
        this.setToken(accesstoken);
        return accesstoken;
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
