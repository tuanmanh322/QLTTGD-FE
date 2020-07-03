import {Component, OnInit} from '@angular/core';
import {MonHocSearch} from '../../../shared/model/mon-hoc-search';
import {MonHocModel} from '../../../shared/model/mon-hoc.model';
import {Title} from '@angular/platform-browser';
import {ApiService} from '../../../shared/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SubjectCreateComponent} from '../subject-create/subject-create.component';
import {SubjectEditComponent} from '../subject-edit/subject-edit.component';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
  mhSearch: MonHocSearch = {
    page: 0,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0,
    orders: [],
    maMonHoc: '',
    tenMonHoc: ''
  };
  mhList: MonHocModel[];

  constructor(
    private title: Title,
    private api: ApiService,
    private toastr: ToastrService,
    private ngbModal: NgbModal
  ) {
    this.api.onLoad().subscribe(() => {
      this.fetch();
    });
  }

  ngOnInit(): void {
    this.title.setTitle('Quản lý môn học');
    this.fetch();
  }

  fetch() {
    this.api.post('/api/mon-hoc/search', this.mhSearch).subscribe(res => {
      this.mhSearch = res;
      this.mhList = this.mhSearch.data;
    });
  }

  search() {
    this.mhSearch.page = 0;
    this.fetch();
  }

  delete(id: number) {
    this.api.delete('/api/mon-hoc/delete/' + id).subscribe(res => {
      this.toastr.success('Xóa thành công!');
      this.fetch();
    }, error => {
      this.toastr.error('Xóa thất bại!');
    });
  }

  onCreate() {
    this.ngbModal.open(SubjectCreateComponent, {size: 'lg'});
  }

  onEdit(sb) {
    this.ngbModal.open(SubjectEditComponent, {size: 'lg'}).componentInstance.sb = sb;
  }
}
