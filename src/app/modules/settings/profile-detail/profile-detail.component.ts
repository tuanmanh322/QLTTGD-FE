import {Component, OnInit} from '@angular/core';
import {UserProfileModel} from '../../../shared/model/user-profile.model';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../shared/service/api.service';
import {Title} from '@angular/platform-browser';
import {ADMIN, ANONYMOUS, STUDENT, TEACHER} from '../../../shared/model/qlttgd.constant';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

  userProfileDetailEmp: UserProfileModel;
  roleUser = '';
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private title: Title
  ) {
  }

  ngOnInit(): void {
    this.title.setTitle('Thông tin người dùng');
    this.route.params.subscribe(paramMap => {
      const idUser = paramMap.id;
      this.apiService.get('/api/user/profile-emp/' + idUser).subscribe(res => {
        this.userProfileDetailEmp = res;
        if (this.userProfileDetailEmp.idRole === 1) {
          this.roleUser = 'Quản trị viên';
        }
        if (this.userProfileDetailEmp.idRole === 2) {
          this.roleUser = 'Giáo viên';
        }
        if (this.userProfileDetailEmp.idRole === 3) {
          this.roleUser = 'Học sinh';
        }
        if (this.userProfileDetailEmp.idRole === 4) {
          this.roleUser = 'Khách';
        }
      });
    });
  }

}
