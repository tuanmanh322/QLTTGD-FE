import {Component, OnInit} from '@angular/core';
import {UserProfileModel} from '../../model/user-profile.model';
import {CURRENT_USER} from '../../model/qlttgd.constant';
import {UserService} from '../../service/user.service';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {
  userProfile: UserProfileModel;

  constructor(
    private userService: UserService,
    private title: Title,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.title.setTitle('Trang quản trị');
    this.userProfile = JSON.parse(localStorage.getItem(CURRENT_USER));
  }

  logout() {
    this.userService.logOut();
    this.router.navigate(['']);
  }

}
