import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginModel} from '../model/login.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {CURRENT_USER, MA_THE, TOKEN} from '../model/qlttgd.constant';
import {ToastrService} from 'ngx-toastr';
import {UserProfileModel} from '../model/user-profile.model';
import {Router} from '@angular/router';
import {shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  rememberMe: boolean;
  private _authState: BehaviorSubject<UserProfileModel>;
  private _interruptedUrl: string;
  private _initialData: string[] = [
    TOKEN, 'interruptedUrl',
  ];
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {
    this._authState = new BehaviorSubject({});
  }


  login(login: LoginModel): Observable<any> {
    this.rememberMe = login.rememberMe;
    return this.http.post(`${environment.api_rest}/api/authenticate`, login, {observe: 'response'})
      .pipe(shareReplay(1));   // defaults to all values so we set it to just keep and replay last one
  }

  isLogin() {
    let maThe = localStorage.getItem(MA_THE);
    return !(maThe === null);
  }

  logOut() {
    localStorage.clear();
    sessionStorage.clear();
  }

  getProfile() {
    return this.http.get(`${environment.api_rest}/api/user/profile-detail`);
  }
  public identity(force?: boolean): Promise<any> {
    if (force) {
      localStorage.removeItem(CURRENT_USER);
    }
    if (localStorage.getItem(CURRENT_USER)) {
      const userJSON = localStorage.getItem(CURRENT_USER);
      return Promise.resolve(JSON.parse(userJSON));
    }
    return this.getProfile().toPromise().then(profile => {
        localStorage.setItem(CURRENT_USER, JSON.stringify(profile));
        this.changeAuthState = profile;

        return profile;
      },
      () => {
        localStorage.removeItem(CURRENT_USER);
        // this.changeAuthState = {};
        this.toastr.error('System Error');
        return {};
      });
  }
  public set changeAuthState(newState: UserProfileModel) {
    this._authState.next(newState);
  }

  public getAuthState(): Observable<any> {
    return this._authState.asObservable();
  }

  public entranceUrl() {
    // If the entrance url was interrupted.
    this.router.navigate([this._interruptedUrl && this._interruptedUrl.length ? this._interruptedUrl : '/'])
      .then(() => {
        this._interruptedUrl = '';
      });
  }
  hasAnyAuthority(authorities: string[]) {
    const currentUser = this.currentUser();
    if (!this.isAuthenticated() || !currentUser || !currentUser.role) {
      return false;
    }
    return authorities.includes(currentUser.role);
  }

  private currentUser() {
    if (!this.isAuthenticated()) {
      return undefined;
    }
    const userJSON = localStorage.getItem(CURRENT_USER);
    return JSON.parse(userJSON);
  }

  public isAuthenticated(): boolean {
    // This method is required to implement authentication.
    return !!this.getToken();
  }

  getToken() {
    return localStorage.getItem(TOKEN);
  }
}
