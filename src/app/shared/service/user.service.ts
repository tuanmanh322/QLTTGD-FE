import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginModel} from '../model/login.model';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

const TOKEN = 'token';
const USER = 'maThe';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  rememberMe: boolean;

  constructor(
    private http: HttpClient
  ) {
  }


  login(login: LoginModel): Observable<any> {
    this.rememberMe = login.rememberMe;
    return this.http.post(`${environment.api_rest}/api/authenticate`, login, {observe: 'response'});
  }

  isLogin() {
    let maThe = localStorage.getItem(USER);
    console.log(!(maThe === null));
    return !(maThe === null);
  }

  logOut() {
    localStorage.clear();
  }

  getProfile() {
    return this.http.get(`${environment.api_rest}/api/user/profile-detail`);
  }

}
