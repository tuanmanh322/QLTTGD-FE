import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_rest}${path}`, {params})
      .pipe(catchError(err => {
        return throwError(err);
      }));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${environment.api_rest}${path}`, body)
      .pipe(catchError(err => {
        return throwError(err);
      }));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.put(`${environment.api_rest}${path}`, body)
      .pipe(catchError(err => {
        return throwError(err);
      }));
  }

  delete(path: string, body: Object = {}): Observable<any> {
    return this.http.delete(`${environment.api_rest}${path}`, body)
      .pipe(catchError(err => {
        return throwError(err);
      }));
  }
  private _listen = new Subject<any>();

  onLoad(): Observable<any>{
    return this._listen.asObservable();
  }

  onFilter(filter: string){
    this._listen.next(filter);
  }

}
