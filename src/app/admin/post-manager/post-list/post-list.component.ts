import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {BaivietManagerSearch} from '../../../shared/model/baiviet-manager-search';
import {FormControl} from '@angular/forms';
import {BaivietManager} from '../../../shared/model/baiviet-manager';
import {ApiService} from '../../../shared/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {ChudeModel} from '../../../shared/model/chude-model';
import {ChuDeCount} from '../../../shared/model/chu-de-count';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  bvS: BaivietManagerSearch = {
    page: 0,
    pageSize: 10,
    orders: [],
    totalRecords: 0,
    totalPages: 0,
    active: null,
    noidung: '',
    titleBV: '',
    tenChuDe: ''
  };
  acF = new FormControl();
  bvL: BaivietManager[];
  cdF = new FormControl();
  cdList: ChuDeCount[];

  constructor(
    private title: Title,
    private api: ApiService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.title.setTitle('Quản lý bài viết');
    this.api.get('/api/chu-de/all').subscribe(res => {
      this.cdList = res;
    });
    this.fetch();
  }

  fetch() {
    this.api.post('/api/baiviet/search', this.bvS).subscribe(res => {
      this.bvS = res;
      this.bvL = this.bvS.data;
      console.log(res);
    });
  }

  search() {
    this.bvS.tenChuDe = this.cdF.value;
    this.bvS.active = this.acF.value;
    this.bvS.page = 0;
    this.fetch();
  }

  deleteBV(id: number) {
    this.api.delete('/api/baiviet/delete/' + id).subscribe(res => {
      this.toastr.success('Xoá thành công!');
      this.fetch();
    }, error => {
      this.toastr.error('Xoá thất bại!');
    });
  }

  activeBV(id: number) {
    this.api.get('/api/baiviet/active-bv/' + id).subscribe(res => {
      this.toastr.success('Cập nhật thành công!');
      this.fetch();
    }, error => {
      this.toastr.error('Cập nhật thất bại');
    });
  }

  unActiveBV(id: number) {
    this.api.get('/api/baiviet/un-active-bv/' + id).subscribe(res => {
      this.toastr.success('Cập nhật thành công!');
      this.fetch();
    }, error => {
      this.toastr.error('Cập nhật thất bại');
    });
  }
}
