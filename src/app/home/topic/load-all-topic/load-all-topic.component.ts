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
    pageSize: 10,
    titleBV: '',
    idChuDe: null,
    orders: [],
    totalRecords: 0
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
  totalItem;
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
    this.getAllTopic();
  }

  getQuery() {
    // this.subscription = this.apiService.$title.subscribe(
    //   item => {
        this.baiVietSearchTotal.titleBV = localStorage.getItem(TITLE);
        console.log(localStorage.getItem(TITLE));
        localStorage.removeItem(TITLE);
        this.apiService.post('/api/baiviet/search-total', this.baiVietSearchTotal).subscribe(res => {
          this.baiVietSearchTotal = res;
          this.baiVietTotal = this.baiVietSearchTotal.data;
        });
    //   },
    //   error => this.error = error
    // );
  }

  getAllTopic() {
    this.apiService.post('/api/baiviet/search-total', this.baiVietSearchTotal).subscribe(res => {
      this.baiVietSearchTotal = res;
      this.totalItem = res.totalRecords;
      this.baiVietTotal = this.baiVietSearchTotal.data;
      this.totalItem = this.baiVietSearchTotal.totalRecords;
    });
  }

  // ngOnDestroy(): void {
  //   this.apiService.get().;
  // }

  clickLike() {

  }

  clickDislike() {

  }

  pageChanged(event) {
    this.baiVietSearchTotal.page = event;
  }
}
