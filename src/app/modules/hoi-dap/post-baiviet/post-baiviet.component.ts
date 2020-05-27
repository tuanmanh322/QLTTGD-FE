import {Component, OnInit} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ApiService} from '../../../shared/service/api.service';
import {FormBuilder} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {StorageService} from '../../../shared/service/storage.service';
import {UserProfileModel} from '../../../shared/model/user-profile.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-post-baiviet',
  templateUrl: './post-baiviet.component.html',
  styleUrls: ['./post-baiviet.component.css']
})
export class PostBaivietComponent implements OnInit {
  public editor: ClassicEditor;
  baiVietContent: any;
  userProfile: UserProfileModel;
  tagCauHoi: any;
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private storageService: StorageService,
    public ngbModal: NgbActiveModal
  ) {
  }

  ngOnInit(): void {
    this.userProfile = this.storageService.getProfileJson();
  }

  postBaiViet() {
    if (this.baiVietContent === '') {
      this.toastr.error('Bạn chưa nhập nội dung');
      return;
    }
    const baiViet = {
      noidung: this.baiVietContent,
      idUser: this.userProfile.id
    };
    this.apiService.post('/api/baiviet/add', baiViet).subscribe(res => {
      this.toastr.success('Đăng bài thành công!');
      this.ngbModal.dismiss();
    }, error => {
      this.toastr.error('Đăng bài thất bại!');
      this.toastr.error(error);
    });
  }

  closePopup() {
    this.ngbModal.dismiss();
    this.apiService.onFilter('close');
  }

}
