import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {LoginComponent} from '../../../auth/login/login.component';
import {ADMIN, ROLE, TITLE, USER_PROFILE_CHANGED} from '../../model/qlttgd.constant';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {EventManagement} from '../../service/event.management';
import {UserProfileModel} from '../../model/user-profile.model';
import {Subscription} from 'rxjs';
import {StorageService} from '../../service/storage.service';
import {UserService} from '../../service/user.service';
import {ApiService} from '../../service/api.service';
import {PostBaivietComponent} from '../../../modules/hoi-dap/post-baiviet/post-baiviet.component';
import {NotificationService} from '../../service/notification.service';
import {NotificationModel} from '../../model/notification-model';
import {PasswordChangeComponent} from '../../../auth/password-change/password-change.component';
import {ContactFormComponent} from '../../../modules/contact/contact-form/contact-form.component';

declare var $: any;
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
  titles = '';
  data = '';
  isLogin: boolean;
  notiCount = 0;
  notification: NotificationModel[];

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
    private notificationService: NotificationService,
    private renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    // this.notificationService.isUnread().subscribe((response: { status: boolean }) => {
    //   if (response.status) {
    //
    //   }
    // });
    this.eventManagement.subscribe(USER_PROFILE_CHANGED, () => {
      this.getProfile();
    });
    this.userProfile = {};
    this.isAuthenticate = this.userService.isAuthenticated();
    this.isLoginPage = this.userService.isLogin();
    if (this.isAuthenticate) {
      this.userService.identity().then(userProfile => {
        this.userProfile = userProfile;
      });
    }
    this.userService.getAuthState().subscribe(() => {
      this.getProfile();
      this.notificationClick();
      this.apiService.get('/api/notification/all-need').subscribe(res => {
        this.notiCount = res.length;
      });
    });

    // $('.notifications-inbox').click(function() {
    //   $('.notifications-show').toggle();
    // });

    // $('.notifications-inbox1').click(function() {
    //   $('.notifications-show1').toggle();
    // });


    // this.userService.identity().then(userProfile => {
    //   this.userProfile = userProfile;
    //   this.isAuthenticate = true;
    //   if (this.userProfile.role === ADMIN){
    //     this.isAdmin = true;
    //   }
    //   localStorage.removeItem(ROLE);
    //   localStorage.setItem(ROLE, this.userProfile.role);
    // });
    this.apiService.$title.subscribe(data => {
      this.data = data;
    });
  }

  isReadAll() {
    if (this.notiCount > 0) {
      this.apiService.get('/api/notification/read-all').subscribe(res => {
        console.log(res);
        this.notiCount = 0;
        let elem = document.getElementById('itemnoti');
        elem.classList.add('item-noti');
      });

    }
  }

  checkMoveDetail() {
    if (this.notiCount === 0) {
      return;
    } else {
      this.notiCount--;
    }
  }

  notificationClick() {

    // this.apiService.get('/api/notification/all').subscribe((response: any) => {
    //   console.log('emitted');
    //   let modal: HTMLDivElement = <HTMLDivElement> document.getElementById('modal');
    //   modal.classList.add('is-active');
    //   this.addNotification(response);
    //   console.log(response);
    //   var img = <HTMLImageElement> document.getElementById('notification-icon');
    //   img.src = 'assets\\no-notification.png';
    // });
    if (!this.userProfile) {
      return;
    }
    this.apiService.get('/api/notification/all-detail').subscribe((response: any) => {
      this.notification = response;
    });
  }

  addNotification(data: any) {
    let allNotification: HTMLDivElement = <HTMLDivElement> document.getElementById('all-notification');
    if (data.length == 0) {
      allNotification.textContent = 'No notification to show.';

    } else {
      for (let item of data) {
        let notificationDiv: HTMLDivElement = <HTMLDivElement> document.createElement('div');
        notificationDiv.classList.add('notification-item');
        allNotification.appendChild(notificationDiv);
        notificationDiv.textContent = item.message;
      }

      let button: HTMLButtonElement = <HTMLButtonElement> document.createElement('button');
      button.classList.add('button');
      allNotification.appendChild(button);
      button.textContent = 'Clear Notification';
      this.renderer.listen(button, 'click', () => {
        this.clearNotifications();
      });

    }
  }

  clearNotifications() {
    console.log('okay');
    this.apiService.delete('/api/notification/clear-notification').subscribe((response: { status: boolean }) => {
      if (response.status == true) {
        console.log('cleared');
        let allNotification: HTMLDivElement = <HTMLDivElement> document.getElementById('all-notification');
        allNotification.innerHTML = 'No notification to show.';
      }
    });
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
      if (localStorage.getItem(ROLE) === ADMIN) {
        this.isAdmin = true;
      }
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

  showNoti() {
    if (this.userService.isLogin()){
      let eleNoti = document.getElementById('shownotyfication');
      switch (eleNoti.classList.length) {
        case 2:
          eleNoti.classList.add('toggler');
          break;
        case 3:
          eleNoti.classList.remove('toggler');
          break;
      }
    }
  }

  changePassword() {
    this.modalService.open(PasswordChangeComponent, {size: 'lg'});
  }

  createContact() {
    this.modalService.open(ContactFormComponent, {size: 'lg'});
  }
}
