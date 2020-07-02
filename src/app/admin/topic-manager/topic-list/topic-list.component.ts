import {Component, OnInit} from '@angular/core';
import {HangMucSearch} from '../../../shared/model/hang-muc-search';
import {FormControl} from '@angular/forms';
import {ApiService} from '../../../shared/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import {HangMucModel} from '../../../shared/model/hang-muc-model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TopicCreateComponent} from '../topic-create/topic-create.component';
import {TopicEditComponent} from '../topic-edit/topic-edit.component';
import {MonHocModel} from '../../../shared/model/mon-hoc.model';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {
  hmSearch: HangMucSearch = {
    pageSize: 10,
    page: 0,
    orders: [],
    totalRecords: 0,
    totalPages: 0,
    maHangmucbaiviet: '',
    tenhangmuc: '',
    tenMonHoc: ''
  };
  mh = new FormControl();
  hmList: HangMucModel[];

  monHoc: MonHocModel[];

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
    this.title.setTitle('Quản lý hạng mục');
    this.api.get('/api/mon-hoc/all').subscribe(res => {
      this.monHoc = res;
    });

    this.fetch();
  }

  fetch() {
    this.api.post('/api/hang-muc/search', this.hmSearch).subscribe(res => {
      this.hmSearch = res;
      this.hmList = this.hmSearch.data;
    });
  }

  doSearch() {
    this.hmSearch.tenMonHoc = this.mh.value;
    this.hmSearch.page = 0;
    this.fetch();
  }

  onCreate() {
    this.ngbModal.open(TopicCreateComponent, {size: 'lg'});
  }

  onEdit(top) {
    const modalRef = this.ngbModal.open(TopicEditComponent, {size: 'lg'});
    modalRef.componentInstance.top = top;
  }

  onDelete(id: number) {
    this.api.delete('/api/hang-muc/delete/' + id).subscribe(res => {
      this.toastr.success('Xóa thành công!');
      this.fetch();
    }, error => {
      this.toastr.error('Xóa thất bại!');
    });
  }

}
