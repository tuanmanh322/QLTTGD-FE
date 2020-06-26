import {Component, OnInit} from '@angular/core';
import {UserListModel} from '../../../shared/model/user-list.model';
import {UserSearch} from '../../../shared/model/user-search';
import {ApiService} from '../../../shared/service/api.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Title} from '@angular/platform-browser';
import {FormControl} from '@angular/forms';
import {UserCreateComponent} from '../user-create/user-create.component';
import {UserEditComponent} from '../user-edit/user-edit.component';
import {ToastrService} from 'ngx-toastr';
import {Order} from '../../../shared/model/order';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  order: Order = {
    ascending: true,
    property: ''
  };
  userSearch: UserSearch = {
    pageSize: 10,
    page: 0,
    totalRecords: 0,
    totalPages: 0,
    orders: [],
    idRole: '',
    userName: ''
  };
  isACT = new FormControl();
  userList: UserListModel[];
  idRo = new FormControl();

  constructor(
    private api: ApiService,
    private ngbModal: NgbModal,
    private title: Title,
    private toastr: ToastrService
  ) {
    this.api.onLoad().subscribe(() => {
      this.fetch();
    });
  }

  ngOnInit(): void {
    this.title.setTitle('Quản lý user');
    this.search();

  }

  search() {
    this.userSearch.idRole = this.idRo.value;
    this.userSearch.active = this.isACT.value;
    this.userSearch.page = 0;
    this.fetch();
  }

  fetch() {
    this.api.post('/api/user/search-user', this.userSearch).subscribe(res => {
      this.userSearch = res;
      this.userList = this.userSearch.data;
    });
  }

  doLockUser(idUser: number) {
    this.api.get('/api/user/lock-user/' + idUser).subscribe(res => {
      this.toastr.success('Đã khóa user :' + idUser);
      this.fetch();
    });
  }

  doUnLockUser(idUser: number) {
    this.api.get('/api/user/unlock-user/' + idUser).subscribe(res => {
      this.toastr.success('Đã mở khóa user :' + idUser);
      this.fetch();
    });
  }

  moveEdit(user) {
    const modal = this.ngbModal.open(UserEditComponent, {size: 'lg'});
    modal.componentInstance.user = user;
  }

  moveCreate() {
    this.ngbModal.open(UserCreateComponent, {size: 'lg'});
  }
}
