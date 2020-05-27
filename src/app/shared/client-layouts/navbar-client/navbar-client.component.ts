import {Component, ElementRef, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../service/auth.service';
import {ToastrService} from 'ngx-toastr';
import {LoginComponent} from '../../../auth/login/login.component';
import {TOGGLE_SIDE_BAR, USER_PROFILE_CHANGED} from '../../model/qlttgd.constant';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {EventManagement} from '../../service/event.management';
import {UserProfileModel} from '../../model/user-profile.model';
import {Subscription} from 'rxjs';
import {StorageService} from '../../service/storage.service';
import {UserService} from '../../service/user.service';
import {ApiService} from '../../service/api.service';


const CURRENT_USER = 'current_user';

@Component({
  selector: 'app-navbar-client',
  templateUrl: './navbar-client.component.html',
  styleUrls: ['./navbar-client.component.css']
})
export class NavbarClientComponent implements OnInit {

  isAuthenticate: boolean = true;
  isLoginPage: boolean;
  userProfile: UserProfileModel;
  test: Subscription;
  isAdmin: boolean;
  testtt: boolean;

  constructor(
    private router: Router,
    private eventManagement: EventManagement,
    private elementRef: ElementRef,
    private message: ToastrService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private title: Title,
    private storageService: StorageService,
    private userService: UserService,
    private apiService: ApiService
  ) {
    this.apiService.onLoad().subscribe(loadaa => {
      console.log(loadaa);
    });
  }

  ngOnInit(): void {
    this.isAuthenticate = this.storageService.isAuthenticated();
    this.userProfile = {};
    if (localStorage.getItem('token') !== null) {

      this.userService.getProfile().subscribe(res => {
        localStorage.removeItem(CURRENT_USER);
        localStorage.setItem(CURRENT_USER, JSON.stringify(res));
        this.userProfile = res;
        localStorage.removeItem('role');
        localStorage.setItem('role', this.userProfile.role);
        if (this.userProfile.role === 'ROLE_ADMIN') {
          this.isAdmin = true;
        }
      });
    }
    this.isLoginPage = this.router.url === '/auth/login';
  }


  openLogin() {
    this.modalService.open(LoginComponent, {size: 'lg'});
  }

  logOut() {
    this.storageService.logOut();
    this.isAuthenticate = false;
  }

  clickTrue() {
    this.testtt = true;
  }

  clickFalse() {
    this.testtt = false;
  }
}
