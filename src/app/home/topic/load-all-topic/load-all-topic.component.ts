import {Component, OnInit} from '@angular/core';
import {Baiviet} from '../../../shared/model/baiviet';
import {ApiService} from '../../../shared/service/api.service';
import {Title} from '@angular/platform-browser';
import {BaivietSearchTotal} from '../../../shared/model/baiviet-search-total';
import {BaiVietTotal} from '../../../shared/model/bai-viet-total';
import {DataService} from '../../../shared/service/data.service';
import {Subject, Subscription} from 'rxjs';
import {CURRENT_USER, TITLE} from '../../../shared/model/qlttgd.constant';
import {UserProfileModel} from '../../../shared/model/user-profile.model';
import {ToastrService} from 'ngx-toastr';

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
  userProfile: UserProfileModel;
  clickCount = 0;
  constructor(
    private apiService: ApiService,
    private title: Title,
    private dataService: DataService,
    private toastr: ToastrService
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
    this.userProfile = JSON.parse(localStorage.getItem(CURRENT_USER));
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

  clickLike(bv: BaiVietTotal, index: number) {
    this.checkLogin();
    this.checkAlreadyLike(bv.idBV);
    this.clickCount = index;
    if (this.isLike === true ) {
      const bvp = {
        luotthich: bv.luotthich - 1
      };
      this.apiService.post('/api/baiviet/like/' + bv.idBV, bvp).subscribe(res => {
        this.getAllTopic();
      });
    } else if (this.isLike === false){
      const bvp = {
        luotthich: bv.luotthich + 1
      };
      this.apiService.post('/api/baiviet/like/' + bv.idBV, bvp).subscribe(res => {
        this.getAllTopic();
      });
    }
  }

  clickDislike(bv: BaiVietTotal, index: number) {
    this.checkLogin();
    this.checkAlreadyDisLike(bv.idBV);
    this.clickCount++;
    if (this.isDislike === true ) {
      const bvp = {
        luotkhongthich: bv.luotkhongthich - 1
      };
      this.apiService.post('/api/baiviet/dislike/' + bv.idBV, bv).subscribe(res => {
        this.getAllTopic();
      });
    } else if (this.isDislike === false  ){
      const bvp = {
        luotkhongthich: bv.luotkhongthich + 1
      };
      this.apiService.post('/api/baiviet/dislike/' + bv.idBV, bvp).subscribe(res => {
        this.getAllTopic();
      });
    }
  }

  pageChanged(event) {
    this.baiVietSearchTotal.page = event;
  }

  checkLogin() {
    if (!this.userProfile) {
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
