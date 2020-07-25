import {Component, OnInit} from '@angular/core';
import {Baiviet} from '../../../shared/model/baiviet';
import {ApiService} from '../../../shared/service/api.service';
import {Title} from '@angular/platform-browser';
import {BaivietSearchTotal} from '../../../shared/model/baiviet-search-total';
import {BaiVietTotal} from '../../../shared/model/bai-viet-total';
import {DataService} from '../../../shared/service/data.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {ADMIN, CURRENT_USER, ROLE, TITLE, TOKEN, USER_PROFILE_CHANGED} from '../../../shared/model/qlttgd.constant';
import {UserProfileModel} from '../../../shared/model/user-profile.model';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../../shared/service/user.service';
import {EventManagement} from '../../../shared/service/event.management';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {BaiVietService} from '../../../shared/service/bai-viet.service';

declare var $: any;

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
    totalRecords: 0,
    noidungBV: ''
  };
  date: any;
  timeFormatter: number = 0;
  time: any;
  $refresh = new Subject<void>();
  error: string;
  data = '';
  isLike: boolean;
  isDislike: boolean;
  totalItem;
  userProfile: UserProfileModel;
  clickCount = 0;
  titleTopic = '';
  isActionLike: boolean;
  isActionDisLike: boolean;
  disableLike: boolean;
  disableDislike: boolean;
  isAuthenticate: boolean;
  isLoading: boolean;
  titleBV = new FormControl();

  bvauto: Observable<Baiviet[] | Observable<Baiviet[]>>;
  bvAutoContent: Observable<Baiviet[] | Observable<Baiviet[]>>;
  clickSearch: boolean;
  dataIDBV = [0];
  number1 = 0;
  number2 = 0;

  constructor(
    private apiService: ApiService,
    private title: Title,
    private dataService: DataService,
    private toastr: ToastrService,
    private userService: UserService,
    private eventManagement: EventManagement,
    private baiVietService: BaiVietService
  ) {
    this.apiService.onLoad().subscribe(() => {
      this.getAllTopic();
    });
  }

  ngOnInit(): void {
    this.title.setTitle('Trang chủ');
    this.eventManagement.subscribe(USER_PROFILE_CHANGED, () => {
      this.getProfile();
    });
    this.userService.getAuthState().subscribe(() => {
      this.getProfile();
    });

    setInterval(() => this.timeFormatter = Math.random(), 60 * 1000);
    this.time = new Date().getTime();
    this.$refresh.asObservable();
    // this.baiVietSearchTotal.titleBV = localStorage.getItem(TITLE).toString();
    // localStorage.removeItem(TITLE);
    this.getAllTopic();
    this.userProfile = JSON.parse(localStorage.getItem(CURRENT_USER));
    this.getQuery();
    this.bvauto = this.titleBV.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(() => this.clickSearch = true),
      switchMap(title => this.baiVietService.loadAutoCompleteBV(title)),
      tap(() => this.clickSearch = false));

    this.bvAutoContent = this.titleBV.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(title => this.baiVietService.loadAutoCompleteContentBV(title)),
      tap(() => this.isLoading = false));
  }

  getProfile() {
    const authenticate = this.userService.isLogin();
    if (!authenticate) {
      this.userProfile = {};
      this.isAuthenticate = false;
      return;
    }
    this.userService.identity().then(userProfile => {
      this.userProfile = userProfile;
      this.isAuthenticate = true;
    });

  }

  doSearch(title: string, content: string) {
    this.baiVietSearchTotal.titleBV = title;
    this.baiVietSearchTotal.noidungBV = content;
    this.getAllTopic();
    this.titleTopic = title;
    let ele = document.getElementById('search-list');
    ele.style.display = 'none';
  }

  setStyle() {
    let ele = document.getElementById('search-list');
    ele.style.display = 'block';
  }

  getQuery() {
    this.apiService.sub.subscribe(
      item => {
        this.baiVietSearchTotal.titleBV = item;
        this.getAllTopic();
      },
      error => this.error = error
    );
  }

  autoComplete(keysword: string) {
    const auto = {
      keyword: keysword,
      excludeKeywords: []
    };
    this.apiService.post('/api/auto-complete/bv', auto);

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
    // this.checkAlreadyLike(bv.idBV, index);
    if (this.dataIDBV.length === 2) {
      this.dataIDBV.splice(1, 1);
      this.dataIDBV.unshift(bv.idBV);
    } else {
      this.dataIDBV.unshift(bv.idBV);
    }
    this.number1 = this.dataIDBV[0];
    this.number2 = this.dataIDBV[1];
    this.apiService.get('/api/notification/already-like/' + bv.idBV).subscribe(res => {
      this.isLike = res;
      let elem = document.getElementById('disableLike' + index);
      if (this.isLike === true) {
        elem.style.color = 'blue';
      } else {
        elem.style.color = 'black';
      }
      this.isActionLike = this.isLike;
      if (this.isActionLike === true && this.number1 !== this.number2) {
        $('#disableLike' + index).attr('disable', 'disable');

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
      } else if (this.isActionLike === false && this.number1 !== this.number2) {
        const bvp = {
          luotthich: bv.luotthich + 1
        };
        this.apiService.post('/api/baiviet/like/' + bv.idBV, bvp).subscribe(res => {
          this.getAllTopic();
          this.disableDislike = true;
        });
        this.isLike = null;
        this.isDislike = null;
      } else {
        this.toastr.error('Bạn đã vote bài viết này rồi!');
      }
    });
  }

  clickDislike(bv: BaiVietTotal, index: number) {
    this.checkLogin();
    if (this.dataIDBV.length === 2) {
      this.dataIDBV.splice(1);
      this.dataIDBV.unshift(bv.idBV);
    } else {
      this.dataIDBV.unshift(bv.idBV);
    }
    this.number1 = this.dataIDBV[0];
    this.number2 = this.dataIDBV[1];
    // this.checkAlreadyDisLike(bv.idBV, index);
    this.apiService.get('/api/notification/already-dislike/' + bv.idBV).subscribe(res => {
      this.isDislike = res;
      let elem = document.getElementById('disableDisLike' + index);
      if (this.isDislike === true) {
        elem.style.color = 'blue';
      } else {
        elem.style.color = 'black';
      }
      this.isActionDisLike = this.isDislike;
      this.clickCount = index;
      if (this.isActionDisLike === true && this.number1 !== this.number2) {
        $('#disableDisLike' + index).attr('disable', 'disable');
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
      } else if (this.isActionDisLike === false && this.number1 !== this.number2) {
        const bvp = {
          luotkhongthich: bv.luotkhongthich + 1
        };
        this.apiService.post('/api/baiviet/dislike/' + bv.idBV, bvp).subscribe(res => {
          this.getAllTopic();
          this.disableLike = true;
          this.clickCount = 0;
        });
        this.isDislike = null;
        this.isLike = null;

      } else {
        this.toastr.error('Bạn đã vote bài viết này rồi!');
      }
    });
  }

  pageChanged(event) {
    this.baiVietSearchTotal.page = event;
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

  onSend() {
    this.apiService.sendTitle(this.titleBV.value);
    this.titleBV.setValue('');
  }
}
