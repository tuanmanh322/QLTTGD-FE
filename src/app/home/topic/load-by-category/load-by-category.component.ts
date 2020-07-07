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

  onSend() {
    this.apiService.sendTitle(this.bvTitle.value);
  }
}
