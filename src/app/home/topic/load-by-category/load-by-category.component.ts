import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../shared/service/api.service';
import {Title} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {Baiviet} from '../../../shared/model/baiviet';
import {BaivietSearchTotal} from '../../../shared/model/baiviet-search-total';
import {BaiVietTotal} from '../../../shared/model/bai-viet-total';
import {TITLE} from '../../../shared/model/qlttgd.constant';

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

  constructor(
    private apiService: ApiService,
    private title: Title,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    setInterval(() => this.timeFormatter = Math.random(), 60 * 10000);
    this.getAllByCDid();
  }

  getQuery() {
    // this.subscription = this.apiService.$title.subscribe(
    //   item => {
    this.baiVietSearchTotal.titleBV = localStorage.getItem(TITLE);
    console.log(localStorage.getItem(TITLE));
    localStorage.removeItem(TITLE);
    this.getAllByCDid();
    //   },
    //   error => this.error = error
    // );
  }
  getAllByCDid() {
    this.route.params.subscribe(paramMap => {
      const idCD = paramMap.id;
      this.apiService.post('/api/baiviet/search-total-id-cd/' + idCD, this.baiVietSearchTotal).subscribe(res => {
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

}
