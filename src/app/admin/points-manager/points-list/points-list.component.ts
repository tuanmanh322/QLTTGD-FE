import {Component, OnInit} from '@angular/core';
import {DiemManagerSearch} from '../../../shared/model/diem-manager-search';
import {DiemManager} from '../../../shared/model/diem-manager';
import {ApiService} from '../../../shared/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-points-list',
  templateUrl: './points-list.component.html',
  styleUrls: ['./points-list.component.css']
})
export class PointsListComponent implements OnInit {
  pS: DiemManagerSearch = {
    page: 0,
    pageSize: 10,
    totalRecords: 0,
    totalPages: 0,
    orders: [],
    maThe: '',
    username: ''
  };
  pL: DiemManager[];

  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private title: Title
  ) {
  }

  ngOnInit(): void {
    this.title.setTitle('Quản lý điểm!');
    this.fetch();
  }

  fetch() {
    this.api.post('/api/diem/search', this.pS).subscribe(res => {
      this.pS = res;
      this.pL = this.pS.data;
    });
  }

  doSearch() {
    this.pS.page = 0;
    this.fetch();
  }

  delete(id: number) {
    this.api.delete('/api/diem/delete/' + id).subscribe(res=> {
      this.toastr.success('Xóa thành công!');
      this.fetch();
    }, error =>  {
      this.toastr.error('Xóa thất bại!');
    })
  }

}
