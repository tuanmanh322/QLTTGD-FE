import {Component, Input, OnInit} from '@angular/core';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ApiService} from '../../../shared/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {StorageService} from '../../../shared/service/storage.service';
import {UserProfileModel} from '../../../shared/model/user-profile.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Baiviet} from '../../../shared/model/baiviet';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent implements OnInit {
  @Input() baiviet: any;
  commentContent: any;
  profileUser: UserProfileModel;
  baiViet: Baiviet;
  tagCauHoi: any;
  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private storageService: StorageService,
    public ngbActivateModal: NgbActiveModal,
  ) {
  }

  ngOnInit(): void {
    this.profileUser = this.storageService.getProfileJson();
    this.baiViet = this.baiviet;
  }


  postComment() {
    // if (this.commentContent === '' && this.commentContent === null) {
    //   this.toastr.error('Bạn chưa nhập nội dung bình luận!');
    //   return;
    // }
    // const comment = {
    //   noiDung: this.commentContent,
    //   idBaiViet: this.baiViet.idBaiViet,
    //   idUser: this.profileUser.id
    // };
    // this.apiService.post('/api/comment/add', comment).subscribe(res => {
    //   this.toastr.success('Bình luận thành công!');
    // }, error => {
    //   this.toastr.error(error);
    // });
  }

  closePopup() {
    this.ngbActivateModal.dismiss();
    this.apiService.onFilter('close');
  }
}
