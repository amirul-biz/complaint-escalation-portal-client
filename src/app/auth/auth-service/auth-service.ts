import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom, map, Observable, of, tap } from 'rxjs';
import { ILogin, IAuthToken, IAuthError, IAuthErrorMessage } from '../../interfaces/interface.auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'access_token';
  private readonly apiUrl = 'http://localhost:3000';
  readonly $accessToken = new BehaviorSubject<string>('');

  constructor(
    private readonly http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
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

  clearRefreshToken() {
    this.http
      .delete(`${this.apiUrl}/logout`, {
        withCredentials: true,
      })
      .subscribe();
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
      this.$accessToken.next('');
      this.triggerCurrentRoute();
    }
    this.clearRefreshToken();
  }

  triggerCurrentRoute() {
    const currentUrl = this.router.url.split('?')[0].split('#')[0];
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  private decodeToken(token: string): any | null {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    const token = this.getToken();
    if (!token) return false;

    const decoded = this.decodeToken(token);
    if (!decoded?.exp) return false;

    const now = Math.floor(Date.now() / 1000);
    const isExpired = decoded.exp < now;

    if (!isExpired) return true;

    try {
      await firstValueFrom(this.getNewToken());
      return true;
    } catch (error) {
      return false;
    }
  }

  httpErrorHandler(error: IAuthErrorMessage) {
    console.log(error.error.status);
    console.log(error.error.error);

    alert(`error status: ${error.error.status}\nmessage: ${error.error.error}`);
    return of(null);
  }
}
