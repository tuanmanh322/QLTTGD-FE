import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ChuDeCount} from '../model/chu-de-count';
import {HttpClient} from '@angular/common/http';
import {ApiService} from './api.service';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ChuDeService {
  private _chuDeStates: BehaviorSubject<ChuDeCount>;

  constructor(
    private http: HttpClient,
    public apiService: ApiService
  ) {
    this._chuDeStates = new BehaviorSubject({});
  }

  public set SetChuDeStates(states: ChuDeCount) {
    this._chuDeStates.next(states);
  }

  public getChuDeStates(): Observable<any> {
    return this._chuDeStates.asObservable();
  }

  public identity(): Promise<any> {
    return this.fetchData().toPromise().then(cd => {
      this.SetChuDeStates = cd;
      return cd;
    }, () => {
      return {};
    });
  }

  public fetchData() {
    return this.http.get<ChuDeCount>(`${environment.api_rest}/api/chu-de/get-count`);
  }
}
