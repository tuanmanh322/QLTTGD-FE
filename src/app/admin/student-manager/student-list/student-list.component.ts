import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Order} from '../../../shared/model/order';
import {HocSinhSearch} from '../../../shared/model/hoc-sinh-search';
import {ApiService} from 'src/app/shared/service/api.service';
import {HocSinhModel} from './../../../shared/model/hoc-sinh-model';
import {StudentCreateComponent} from '../student-create/student-create.component';
import {StudentEditComponent} from '../student-edit/student-edit.component';
import {Title} from '@angular/platform-browser';
import {LopHocModel} from '../../../shared/model/lop-hoc.model';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  lopList: LopHocModel[];

  order: Order = {
    ascending: true,
    property: ''
  };
  hocSinhSearch: HocSinhSearch = {
    page: 0,
    pageSize: 10,
    tenLop: '',
    hocsinhName: '',
    totalPages: 0,
    totalRecords: 0,
    orders: [],
    maHocSinh: ''
  };
  hocSinhList: HocSinhModel[];
  selectedList: number[];
  pageOfItems: Array<any>;
  tlop = new FormControl();
  constructor(
    private apiService: ApiService,
    private toast: ToastrService,
    private router: Router,
    private modalService: NgbModal,
    private title: Title
  ) {
    this.apiService.onLoad().subscribe((m: any) => {
      console.log(m);
      this.getAll();
    });
  }

  ngOnInit() {
    this.title.setTitle('Quản lý học sinh');
    this.apiService.get('/api/lop-hoc/all').subscribe(res => {
      this.lopList = res;
    });
    this.search();
  }

  search() {
    this.hocSinhSearch.tenLop = this.tlop.value;
    this.hocSinhSearch.page = 0;
    this.getAll();
  }

  getAll() {
    this.apiService.post('/api/hoc-sinh/search', this.hocSinhSearch).subscribe(res => {
      this.hocSinhSearch = res;
      this.hocSinhList = this.hocSinhSearch.data;
    });
  }

  sort(option) {
    this.order.ascending = this.order.property === option ? !this.order.ascending : true;
    this.order.property = option;
    this.hocSinhSearch.orders = [this.order];
    this.selectedList = [];
    this.getAll();
  }

  onChangePage(pageOfItems: Array<any>) {
    this.hocSinhSearch.page += 1;
    this.hocSinhList = pageOfItems;
  }

  moveCreate() {
    this.modalService.open(StudentCreateComponent);
  }

  deleteLop(id: number) {
    this.apiService.delete('/api/hoc-sinh/delete/' + id).subscribe(res => {
      this.toast.success('xoá thành công lớp có id là :' + id);
      this.getAll();
    }, error => {
      this.toast.error('xóa thất bại');
    });
  }

  moveEdit(hocsinh) {
    const modalRef = this.modalService.open(StudentEditComponent);
    modalRef.componentInstance.hocsinh = hocsinh;
  }

}
