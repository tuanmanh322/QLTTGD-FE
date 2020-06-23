import {ClassDetailComponent} from './../class-detail/class-detail.component';
import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ClassCreateComponent} from '../class-create/class-create.component';
import {ClassEditComponent} from '../class-edit/class-edit.component';
import {Order} from '../../../shared/model/order';
import {LopHocSearch} from '../../../shared/model/lop-hoc-search';
import {LopHocModel} from '../../../shared/model/lop-hoc.model';
import {ApiService} from '../../../shared/service/api.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {
  order: Order = {
    ascending: true,
    property: ''
  };
  lopHocSearch: LopHocSearch = {
    page: 0,
    pageSize: 10,
    tenLop: '',
    totalPages: 0,
    totalRecords: 0,
    orders: [],
    endDate: null,
    startDate: null
  };
  lopHocList: LopHocModel[];
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
    this.title.setTitle('Quản lý lớp học');
    this.search();
  }

  search() {
    this.lopHocSearch.page = 0;
    this.getAll();
  }

  getAll() {
    this.apiService.post('/api/lop-hoc/search', this.lopHocSearch).subscribe(res => {
      this.lopHocSearch = res;
      this.lopHocList = this.lopHocSearch.data;
    });
  }

  sort(option) {
    this.order.ascending = this.order.property === option ? !this.order.ascending : true;
    this.order.property = option;
    this.lopHocSearch.orders = [this.order];
    this.selectedList = [];
    this.getAll();
  }


  moveCreate() {
    this.modalService.open(ClassCreateComponent);
  }

  deleteLop(id: number) {
    this.apiService.delete('/api/lop-hoc/delete/' + id).subscribe(res => {
      this.toast.success('xoá thành công lớp có id là :' + id);
      this.getAll();
    }, error => {
      this.toast.error('xóa thất bại');
    });
  }

  moveEdit(lophoc: any) {
    const modalRef = this.modalService.open(ClassEditComponent);
    modalRef.componentInstance.lophoc = lophoc;
  }

  moveDetail(lophoc: any) {
    const modalRef = this.modalService.open(ClassDetailComponent);
    modalRef.componentInstance.lophocPass = lophoc;
  }

  onChangePage(pageOfItems: Array<any>) {
    this.lopHocSearch.page += 1;
    this.lopHocList = pageOfItems;
  }
}
