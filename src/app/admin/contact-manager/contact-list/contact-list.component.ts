import {Component, OnInit} from '@angular/core';
import {ContactSearch} from '../../../shared/model/contact-search';
import {ContactModel} from '../../../shared/model/contact-model';
import {ApiService} from '../../../shared/service/api.service';
import {Title} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contactSearch: ContactSearch = {
    page: 0,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0,
    orders: [],
    email: '',
    sdt: '',
    username: ''
  };
  contactMd: ContactModel[];

  constructor(
    private api: ApiService,
    private title: Title,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.title.setTitle('Quản lý liên hệ');
    this.fetch();
  }

  fetch() {
    this.api.post('/api/contact/search', this.contactSearch).subscribe(res => {
      this.contactSearch = res;
      this.contactMd = this.contactSearch.data;
    });
  }

  doSearch() {
    this.contactSearch.page = 0;
    this.fetch();
  }

  delete(id: number) {
    this.api.delete('/api/contact/delete/' + id).subscribe(res => {
      this.toastr.success('Xóa thành công!');
      this.fetch();
    }, error => {
      this.toastr.error('Xóa thất bại!');
    });
  }
}
