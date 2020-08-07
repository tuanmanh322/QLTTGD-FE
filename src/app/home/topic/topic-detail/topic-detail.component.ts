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
import {CommentModel} from '../../../shared/model/comment.model';

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
  isLikeCM: boolean;
  isDisLikeCM: boolean;
  dataIDBV = [0];
  number1 = 0;
  number2 = 0;
  isActionDisLike: boolean;
  isActionLike: boolean;
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
    this.apiService.post('/api/rep-comment/rep-comment/' + idCM + '/' + idBV, fd).subscribe(res => {
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
    // this.checkAlreadyLike(bv.idBV, index);
    if (this.dataIDBV.length === 2) {
      this.dataIDBV.splice(1, 1);
      this.dataIDBV.unshift(bv.id);
    } else {
      this.dataIDBV.unshift(bv.id);
    }
    this.number1 = this.dataIDBV[0];
    this.number2 = this.dataIDBV[1];
    this.apiService.get('/api/notification/already-like/' + bv.id).subscribe(res => {
      this.isLike = res;
      let elem = document.getElementById('disableLikeDE');
      if (this.isLike === true) {
        elem.style.color = 'blue';
      } else {
        elem.style.color = 'black';
      }
      this.isActionLike = this.isLike;
      if (this.isActionLike === true || this.isActionDisLike === true) {
        $('#disableLikeDE').attr('disable', 'disable');

        this.toastr.error('Bạn đã vote bài viết này rồi!');
        // const bvp = {
        //   luotthich: bv.luotthich - 1
        // };
        // this.apiService.post('/api/baiviet/like/' + bv.idBV, bvp).subscribe(res => {
        //   this.getAllTopic();
        //   this.disableDislike = true;
        // });
        this.isLike = null;
        this.isDislike = null;
      } else if (this.isActionLike === false || this.isActionDisLike === false) {
        const bvp = {
          luotthich: bv.luotthich + 1
        };
        this.apiService.post('/api/baiviet/like/' + bv.id, bvp).subscribe(res => {
          this.baiVietDetail();
          this.disableDislike = true;
        });
        this.isLike = null;
        this.isDislike = null;
      }else {
        this.toastr.error('Bạn đã vote bài viết này rồi!');
      }
    });
  }

  clickDislike(bv: Baiviet, index: number) {
    this.checkLogin();
    if (this.dataIDBV.length === 2) {
      this.dataIDBV.splice(1);
      this.dataIDBV.unshift(bv.id);
    } else {
      this.dataIDBV.unshift(bv.id);
    }
    this.number1 = this.dataIDBV[0];
    this.number2 = this.dataIDBV[1];
    // this.checkAlreadyDisLike(bv.idBV, index);
    this.apiService.get('/api/notification/already-dislike/' + bv.id).subscribe(res => {
      this.isDislike = res;
      let elem = document.getElementById('disableDisLikeDE');
      if (this.isDislike === true) {
        elem.style.color = 'blue';
      } else {
        elem.style.color = 'black';
      }
      this.isActionDisLike = this.isDislike;
      this.clickCount = index;
      if (this.isActionDisLike === true || this.isLike === true) {
        $('#disableDisLikeDE').attr('disable', 'disable');
        this.toastr.error('Bạn đã vote bài viết này rồi!');
        // const bvp = {
        //   luotkhongthich: bv.luotkhongthich - 1
        // };
        // this.apiService.post('/api/baiviet/dislike/' + bv.idBV, bvp).subscribe(res => {
        //   this.getAllTopic();
        //   this.disableLike = true;
        //   this.clickCount = 0;
        // });
        this.isDislike = null;
        this.isLike = null;
      } else if (this.isActionDisLike === false || this.isLike === false) {
        const bvp = {
          luotkhongthich: bv.luotkhongthich + 1
        };
        this.apiService.post('/api/baiviet/dislike/' + bv.id, bvp).subscribe(res => {
          this.baiVietDetail();
          this.disableLike = true;
          this.clickCount = 0;
        });
        this.isDislike = null;
        this.isLike = null;
      }else{
        this.toastr.error('Bạn đã vote bài viết này rồi!');
      }
    });
  }

  checkLogin() {
    if (localStorage.getItem(TOKEN) === null) {
      this.toastr.error('Bạn cần phải đăng nhập để thực hiện thao tác này!');
      return;
    }
  }

  checkAlreadyLike(idBV: number, i: number) {
    this.apiService.get('/api/notification/already-like/' + idBV).subscribe(res => {
      this.isLike = res;
      let elem = document.getElementById('disableLike' + i);
      if (this.isLike === true) {
        elem.style.color = 'blue';
      } else {
        elem.style.color = 'black';
      }
    });
  }

  checkAlreadyDisLike(idBV: number, i: number) {
    this.apiService.get('/api/notification/already-dislike/' + idBV).subscribe(res => {
      this.isDislike = res;
      let elem = document.getElementById('disableDisLike' + i);
      if (this.isDislike === true) {
        elem.style.color = 'blue';
      } else {
        elem.style.color = 'black';
      }
    });
  }

  ClickLikeCM(cm: CommentModel, index: number) {
    this.checkLogin();
    this.apiService.get('/api/comment/check-like-cm/' + cm.id + '/' + this.baiViet.id).subscribe(res => {
      this.isLikeCM = res;
      let elem = document.getElementById('disableLikeCM' + index);
      if (this.isLikeCM === true) {
        elem.style.color = 'blue';
      } else {
        elem.style.color = 'black';
      }
      if (this.isDisLikeCM === true && this.isLikeCM === true) {

        $('#disableLike' + index).attr('disable', 'disable');
        this.toastr.error('Bạn đã vote bình luận này rồi!');
        // const bvp = {
        //   luotkhongthich: bv.luotkhongthich - 1
        // };
        // this.apiService.post('/api/baiviet/dislike/' + bv.idBV, bvp).subscribe(res => {
        //   this.getAllTopic();
        //   this.disableLike = true;
        //   this.clickCount = 0;
        // });
      } else if (this.isDisLikeCM === false && this.isLikeCM === false) {
        const cmp = {
          id: cm.id,
          luotThich: cm.luotThich + 1,
          idBaiViet: this.baiViet.id,
        };
        this.apiService.post('/api/comment/is-like-cm', cmp).subscribe(res => {
          this.baiVietDetail();
          this.disableLike = true;
          this.clickCount = 0;
        });
      }
    });
  }
  ClickDisLikeCM(cm: CommentModel, index: number) {
    this.checkLogin();
    this.apiService.get('/api/comment/check-dislike-cm/' + cm.id + '/' + this.baiViet.id).subscribe(res => {
      this.isDisLikeCM = res;
      let elem = document.getElementById('disableDisLikeCM' + index);
      if (this.isDisLikeCM === true) {
        elem.style.color = 'blue';
      } else {
        elem.style.color = 'black';
      }
      if (this.isDisLikeCM === true && this.isLikeCM === true) {

        $('#disableDisLike' + index).attr('disable', 'disable');
        this.toastr.error('Bạn đã vote bình luận này rồi!');
        // const bvp = {
        //   luotkhongthich: bv.luotkhongthich - 1
        // };
        // this.apiService.post('/api/baiviet/dislike/' + bv.idBV, bvp).subscribe(res => {
        //   this.getAllTopic();
        //   this.disableLike = true;
        //   this.clickCount = 0;
        // });
      } else if (this.isDisLikeCM === false && this.isLikeCM === false) {
        const cmp = {
          id: cm.id,
          luotKhongthich: cm.loutKhongthich + 1,
          idBaiViet: this.baiViet.id,
        };
        this.apiService.post('/api/comment/is-dislike-cm', cmp).subscribe(res => {
          this.baiVietDetail();
          this.disableLike = true;
          this.clickCount = 0;
        });
      }
    });
  }

  checkAlreadyLikeCM(idCM: number, idBV: number, i: number) {
    this.apiService.get('/api/comment/check-like-cm/' + idCM + '/' + idBV).subscribe(res => {
      this.isLikeCM = res;
      let elem = document.getElementById('disableLikeCM' + i);
      if (this.isLikeCM === true) {
        elem.style.color = 'blue';
      } else {
        elem.style.color = 'black';
      }
    });
  }

  checkAlreadyDisLikeCM(idCM: number, idBV: number, i: number) {
    this.apiService.get('/api/comment/check-dislike-cm/' + idCM + '/' + idBV).subscribe(res => {
      this.isDisLikeCM = res;
      let elem = document.getElementById('disableDisLikeCM' + i);
      if (this.isDisLikeCM === true) {
        elem.style.color = 'blue';
      } else {
        elem.style.color = 'black';
      }
    });
  }
}
