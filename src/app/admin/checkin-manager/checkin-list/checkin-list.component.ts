import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../shared/service/api.service';
import {Title} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserCheckinModel} from '../../../shared/model/user-checkin.model';
import {ToastrService} from 'ngx-toastr';
import {FormControl} from '@angular/forms';
import {NhatKySearch} from '../../../shared/model/nhat-ky-search';
import {Order} from '../../../shared/model/order';
import {NhatKyModel} from '../../../shared/model/nhat-ky-model';
import {LopHocModel} from '../../../shared/model/lop-hoc.model';
import {LopEnti} from '../../../shared/model/lop-enti';

@Component({
  selector: 'app-checkin-list',
  templateUrl: './checkin-list.component.html',
  styleUrls: ['./checkin-list.component.css']
})
export class CheckinListComponent implements OnInit {
  maThe = '';
  userCheckIn: UserCheckinModel;
  lopCount = 0;
  checkCount = 0;
  mtForm = new FormControl();

  order: Order = {
    property: '',
    ascending: true
  };
  nhatKySearch: NhatKySearch = {
    page: 0,
    pageSize: 10,
    orders: [],
    totalPages: 0,
    totalRecords: 0,
    denNgay: null,
    tuNgay: null,
    tenLop: null,
    idRole: null
  };
  lopHoc: LopEnti[];
  nhatKyList: NhatKyModel[];
  lopFilter: LopHocModel[];
  tlForm = new FormControl();
  idLopForm = new FormControl();
  checkIn: boolean;
  roleF = new FormControl();
  constructor(
    private api: ApiService,
    private title: Title,
    private ngbModal: NgbModal,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    // this.api.get('/api/lop-hoc/all-unexpired').subscribe(data => {
    //   this.lopHoc = data;
    // });

    this.title.setTitle('Quản lý checkin');
    this.api.get('/api/lop-hoc/all').subscribe(res => {
      this.lopFilter = res;
    });
    this.loadAllCheckin();
  }

  getCheckIn() {
    if (this.mtForm.value !== '' && this.mtForm.value !== null && this.idLopForm.value !== null) {
      const checkin = {
        maThe: this.mtForm.value,
        idLop: this.idLopForm.value,
      };
      this.api.post('/api/user/users-checkin', checkin).subscribe(res => {
        if (res.code === 500){
          this.toastr.error(res.message);
          this.checkIn = false;
          return;
        } else{
          this.checkIn = true;
          this.userCheckIn = res.data;
          this.lopCount = this.userCheckIn.lopList.length;
          this.checkCount = this.userCheckIn.nhatcheckins.length;
          this.mtForm.setValue('');
          this.idLopForm.setValue('');
          this.toastr.success('Checkin thành công!');
          this.loadAllCheckin();
        }
      }, error => {
        this.toastr.error(error);
      });
    } else {
      this.toastr.error('Bạn cần nhập vào đầy đủ các trường!');
    }
  }

  fetchLop(event) {
    if (event.target.value !== null && event.target.value !== '') {
      this.api.get('/api/lop-hoc/lop-by-ma-the?maThe=' + event.target.value).subscribe(res => {
        this.lopHoc = res;
      });
    } else {
      this.lopHoc = [];
    }
  }

  loadAllCheckin() {
    this.api.post('/api/checkin/search-admin', this.nhatKySearch).subscribe(res => {
      this.nhatKySearch = res;
      this.nhatKyList = this.nhatKySearch.data;
    });
  }

  doSearch() {
    this.nhatKySearch.tenLop = this.tlForm.value;
    this.nhatKySearch.idRole = this.roleF.value;
    this.nhatKySearch.page = 0;
    this.loadAllCheckin();
    this.nhatKySearch.denNgay = null;
    this.nhatKySearch.tuNgay = null;
  }



  resetFilter() {
    this.nhatKySearch.denNgay = null;
    this.nhatKySearch.tuNgay = null;
    this.nhatKySearch.tenLop = '';
    this.nhatKySearch.idRole = null;
    this.loadAllCheckin();
  }
}
