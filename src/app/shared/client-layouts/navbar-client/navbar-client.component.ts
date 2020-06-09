import {Component, ElementRef, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {LoginComponent} from '../../../auth/login/login.component';
import {ROLE, TITLE, USER_PROFILE_CHANGED} from '../../model/qlttgd.constant';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {EventManagement} from '../../service/event.management';
import {UserProfileModel} from '../../model/user-profile.model';
import {Subscription} from 'rxjs';
import {StorageService} from '../../service/storage.service';
import {UserService} from '../../service/user.service';
import {ApiService} from '../../service/api.service';
import {PostBaivietComponent} from '../../../modules/hoi-dap/post-baiviet/post-baiviet.component';
import {DataService} from '../../service/data.service';


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
  titles ='';
  data = '';
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
    private apiService: ApiService,
    private dataService: DataService
  ) {
    this.apiService.onLoad().subscribe(() => {
      this.getProfile();
    });
  }

  ngOnInit(): void {
    // this.eventManagement.subscribe(USER_PROFILE_CHANGED, () => {
    //   this.getProfile();
    // });
    const authenticate = this.userService.isLogin();
    if (!authenticate) {
      this.userProfile = {};
      this.isAuthenticate = false;
      return;
    }
    this.userService.identity().then(userProfile => {
      this.userProfile = userProfile;
      this.isAuthenticate = true;
      localStorage.removeItem(ROLE);
      localStorage.setItem(ROLE, this.userProfile.role);
    });
    console.log(this.userProfile);
    this.isAuthenticate = this.storageService.isAuthenticated();
    this.isAdmin = this.storageService.isAdmin();
    this.isLoginPage = this.router.url === '/auth/login';

    this.apiService.$title.subscribe(data => {
      this.data = data;
      console.log(this.data);
    })
  }

  getProfile() {
    const authenticate = this.userService.isLogin();
    if (!authenticate) {
      this.userProfile = {};
      this.isAuthenticate = false;
      return;
    }
    this.userService.identity().then(userProfile => {
      this.userProfile = userProfile;
      this.isAuthenticate = true;
      localStorage.removeItem(ROLE);
      localStorage.setItem(ROLE, this.userProfile.role);
    });
  }


  openLogin() {
    this.modalService.open(LoginComponent, {size: 'lg'});
  }

  logOut() {
    this.storageService.logOut();
    this.isAuthenticate = false;
    this.router.navigate[''];
  }

  clickTrue() {
    this.testtt = true;
  }

  clickFalse() {
    this.testtt = false;
  }

  clickPost() {
    if (this.userService.isLogin()) {
      this.modalService.open(PostBaivietComponent, {size: 'lg'});
    } else {
      this.message.error('Bạn cần đăng nhập để đăng bài!');
    }
  }
  getDataTitle() {
    localStorage.removeItem(TITLE);
    localStorage.setItem(TITLE, this.titles);
    this.apiService.sendTitle(this.titles);
    this.titles = '';
  }
}
