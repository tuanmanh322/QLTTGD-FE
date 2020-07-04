import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../shared/service/api.service';
import {FormBuilder} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {StorageService} from '../../../shared/service/storage.service';
import {UserProfileModel} from '../../../shared/model/user-profile.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ChuDeCount} from '../../../shared/model/chu-de-count';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {UploadAdapter} from '../../../shared/model/upload-adapter';

@Component({
  selector: 'app-post-baiviet',
  templateUrl: './post-baiviet.component.html',
  styleUrls: ['./post-baiviet.component.css']
})
export class PostBaivietComponent implements OnInit {
  public Editor = ClassicEditor;
  baiVietContent: any;
  userProfile: UserProfileModel;
  tagCauHoi: any;
  chuDe: ChuDeCount[];
  idCd: number;
  title = '';
  isTitle: boolean = false;
  isContent: boolean = false;
  loader: any;
  public onReady( editor ) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new UploadAdapter(loader);
    };
  }
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
    this.apiService.get('/api/chu-de/all').subscribe(res => {
      this.chuDe = res;
    });

  }



  postBaiViet() {
    if (this.baiVietContent === '') {
      this.isContent = true;
      return;
    }
    if (this.title === '') {
      this.isTitle = true;
      return;
    }
    const baiViet = {
      noidung: this.baiVietContent,
      idUser: this.userProfile.id,
      idCD: this.idCd,
      title: this.title
    };
    console.log(this.idCd);
    this.apiService.post('/api/baiviet', baiViet).subscribe(res => {
      this.toastr.success('Đăng bài thành công! Bài viết của bạn cần được phê duyệt!');
      this.apiService.onFilter('create-post');
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
