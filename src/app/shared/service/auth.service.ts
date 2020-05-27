import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserProfileModel} from '../model/user-profile.model';
import {LOCAL_STORAGE, SESSION_STORAGE, StorageService} from 'ngx-webstorage-service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {LoginModel} from '../model/login.model';
import {ChangePasswordModel} from '../model/change-password.model';

export const TOKEN = 'token';
export const CURRENT_USER = 'current_user';

@Injectable({
  providedIn: 'root'
})
// tslint:disable-next-line:variable-name
export class AuthService {
  private _authToken: string;
  private rememberMe: boolean;
  private _authState: BehaviorSubject<UserProfileModel>;
  private _interruptedUrl: string;
  private _initialData: string[] = [
    TOKEN, 'interruptedUrl',
  ];

  constructor(
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private localStorage: StorageService,
    @Inject(SESSION_STORAGE) private sessionStorage: StorageService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this._authState = new BehaviorSubject({});
    this._initialData.forEach((value) => {
      this[value] = this.getStoredItems(value);
    });
  }

  public get interruptedUrl(): string {
    return this._interruptedUrl;
  }

  public set interruptedUrl(url: string) {
    this._interruptedUrl = url;
    if (!url) {
      this.sessionStorage.remove('interruptedUrl');
    } else {
      this.setStoredItems('interruptedUrl', url);
    }
  }

  public get token(): string {
    return this._authToken ? this._authToken : '';
  }

  public set token(token: string) {
    this._authToken = token;
  }

  public set changeAuthState(newState: UserProfileModel) {
    this._authState.next(newState);
  }

  public getAuthState(): Observable<any> {
    return this._authState.asObservable();
  }

  public isAuthenticated(): boolean {
    // This method is required to implement authentication.
    return !!this.getToken();
  }

  public authenticate(loginModel: LoginModel): Observable<any> {
    this.rememberMe = loginModel.rememberMe;
    return this.http.post(`${environment.api_rest}/api/authenticate`, loginModel, {observe: 'response'});
  }

  public changePassword(changePassword: ChangePasswordModel): Observable<void> {
    return this.http.post<void>(`${environment.api_rest}/api/user/change-password`, changePassword);
  }

  public logOut(login?: boolean) {
    this.sessionStorage.clear();
    this.localStorage.clear();
    if (login) {
      this.router.navigate(['auth', 'login']).then(() => {
        this.changeAuthState = {};
      });
    } else {
      this.router.navigate(['']).then(() => {
        this.changeAuthState = {};
      });
    }
  }

  private getStoredItems(key: string): any {
    this.sessionStorage.get(key);
  }

  public setStoredItems(key: string, value: string): void {
    this.sessionStorage.set(key, value);
  }

  public saveToken(token: string): void {
    this.rememberMe ? this.localStorage.set(TOKEN, token) : this.sessionStorage.set(TOKEN, token);
  }

  public entranceUrl() {
    // If the entrance url was interrupted.
    this.router.navigate([this.interruptedUrl && this.interruptedUrl.length ? this.interruptedUrl : '/'])
      .then(() => {
        this.interruptedUrl = '';
      });
  }

  getToken() {
    return this.sessionStorage.get(TOKEN) || this.localStorage.get(TOKEN);
  }

  public identity(force?: boolean): Promise<any> {
    if (force) {
      this.sessionStorage.remove(CURRENT_USER);
    }
    if (this.sessionStorage.get(CURRENT_USER)) {
      const userJSON = this.sessionStorage.get(CURRENT_USER);
      return Promise.resolve(JSON.parse(userJSON));
    }
    return this.fetch().toPromise().then(profile => {
        this.sessionStorage.set(CURRENT_USER, JSON.stringify(profile));
        this.changeAuthState = profile;
        return profile;
      },
      () => {
        this.sessionStorage.remove(CURRENT_USER);
        // this.changeAuthState = {};
        this.toastr.error('System Error');
        return {};
      });
  }

  public fetch() {
    return this.http.get<UserProfileModel>(`${environment.api_rest}/api/user/profile-detail`);
  }

  private currentUser() {
    if (!this.isAuthenticated()) {
      return undefined;
    }
    const userJSON = this.sessionStorage.get(CURRENT_USER);
    return JSON.parse(userJSON);
  }

  hasAnyAuthority(authorities: string[]) {
    const currentUser = this.currentUser();
    if (!this.isAuthenticated() || !currentUser || !currentUser.role) {
      return false;
    }
    return authorities.includes(currentUser.role);
  }

  getCurrentRole() {
    return this.currentUser().role;
  }

  forgotPassword(email) {
    return this.http.get(`${environment.api_rest}/api/user/forgot?email=${email}`);
  }

  resetPassword(resetPassword) {
    return this.http.post(`${environment.api_rest}/api/user/reset`, resetPassword);
  }

  getCurrentUser() {
    return this.currentUser();
  }

  changeReceiveNotify() {
    return this.http.get(`${environment.api_rest}/api/user/change-receive-notify`);
  }

  async setProfile() {
    await this.fetch().toPromise().then(profile => {
      this.sessionStorage.set(CURRENT_USER, JSON.stringify(profile));
    });
  }

  authenticateSocial(socialUser: any): Observable<any> {
    return this.http.post(`${environment.api_rest}/api/authenticate-social`, socialUser, {observe: 'response'});
  }
}
