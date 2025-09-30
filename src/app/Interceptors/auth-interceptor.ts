import {HttpErrorResponse, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {catchError, switchMap, throwError} from 'rxjs';
import {Router} from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const authReq = addAuthHeader(req, authService);

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isAuthRequest(req) && !isRefreshRequest(req)){
        return authService.refreshToken().pipe(
          switchMap(newToken => {
            const newAuthRequest = req.clone({
              setHeaders: { Authorization: `Bearer ${newToken}` },
              withCredentials: true
            });
            return next(newAuthRequest);
          }),
          catchError(error => throwError(() => error))
        );
      } else if (error.status === 403){
          let _ = router.navigateByUrl('/');
      }
      return throwError(() => error);
    })
  )
};

function addAuthHeader(request: HttpRequest<any>, authService: AuthService) : HttpRequest<unknown>{
  let modifiedReq = request;

  const token = authService.accessToken();
  if (token && !isAuthRequest(request)){
    modifiedReq = modifiedReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }
  return modifiedReq;
}

function isApiRequest(request: HttpRequest<any>): boolean {
  return request.url.startsWith('/api/') || request.url.includes('/api/')
}

function  isAuthRequest(request: HttpRequest<any>): boolean {
  const authEndpoints = ['/api/auth/login', '/api/admin/companies/register']
  return authEndpoints.some(endpoint => request.url.includes(endpoint))
}

function isRefreshRequest(request:HttpRequest<any>): boolean {
  return request.url.includes('/api/auth/refresh');
}
