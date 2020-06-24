import { ChuDeModel } from './../../../shared/model/chu-de-model';
import { ChuDeSearch } from './../../../shared/model/chu-de-search';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/service/api.service';
import { Order } from 'src/app/shared/model/order';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoryCreateComponent } from '../category-create/category-create.component';
import { CategoryEditComponent } from '../category-edit/category-edit.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  order: Order = {
    ascending: true,
    property: ''
  };
  chuDeSearch: ChuDeSearch = {
    page: 0,
    pageSize: 10,
    NoiDung: '',
    totalPages: 0,
    totalRecords: 0,
    orders: []

  };
  chuDeList: ChuDeModel[];
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
   search() {
    this.chuDeSearch.page = 0;
    this.getAll();
  }
  getAll() {
    this.apiService.post('/api/chu-de/search', this.chuDeSearch).subscribe(res => {
      this.chuDeSearch = res;
      this.chuDeList = this.chuDeSearch.data;
    });
  }
  ngOnInit() {
    this.title.setTitle('Quản lý chủ đề');
    this.search();
  }
  sort(option) {
    this.order.ascending = this.order.property === option ? !this.order.ascending : true;
    this.order.property = option;
    this.chuDeSearch.orders = [this.order];
    this.selectedList = [];
    this.getAll();
  }
  moveCreate() {
    this.modalService.open(CategoryCreateComponent);
  }
  moveEdit(lophoc: any) {
    const modalRef = this.modalService.open(CategoryEditComponent);
    modalRef.componentInstance.lophoc = lophoc;
  }
  onChangePage(pageOfItems: Array<any>) {
    this.chuDeSearch.page += 1;
    this.chuDeList = pageOfItems;
  }
  deleteChuDe(id: number) {
    this.apiService.delete('/api/chu-de/delete/' + id).subscribe(res => {
      this.toast.success('xoá thành công chủ đề có id là :' + id);
      this.getAll();
    }, error => {
      this.toast.error('xóa thất bại');
    });
  }
}
