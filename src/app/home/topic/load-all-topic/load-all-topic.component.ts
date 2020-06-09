import {Component, OnDestroy, OnInit} from '@angular/core';
import {Baiviet} from '../../../shared/model/baiviet';
import {ApiService} from '../../../shared/service/api.service';
import {Title} from '@angular/platform-browser';
import {BaivietSearchTotal} from '../../../shared/model/baiviet-search-total';
import {BaiVietTotal} from '../../../shared/model/bai-viet-total';
import {DataService} from '../../../shared/service/data.service';
import {Subject, Subscription} from 'rxjs';
import {retry, tap} from 'rxjs/operators';
import {TITLE} from '../../../shared/model/qlttgd.constant';

@Component({
  selector: 'app-load-all-topic',
  templateUrl: './load-all-topic.component.html',
  styleUrls: ['./load-all-topic.component.css']
})
export class LoadAllTopicComponent implements OnInit {
  baiViet: Baiviet[];
  baiVietTotal: BaiVietTotal[];
  baiVietSearchTotal: BaivietSearchTotal = {
    page: 0,
    pageSize: 214748364,
    titleBV: '',
    idChuDe: null,
  };
  date: any;
  timeFormatter: number = 0;
  time: any;
  $refresh = new Subject<void>();
  subscription: Subscription;
  error: string;
  data = '';
  isLike: boolean;
  isDislike: boolean;

  constructor(
    private apiService: ApiService,
    private title: Title,
    private dataService: DataService
  ) {
    this.apiService.onLoad().subscribe(() => {
      this.getAllTopic();
    });
  }

  ngOnInit(): void {
    this.title.setTitle('Trang chủ');

    setInterval(() => this.timeFormatter = Math.random(), 60 * 1000);
    this.time = new Date().getTime();
    this.$refresh.asObservable();
    // this.baiVietSearchTotal.titleBV = localStorage.getItem(TITLE).toString();
    // localStorage.removeItem(TITLE);
    this.apiService.$title.subscribe(
      item => {
        this.baiVietSearchTotal.titleBV = localStorage.getItem(TITLE);
        console.log(item);
        console.log(localStorage.getItem(TITLE));
        localStorage.removeItem(TITLE);
      },
      error => this.error = error
    );
    this.getAllTopic();
  }

  // getQuery() {
  //   this.subscription = this.apiService.$title.subscribe(
  //     item => {
  //       this.baiVietSearchTotal.titleBV = localStorage.getItem(TITLE);
  //       console.log(item);
  //       console.log(localStorage.getItem(TITLE));
  //       localStorage.removeItem(TITLE);
  //     },
  //     error => this.error = error
  //   );
  // }

  getAllTopic() {
    this.apiService.post('/api/baiviet/search-total', this.baiVietSearchTotal).subscribe(res => {
      this.baiVietSearchTotal = res;
      this.baiVietTotal = this.baiVietSearchTotal.data;
    });
  }

  // ngOnDestroy(): void {
  //   this.apiService.get().;
  // }

  clickLike() {

  }

  clickDislike() {

  }
}
