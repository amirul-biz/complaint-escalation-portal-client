import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../auth-service/auth-service';
import { HttpStatusCodeEnum } from '../../enums/enum.httpStatusCode';
import { IAuthError } from '../../interfaces/interface.auth';

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
  error: IAuthError,
  token: string
): Observable<any> => {
  if (error.status === HttpStatusCodeEnum.UNAUTHORIZED && token) {
    return handleTokenRefresh(authService, req, next, error);
  }
  if (error.status === HttpStatusCodeEnum.FORBIDDEN) {
    authService.logout();
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
