import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ADMIN, ROLE} from '../model/qlttgd.constant';
import {UserService} from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) {

  }

  // kiểm tra điều kiện khi vào các routing khác nhau
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const role = localStorage.getItem(ROLE);
    if ((role === ADMIN) && (this.userService.isLogin())){
      return true;
    }
    return false;
  }

}
