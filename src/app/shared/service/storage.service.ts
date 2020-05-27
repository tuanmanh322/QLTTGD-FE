import {Injectable} from '@angular/core';

const TOKEN = 'token';
const AUTHORITIES_KEY = 'Authorities';
const USER_LOGIN = 'maThe';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private role: Array<string> = [];

  constructor() {
  }

  logOut() {
    localStorage.clear();
  }

  saveToken(token: any) {
    localStorage.removeItem(TOKEN);
    localStorage.setItem(TOKEN, token);
  }

  getToken() {
    return localStorage.getItem(TOKEN);
  }

  saveUser(maThe: string) {
    localStorage.removeItem(USER_LOGIN);
    localStorage.setItem(USER_LOGIN, maThe);
  }

  getUser() {
    return localStorage.getItem(USER_LOGIN);
  }

  public saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.role = [];

    if (sessionStorage.getItem(TOKEN)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.role.push(authority.authority);
      });
    }

    return this.role;
  }
  public isAuthenticated(): boolean {
    // This method is required to implement authentication.
    return !!this.getToken();
  }

  getProfileJson(){
    return JSON.parse(localStorage.getItem('current_user'));
  }
}
