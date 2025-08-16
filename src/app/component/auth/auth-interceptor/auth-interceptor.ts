import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError, Observable } from 'rxjs';
import { AuthService } from '../auth-service/auth-service';

const addBearerToken = (req: HttpRequest<any>, token: string): HttpRequest<any> => {
  return req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });
};

const handleTokenRefresh = (
  authService: AuthService,
  originalReq: HttpRequest<any>,
  next: HttpHandlerFn,
  originalError: any
): Observable<any> => {
  return authService.getNewToken().pipe(
    switchMap((newToken) => next(addBearerToken(originalReq, newToken))),
    catchError(() => {
      authService.logout();
      return throwError(() => originalError);
    })
  );
};

const handleUnauthorized = (
  authService: AuthService,
  req: HttpRequest<any>,
  next: HttpHandlerFn,
  error: any,
  token: string
): Observable<any> => {
  if (error.status === 401 && token) {
    return handleTokenRefresh(authService, req, next, error);
  }
  return throwError(() => error);
};

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  const authedReq = token ? addBearerToken(req, token) : req;

  return next(authedReq).pipe(
    catchError((error) => handleUnauthorized(authService, req, next, error, token as string))
  );
};
