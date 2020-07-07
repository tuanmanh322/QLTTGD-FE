import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../shared/service/api.service';
import {Title} from '@angular/platform-browser';
import {Baiviet} from '../../../shared/model/baiviet';
import * as EditorClassic from '@ckeditor/ckeditor5-build-classic';
import {ToastrService} from 'ngx-toastr';
import {UploadAdapter} from '../../../shared/model/upload-adapter';
import {UserProfileModel} from '../../../shared/model/user-profile.model';
import {CURRENT_USER, TOKEN} from '../../../shared/model/qlttgd.constant';
import {UserService} from '../../../shared/service/user.service';
import {NotificationService} from '../../../shared/service/notification.service';
import {BaiVietTotal} from '../../../shared/model/bai-viet-total';

declare var $: any;

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent implements OnInit, OnDestroy {
  public editor = EditorClassic;
  baiViet: Baiviet;
  timeFormatter: number = 0;
  commentContent = '';
  userProfile: UserProfileModel;
  repcomment = '';
  isDislike: boolean;
  isLike: boolean;
  private isAction: boolean;
  clickCount = 0;
  private disableDislike: boolean;
  private disableLike: boolean;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private title: Title,
    private toastr: ToastrService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {
  }

  loader: any;

  public onReady(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new UploadAdapter(loader);
    };
  }

  ngOnInit(): void {
    this.notificationService.startListening();
    $(document).ready(function() {
      $('.reply-popup').click(function() {
        $('.reply-box').toggle();
      });
    });
    setInterval(() => this.timeFormatter = Math.random(), 60 * 1000);
    this.baiVietDetail();
    this.userProfile = JSON.parse(localStorage.getItem(CURRENT_USER));


  }

  ngOnDestroy(): void {
    this.notificationService.stopListenning();
  }

  baiVietDetail() {
    this.route.params.subscribe(routeParam => {
      const idBV = routeParam.id;
      this.apiService.get('/api/baiviet/detail-baiviet/' + idBV).subscribe(res => {
        this.baiViet = res;
        this.title.setTitle(this.baiViet.title);
      });

      this.apiService.get('/api/notification/is-read-bv/' + idBV).subscribe(res => {
        console.log(res);
      });
    });
  }

  showComment() {

  }

  postRepComment(idCM: number, idBV: number) {
    if (this.repcomment === '' || this.repcomment.length <= 0) {
      this.toastr.error('Bạn chưa nhập vào nội dung!');
      return;
    }
    const repcm = {
      noidung: this.repcomment
    };
    const fd = new FormData();
    fd.append('noidung', this.repcomment);
    this.apiService.post('/api/rep-comment/rep-comment/' + idCM +'/' + idBV, fd).subscribe(res => {
      this.baiVietDetail();
    }, error => {
      this.toastr.error('Repcomment failed!');
    });
  }

  postComment(idBv: number) {
    if (!this.userService.isLogin()) {
      this.toastr.error('Bạn cần đăng nhập để bình luận!');
      return;
    }

    if (this.commentContent === '') {
      this.toastr.error('Bạn cần nhập vào nội dung');
      return;
    }

    const formData = new FormData();
    formData.append('noiDung', this.commentContent);

    this.apiService.post('/api/comment/is-comment/' + idBv, formData).subscribe(res => {
      console.log(res);
      this.commentContent = '';
      this.baiVietDetail();
    });
  }

  clickToggle(i: number) {
    this.checkLogin();
    let elem = document.getElementById('toggletest' + i);
    switch (elem.classList.length) {
      case 3:
        elem.classList.add('toggler');
        break;
      case 4:
        elem.classList.remove('toggler');
        break;
    }
  }

  removeDisplay(id: number) {
    let element = document.getElementById('toggletest' + id);
    if (element.classList.length === 3) {
      element.classList.add('toggler');
    }
  }

  cancle() {
    let eleMain = document.getElementById('mainComment');
    if (eleMain.classList.length === 3) {
      eleMain.classList.add('toggler');
    }
  }
  clickLike(bv: Baiviet, index: number) {
    this.checkLogin();
    this.checkAlreadyLike(bv.id);
    this.clickCount = index;
    if (this.isLike === true) {
      const bvp = {
        luotthich: bv.luotthich - 1
      };
      this.apiService.post('/api/baiviet/like/' + bv.id, bvp).subscribe(res => {
        this.baiVietDetail();
        this.disableDislike = true;
      });
    } else if (this.isLike === false) {
      const bvp = {
        luotthich: bv.luotthich + 1
      };
      this.apiService.post('/api/baiviet/like/' + bv.id, bvp).subscribe(res => {
        this.baiVietDetail();
        this.disableDislike = true;
      });
    }
    this.isAction = true;
  }

  clickDislike(bv: Baiviet, index: number) {
    this.checkLogin();
    this.checkAlreadyDisLike(bv.id);
    this.clickCount = index;
    if (this.isDislike === true) {
      const bvp = {
        luotkhongthich: bv.luotkhongthich - 1
      };
      this.apiService.post('/api/baiviet/dislike/' + bv.id, bvp).subscribe(res => {
        this.baiVietDetail();
        this.disableLike = true;
        this.clickCount = 0;
      });
    } else if (this.isDislike === false) {
      const bvp = {
        luotkhongthich: bv.luotkhongthich + 1
      };
      this.apiService.post('/api/baiviet/dislike/' + bv.id, bvp).subscribe(res => {
        this.baiVietDetail();
        this.disableLike = true;
        this.clickCount = 0;
      });
    }
  }
  checkLogin() {
    if (localStorage.getItem(TOKEN) === null) {
      this.toastr.error('Bạn cần phải đăng nhập để thực hiện thao tác này!');
      return;
    }
  }

  checkAlreadyLike(idBV: number) {
    this.apiService.get('/api/notification/already-like/' + idBV).subscribe(res => {
      this.isLike = res;
    });
  }

  checkAlreadyDisLike(idBV: number) {
    this.apiService.get('/api/notification/already-dislike/' + idBV).subscribe(res => {
      this.isDislike = res;
    });
  }
}
