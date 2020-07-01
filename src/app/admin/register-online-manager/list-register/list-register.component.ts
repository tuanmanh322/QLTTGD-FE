import {Component, OnInit} from '@angular/core';
import {LopHocRequest} from '../../../shared/model/lop-hoc-request';
import {LopHocSearch} from '../../../shared/model/lop-hoc-search';
import {Title} from '@angular/platform-browser';
import {ApiService} from '../../../shared/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {FormControl} from '@angular/forms';
import {LopEnti} from '../../../shared/model/lop-enti';

@Component({
  selector: 'app-list-register',
  templateUrl: './list-register.component.html',
  styleUrls: ['./list-register.component.css']
})
export class ListRegisterComponent implements OnInit {

  lopHocRq: LopHocRequest[];

  lopSearch: LopHocSearch = {
    totalRecords: 0,
    page: 0,
    pageSize: 10,
    orders: [],
    totalPages: 0,
    tenLop: '',
    username: ''
  };
  tl = new FormControl();

  lopList: LopEnti[];

  constructor(
    private title: Title,
    private api: ApiService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.fetch();
    this.title.setTitle('Đăng ký online!');
    this.api.get('/api/lop-hoc/all').subscribe(res => {
      this.lopList = res;
    });
  }


  fetch() {
    this.api.post('/api/lop-hoc/lop-request', this.lopSearch).subscribe(res => {
      this.lopSearch = res;
      this.lopHocRq = this.lopSearch.data;
    });
  }

  doSearch() {
    this.lopSearch.tenLop = this.tl.value;
    this.lopSearch.page = 0;
    this.fetch();
  }

  activeLop(idULM: number) {
    this.api.get('/api/hoc-sinh/active-lop/' + idULM).subscribe(res => {
      this.toastr.success('Cập nhật thành công');
      this.fetch();
    }, error => {
      this.toastr.error('Cập nhật thất bại');
    });
  }

  deleteLop(id: number) {
    this.api.delete('/api/hoc-sinh/delete-register/' + id).subscribe(res => {
      this.toastr.success('Xoá thành công!');
      this.fetch();
    }, error => {
      this.toastr.error('Xóa thất bại');
    });
  }

  unActive(idULM: number) {
    this.api.get('/api/hoc-sinh/unactive-lop/ ' + idULM).subscribe(res => {
      this.toastr.success('Cập nhật thành công');
      this.fetch();
    }, error => {
      this.toastr.error('Cập nhật thất bại');
    });
  }
}
