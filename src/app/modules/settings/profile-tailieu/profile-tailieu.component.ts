import {Component, OnInit} from '@angular/core';
import {TaiLieu} from '../../../shared/model/tai-lieu';
import {TaiLieuSearch} from '../../../shared/model/tai-lieu-search';
import {ApiService} from '../../../shared/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProfileTailieuEditComponent} from '../profile-tailieu-edit/profile-tailieu-edit.component';
import {ProfileTailieuAddComponent} from '../profile-tailieu-add/profile-tailieu-add.component';

@Component({
  selector: 'app-profile-tailieu',
  templateUrl: './profile-tailieu.component.html',
  styleUrls: ['./profile-tailieu.component.css']
})
export class ProfileTailieuComponent implements OnInit {
  taiLieuModel: TaiLieu[];

  taiLieuSearch: TaiLieuSearch = {
    page: 0,
    pageSize: 10,
    title: '',
    startDate: null,
    endDate: null,
    totalRecords: 0,
    orders: []
  };

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private ngbModal: NgbModal
  ) {
    this.apiService.onLoad().subscribe(() => {
      this.getAll();
    });
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.apiService.post('/api/document/search', this.taiLieuSearch).subscribe(data => {
      this.taiLieuSearch = data;
      this.taiLieuModel = this.taiLieuSearch.data;
    });
  }

  doSearch() {
    this.taiLieuSearch.page = 0;
    this.getAll();
  }

  delete(idDc: number) {
    this.apiService.delete('/api/document/delete/' + idDc).subscribe(res => {
      this.toastr.success('Xóa thành công tài liệu!');
      this.getAll();
    }, error => {
      this.toastr.error('Xóa thất bại!');
    });
  }

  doEdit(document) {
    const modalRef = this.ngbModal.open(ProfileTailieuEditComponent, {size: 'lg'});
    modalRef.componentInstance.document = document;
  }

  doCreate() {
    this.ngbModal.open(ProfileTailieuAddComponent, {size: 'lg'});
  }
}
