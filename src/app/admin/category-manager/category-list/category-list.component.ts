import {Component, OnInit} from '@angular/core';
import {ApiService} from 'src/app/shared/service/api.service';
import {HangMucSearch} from '../../../shared/model/hang-muc-search';
import {FormControl} from '@angular/forms';
import {HangMucModel} from '../../../shared/model/hang-muc-model';
import {MonHocModel} from '../../../shared/model/mon-hoc.model';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TopicCreateComponent} from '../../topic-manager/topic-create/topic-create.component';
import {TopicEditComponent} from '../../topic-manager/topic-edit/topic-edit.component';
import {ChuDeSearch} from '../../../shared/model/chu-de-search';
import {ChudeModel} from '../../../shared/model/chude-model';
import {CategoryCreateComponent} from '../category-create/category-create.component';
import {CategoryEditComponent} from '../category-edit/category-edit.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  cdSearch: ChuDeSearch = {
    pageSize: 10,
    page: 0,
    orders: [],
    totalRecords: 0,
    totalPages: 0,
    tenchude: '',
    tenHangmuc: ''
  };
  hm = new FormControl();
  hmList: HangMucModel[];

  chudeList: ChudeModel[];
  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private title: Title,
    private ngbModal: NgbModal
  ) {
    this.api.onLoad().subscribe(() => {
      this.fetch();
    });
  }

  ngOnInit() {
    this.title.setTitle('Quản lý chủ đề');
    this.api.get('/api/hang-muc/all').subscribe(res => {
      this.hmList = res;
    });

    this.fetch();
  }

  fetch() {
    this.api.post('/api/chu-de/search', this.cdSearch).subscribe(res => {
      this.cdSearch = res;
      this.chudeList = this.cdSearch.data;
    });
  }

  doSearch() {
    this.cdSearch.tenHangmuc = this.hm.value;
    this.cdSearch.page = 0;
    this.fetch();
  }

  onCreate() {
    this.ngbModal.open(CategoryCreateComponent, {size: 'lg'});
  }

  onEdit(cd) {
    const modalRef = this.ngbModal.open(CategoryEditComponent, {size: 'lg'});
    modalRef.componentInstance.cd = cd;
  }

  onDelete(id: number) {
    this.api.delete('/api/chu-de/delete/' + id).subscribe(res => {
      this.toastr.success('Xóa thành công!');
      this.fetch();
    }, error => {
      this.toastr.error('Xóa thất bại!');
    });
  }

}
