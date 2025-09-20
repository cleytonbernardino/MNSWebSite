import { Injectable } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';


export const loggingInterceptor: HttpInterceptorFn =
  (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    console.log('➡️ Requisição:', req.method, req.url, req.body);

    return next(req).pipe(
      tap({
        next: (event) => {
          console.log('✅ Resposta recebida:', event);
        },
        error: (error) => {
          console.error('❌ Erro na requisição:', error);
        }
      })
    );
  };
