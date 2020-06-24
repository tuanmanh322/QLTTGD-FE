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
    totalRecords: 0
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
  isAction: boolean;
  disableLike: boolean;
  disableDislike: boolean;
  isAuthenticate: boolean;
  isLoading: boolean;
  titleBV = new FormControl();

  bvauto: Observable<Baiviet[] | Observable<Baiviet[]>>;

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
      tap(() => this.isLoading = true),
      switchMap(title => this.baiVietService.loadAutoCompleteBV(title)),
      tap(() => this.isLoading = false));

    $('#titlebv').reset();
    $('form').children('input:not(#submit)').val('');
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

  doSearch(title: string) {
    this.baiVietSearchTotal.titleBV = title;
    this.getAllTopic();
    this.titleTopic = title;
    // $('input, textarea').each(function() {
    //   $(this).attr('placeholder', $(this).val());
    //   $(this).val('');
    // });
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
    this.checkAlreadyLike(bv.idBV);
    this.clickCount = index;
    if (this.isLike === true) {
      const bvp = {
        luotthich: bv.luotthich - 1
      };
      this.apiService.post('/api/baiviet/like/' + bv.idBV, bvp).subscribe(res => {
        this.getAllTopic();
        this.disableDislike = true;
      });
    } else if (this.isLike === false) {
      const bvp = {
        luotthich: bv.luotthich + 1
      };
      this.apiService.post('/api/baiviet/like/' + bv.idBV, bvp).subscribe(res => {
        this.getAllTopic();
        this.disableDislike = true;
      });
    }
    this.isAction = true;
  }

  clickDislike(bv: BaiVietTotal, index: number) {
    this.checkLogin();
    this.checkAlreadyDisLike(bv.idBV);
    this.clickCount = index;
    if (this.isDislike === true) {
      const bvp = {
        luotkhongthich: bv.luotkhongthich - 1
      };
      this.apiService.post('/api/baiviet/dislike/' + bv.idBV, bvp).subscribe(res => {
        this.getAllTopic();
        this.disableLike = true;
        this.clickCount = 0;
      });
    } else if (this.isDislike === false) {
      const bvp = {
        luotkhongthich: bv.luotkhongthich + 1
      };
      this.apiService.post('/api/baiviet/dislike/' + bv.idBV, bvp).subscribe(res => {
        this.getAllTopic();
        this.disableLike = true;
        this.clickCount = 0;
      });
    }
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

  onSend() {
    this.apiService.sendTitle(this.titleBV.value);
    this.titleBV.setValue('');
  }
}
