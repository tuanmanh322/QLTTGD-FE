import {Component, OnInit} from '@angular/core';
import {GiaoVienModel} from '../../../shared/model/giao-vien.model';
import {GiaovienSearch} from '../../../shared/model/giaovien-search';
import {ApiService} from '../../../shared/service/api.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Title} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';
import {TeacherDetailComponent} from '../teacher-detail/teacher-detail.component';
import {TeacherEditComponent} from '../teacher-edit/teacher-edit.component';
import {TeacherCreateComponent} from '../teacher-create/teacher-create.component';
import {LopHocModel} from '../../../shared/model/lop-hoc.model';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {
  gvList: GiaoVienModel[];
  lopList: LopHocModel[];
  gvSearch: GiaovienSearch = {
    page: 0,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0,
    orders: [],
    username: '',
    tenLop: '',
    maGiaoVien: ''
  };
  tlop = new FormControl();
  kip1 = 'Kíp 1(7h - 9h)';
  kip2 = 'Kíp 2(9h30- 12h)';
  kip3 = 'Kíp 3(13h-15h)';
  kip4 = 'Kíp 4(15h-18h)';
  kip5 = 'Kíp 5(18h30-21h30)';

  constructor(
    private apiService: ApiService,
    private ngbModal: NgbModal,
    private title: Title,
    private toastr: ToastrService
  ) {
    this.apiService.onLoad().subscribe(() => {
      this.fetch();
    });
  }

  ngOnInit() {
    this.title.setTitle('Quản lý giáo viên');
    this.apiService.get('/api/lop-hoc/all').subscribe(res => {
      this.lopList = res;
    });
    this.doSearch();
  }

  fetch() {
    this.apiService.post('/api/giao-vien/search', this.gvSearch).subscribe(res => {
      this.gvSearch = res;
      this.gvList = this.gvSearch.data;
    });
  }

  doSearch() {
    this.gvSearch.tenLop = this.tlop.value;
    this.gvSearch.page = 0;
    this.fetch();
  }
  getValueOp(event) {
    this.gvSearch.maGiaoVien = event.target.value;
  }
  deleteTeac(id: number) {
    this.apiService.delete('/api/giao-vien/delete/' + id).subscribe(res => {
      this.toastr.success('Xoá thành công!');
      this.fetch();
    });
  }

  moveDetail(gv: GiaoVienModel) {
    const modalRef = this.ngbModal.open(TeacherDetailComponent, {size: 'lg'});
    modalRef.componentInstance.gv = gv;
  }

  moveEdit(gv: GiaoVienModel) {
    const modalRef = this.ngbModal.open(TeacherEditComponent, {size: 'lg'});
    modalRef.componentInstance.gv = gv;
  }

  moveCreate() {
    this.ngbModal.open(TeacherCreateComponent, {size: 'lg'});
  }
}
