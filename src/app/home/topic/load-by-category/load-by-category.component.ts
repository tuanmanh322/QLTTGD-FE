import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../shared/service/api.service';
import {Title} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import {Baiviet} from '../../../shared/model/baiviet';
import {BaivietSearchTotal} from '../../../shared/model/baiviet-search-total';
import {BaiVietTotal} from '../../../shared/model/bai-viet-total';
import {Observable} from 'rxjs';
import {BaiVietService} from '../../../shared/service/bai-viet.service';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {TOKEN} from '../../../shared/model/qlttgd.constant';

declare var $: any;

@Component({
  selector: 'app-load-by-category',
  templateUrl: './load-by-category.component.html',
  styleUrls: ['./load-by-category.component.css']
})
export class LoadByCategoryComponent implements OnInit {
  baiViet: Baiviet[];
  date: any;
  timeFormatter = 0;
  time: any;
  message = '';
  isRenderDATA: boolean;
  cdName = '';
  baiVietTotal: BaiVietTotal[];
  baiVietSearchTotal: BaivietSearchTotal = {
    page: 0,
    pageSize: 10,
    titleBV: '',
    idChuDe: null,
    orders: [],
    totalRecords: 0
  };
  titleTopic = '';
  baivietAuto: Observable<Baiviet[] | Observable<Baiviet[]>>;
  isloading: boolean;
  titleNew = '';
  bvTitle = new FormControl();
  idCD = 0;
  dataIDBV = [0];
  number1 = 0;
  number2 = 0;
  isActionLike: boolean;
  isActionDisLike: boolean;
  isLike: boolean;
  isDislike: boolean;
  disableLike: boolean;
  disableDislike: boolean;
  clickCount = 0;
  bvContentAuto: Observable<Baiviet[] | Observable<Baiviet[]>>;
  constructor(
    private apiService: ApiService,
    private title: Title,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private baivietService: BaiVietService
  ) {
  }

  ngOnInit(): void {
    setInterval(() => this.timeFormatter = Math.random(), 60 * 10000);
    this.getAllByCDid();

    this.baivietAuto = this.bvTitle.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(() => this.isloading = true),
      switchMap((title) => this.baivietService.loadAutoCompleteCD(title, this.idCD)),
      tap(() => this.isloading = false)
    );
    this.bvContentAuto = this.bvTitle.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(() => this.isloading = true),
      switchMap((title) => this.baivietService.loadAutoCompleteContentCD(title, this.idCD)),
      tap(() => this.isloading = false)
    );
    this.getQuery();
  }

  getQuery() {
    this.apiService.sub.subscribe(
      item => {
        this.baiVietSearchTotal.titleBV = item;
        this.getAllByCDid();
      },
      error => {
        console.log(error);
      }
    );
  }

  Search(title: string, content: string) {
    this.baiVietSearchTotal.titleBV = title;
    this.baiVietSearchTotal.noidungBV = content;
    this.getAllByCDid();
    this.titleTopic = '';
    this.titleNew = title;
    let ele  = document.getElementById('search-list');
    ele.style.display = 'none';
  }

  setStyle() {
    let ele  = document.getElementById('search-list');
    ele.style.display = 'block';
  }

  getAllByCDid() {
    this.route.params.subscribe(paramMap => {
      this.idCD = paramMap.id;
      this.apiService.post('/api/baiviet/search-total-id-cd/' + this.idCD, this.baiVietSearchTotal).subscribe(res => {
        if (res === ' ' || res === undefined || res === null) {
          this.isRenderDATA = false;
          this.message = 'Chủ đề này chưa có dữ liệu';
        } else {
          this.isRenderDATA = true;
          this.baiVietSearchTotal = res;
          this.baiVietTotal = this.baiVietSearchTotal.data;
          this.baiVietTotal.map(bv => {
            this.cdName = bv.tenchude;
          });
        }
      });
    });
  }
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
      let elem = document.getElementById('disableCateLike' + index);
      if (this.isLike === true) {
        elem.style.color = 'blue';
      } else {
        elem.style.color = 'black';
      }
      this.isActionLike = this.isLike;
      if (this.isActionLike === true && this.number1 !== this.number2) {
        $('#disableCateLike' + index).attr('disable', 'disable');

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
          this.getAllByCDid();
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
      let elem = document.getElementById('disableCateDisLike' + index);
      if (this.isDislike === true) {
        elem.style.color = 'blue';
      } else {
        elem.style.color = 'black';
      }
      this.isActionDisLike = this.isDislike;
      this.clickCount = index;
      if (this.isActionDisLike === true && this.number1 !== this.number2) {
        $('#disableCateDisLike' + index).attr('disable', 'disable');
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
          this.getAllByCDid();
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
  checkLogin() {
    if (localStorage.getItem(TOKEN) === null) {
      this.toastr.error('Bạn cần phải đăng nhập để thực hiện thao tác này!');
      return;
    }
  }

  onSend() {
    this.apiService.sendTitle(this.bvTitle.value);
  }
}
