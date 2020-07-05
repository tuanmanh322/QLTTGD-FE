import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Baiviet} from '../model/baiviet';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BaiVietService {
  constructor(private http: HttpClient) {

  }

  public loadAutoCompleteBV(title: string): Observable<Baiviet[]> {
    if (!title) {
      return of([]);
    }
    const auto = {
      keyword: title,
      excludeKeywords: []
    };
    return this.http.post<Baiviet[]>(`${environment.api_rest}/api/auto-complete/bv`, auto).pipe(
      catchError(err => {
        return Observable.throw(err);
      })
    );
  }

  public loadAutoCompleteCD(title: string, idCd: number): Observable<Baiviet[]> {
    if (!title) {
      return of([]);
    }
    const auto = {
      keyword: title,
      excludeKeywords: [],
      idCD: idCd
    };
    return this.http.post<Baiviet[]>(`${environment.api_rest}/api/auto-complete/cd`, auto).pipe(
      catchError(err => {
        return Observable.throw(err);
      })
    );
  }

  public loadAutoCompleteContentBV(title: string): Observable<Baiviet[]> {
    if (!title) {
      return of([]);
    }
    const auto = {
      keyword: title,
      excludeKeywords: []
    };
    return this.http.post<Baiviet[]>(`${environment.api_rest}/api/auto-complete/bv-content`, auto).pipe(
      catchError(err => {
        return Observable.throw(err);
      })
    );
  }

  public loadAutoCompleteContentCD(title: string, idCd: number): Observable<Baiviet[]> {
    if (!title) {
      return of([]);
    }
    const auto = {
      keyword: title,
      excludeKeywords: [],
      idCD: idCd
    };
    return this.http.post<Baiviet[]>(`${environment.api_rest}/api/auto-complete/cd-content`, auto).pipe(
      catchError(err => {
        return Observable.throw(err);
      })
    );
  }
}
