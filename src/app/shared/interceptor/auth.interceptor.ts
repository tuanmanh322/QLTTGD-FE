import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

const TOKEN = 'token';
const AUTHORITIES_KEY = 'Authorities';
const USER_LOGIN = 'maThe';
const HEADER = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor() {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem(TOKEN) && localStorage.getItem(USER_LOGIN)) {
      req = req.clone({
        setHeaders: {
          Authorization: localStorage.getItem(TOKEN)
        }
      });
    }
    return next.handle(req);
  }

}
