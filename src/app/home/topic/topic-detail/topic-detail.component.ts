import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../shared/service/api.service';
import {Title} from '@angular/platform-browser';
import {Baiviet} from '../../../shared/model/baiviet';
import * as EditorClassic from '@ckeditor/ckeditor5-build-classic';
import {ToastrService} from 'ngx-toastr';
import {UploadAdapter} from '../../../shared/model/upload-adapter';

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
    setInterval(() => this.timeFormatter = Math.random(), 60 * 1000);
    this.route.params.subscribe(routeParam => {
      const idBV = routeParam.id;
      this.apiService.get('/api/baiviet/detail-baiviet/' + idBV).subscribe(res => {
        this.baiViet = res;
        this.title.setTitle(this.baiViet.title);
      });
    });
  }

  showComment() {

  }

  postComment() {
    this.apiService.post('/api/comment').subscribe(res => {
      console.log(res);
    });
  }
}
