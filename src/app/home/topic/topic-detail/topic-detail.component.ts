import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../shared/service/api.service';
import {Title} from '@angular/platform-browser';
import {Baiviet} from '../../../shared/model/baiviet';
import * as EditorClassic from '@ckeditor/ckeditor5-build-classic';
import {ToastrService} from 'ngx-toastr';
import {UploadAdapter} from '../../../shared/model/upload-adapter';
import {UserProfileModel} from '../../../shared/model/user-profile.model';
import {CURRENT_USER} from '../../../shared/model/qlttgd.constant';

declare var $: any;

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent implements OnInit {
  public editor = EditorClassic;
  baiViet: Baiviet;
  timeFormatter: number = 0;
  commentContent = '';
  userProfile: UserProfileModel;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private title: Title,
    private toastr: ToastrService
  ) {
  }

  loader: any;

  public onReady(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new UploadAdapter(loader);
    };
  }

  ngOnInit(): void {
    $(document).ready(function() {
      $('.reply-popup').click(function() {
        $('.reply-box').toggle();
      });
    });
    setInterval(() => this.timeFormatter = Math.random(), 60 * 1000);
    this.route.params.subscribe(routeParam => {
      const idBV = routeParam.id;
      this.apiService.get('/api/baiviet/detail-baiviet/' + idBV).subscribe(res => {
        this.baiViet = res;
        this.title.setTitle(this.baiViet.title);
      });
    });
    this.userProfile = JSON.parse(localStorage.getItem(CURRENT_USER));
  }

  showComment() {

  }

  postComment(idBv: number) {
    if (this.commentContent === '') {
      this.toastr.error('Bạn cần nhập vào nội dung');
      return;
    }

    const formData = new FormData();
    formData.append('noiDung', this.commentContent);

    this.apiService.post('/api/comment/is-comment/' + idBv, formData).subscribe(res => {
      console.log(res);
      this.commentContent = '';
    });
  }
}
