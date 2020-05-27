import {Component, OnInit} from '@angular/core';
import {UserProfileModel} from '../../../shared/model/user-profile.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../shared/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfileModel;
  userForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('current_user');
    this.userProfile = JSON.parse(currentUser);
    this.userForm = this.fb.group({
      name: new FormControl(this.userProfile.name, [Validators.required]),
      gioitinh: new FormControl(this.userProfile.gioitinh, [Validators.required]),
      ngaysinh: new FormControl(this.userProfile.ngaysinh, [Validators.required]),
      socmt: new FormControl(this.userProfile.socmt, [Validators.required]),
      quoctich: new FormControl(this.userProfile.quoctich, [Validators.required]),
      quequan: new FormControl(this.userProfile.quequan, [Validators.required]),
      noiohientai: new FormControl(this.userProfile.noiohientai, [Validators.required]),
      hokhau: new FormControl(this.userProfile.hokhau, [Validators.required]),
      quatrinhlamviec: new FormControl(this.userProfile.quatrinhlamviec, [Validators.required]),
      email: new FormControl(this.userProfile.email, [Validators.required]),
      sodt: new FormControl(this.userProfile.sodt, [Validators.required]),
      tenLop: new FormControl(this.userProfile.ngaycap, [Validators.required])
    });
  }

  onEdit(){

  }

}
