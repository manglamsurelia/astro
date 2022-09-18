import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401 || err.status === 403) {
          // this.authService.logout();
          window.location.reload();
          localStorage.clear()
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
