import { inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


export function AuthInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  const jwt = inject(AuthService).getToken();
  console.log(req.url);

  if (isLoginOrRegister()) {
    console.log('No se añade el token a la petición');
    return next(req);
  }

  const authReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${jwt}`),
  });
  return next(authReq);
}

function isLoginOrRegister(): boolean {
  const path = inject(Router).url;
  return path.includes('login') || path.includes('register');
}