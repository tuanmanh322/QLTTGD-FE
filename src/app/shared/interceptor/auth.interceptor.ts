import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MA_THE, TOKEN} from '../model/qlttgd.constant';



@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor() {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem(TOKEN) && localStorage.getItem(MA_THE)) {
      req = req.clone({
        setHeaders: {
          Authorization: localStorage.getItem(TOKEN)
        }
      });
    }
    return next.handle(req);
  }

}
