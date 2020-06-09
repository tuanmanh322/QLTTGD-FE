import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../shared/service/api.service';
import {Title} from '@angular/platform-browser';
import {Baiviet} from '../../shared/model/baiviet';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PostBaivietComponent} from './post-baiviet/post-baiviet.component';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {StorageService} from '../../shared/service/storage.service';
import {UserProfileModel} from '../../shared/model/user-profile.model';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-hoi-dap',
  templateUrl: 'hoi-dap.component.html',
  styleUrls: ['hoi-dap.component.scss']
})
export class HoiDapComponent implements OnInit {
  baiVietList: Baiviet[];
  // public editor: ClassicEditor;
  commentContent: any;
  repCommentContent: any;
  userProfile: UserProfileModel;
  constructor(
    private apiService: ApiService,
    private title: Title,
    private ngbModal: NgbModal,
    private storageService: StorageService,
    private toastr: ToastrService
  ) {
    this.apiService.onLoad().subscribe(loadData => {
      console.log(loadData);
      this.getAll();
    });
  }

  ngOnInit(): void {
    this.userProfile = this.storageService.getProfileJson();
    this.title.setTitle('Hỏi đáp');
    this.getAll();
  }

  getAll() {
    this.apiService.get('/api/baiviet/all').subscribe(res => {
      this.baiVietList = res;
    });
  }

  openPostBaiViet() {
    this.ngbModal.open(PostBaivietComponent, {size: 'lg'});
  }

  postComment(idBaiViet: number){
    if (this.commentContent === '' && this.commentContent === null) {
      this.toastr.error('Bạn chưa nhập nội dung bình luận!');
      return;
    }
    const comment = {
      noiDung: this.commentContent,
      idBaiViet: idBaiViet,
      idUser: this.userProfile.id
    };
    this.apiService.post('/api/comment/add', comment).subscribe(res => {
      this.toastr.success('Bình luận thành công!');
    }, error => {
      this.toastr.error(error);
    });
  }

  postRepComment(idBaiViet: number, idComment: number){
    if (this.repCommentContent === '' && this.repCommentContent === null) {
      this.toastr.error('Bạn chưa nhập nội dung bình luận!');
      return;
    }
    const repcomment = {
      noiDung: this.commentContent,
      idBaiViet: idBaiViet,
      idUser: this.userProfile.id,
      idComment: idComment
    };
    this.apiService.post('/api/rep-comment/add', repcomment).subscribe(res => {
      this.toastr.success('Bình luận thành công!');
    }, error => {
      this.toastr.error(error);
    });
  }
}
