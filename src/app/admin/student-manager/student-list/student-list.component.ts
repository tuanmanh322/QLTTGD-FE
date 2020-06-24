
import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Order} from '../../../shared/model/order';
import {HocSinhSearch} from '../../../shared/model/hoc-sinh-search';
import { ApiService } from 'src/app/shared/service/api.service';
import { HocSinhModel } from './../../../shared/model/hoc-sinh-model';
import { StudentCreateComponent } from '../student-create/student-create.component';
import { StudentEditComponent } from '../student-edit/student-edit.component';
import {Title} from '@angular/platform-browser';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  order: Order = {
    ascending: true,
    property: ''
  };
   hocSinhSearch: HocSinhSearch = {
    page: 0,
    pageSize: 10,
    tenLop: '',
    tenHS: '',
    totalPages: 0,
    totalRecords: 0,
    orders: [],
    ngaySinh: null,
    gioiTinh: ''
  };
  hocSinhList: HocSinhModel[];
  selectedList: number[];
  pageOfItems: Array<any>;
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
    this.getAll();
  }
  search() {
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
  moveEdit(lophoc: any) {
    const modalRef = this.modalService.open(StudentEditComponent);
    modalRef.componentInstance.lophoc = lophoc;
  }

}
