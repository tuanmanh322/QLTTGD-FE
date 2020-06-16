import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../shared/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PointsModel} from '../../../shared/model/points-model';
import {PointsSearch} from '../../../shared/model/points-search';
import {ProfilePointsAddComponent} from '../profile-points-add/profile-points-add.component';
import {LopHocModel} from '../../../shared/model/lop-hoc.model';
import {ProfilePointsEditComponent} from '../profile-points-edit/profile-points-edit.component';

@Component({
  selector: 'app-profile-points',
  templateUrl: './profile-points.component.html',
  styleUrls: ['./profile-points.component.css']
})
export class ProfilePointsComponent implements OnInit {

  pointModel: PointsModel[];
  pointSearch: PointsSearch = {
    page: 0,
    pageSize: 10,
    orders: [],
    kipDay: '',
    tenLop: '',
    totalRecords: 0
  };
  lopHocList: LopHocModel[];
  kip1 = 'Kíp 1(7h - 9h)';
  kip2 = 'Kíp 2(9h30- 12h)';
  kip3 = 'Kíp 3(13h-15h)';
  kip4 = 'Kíp 4(15h-18h)';
  kip5 = 'Kíp 5(18h30-21h30)';

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
    this.apiService.get('/api/lop-hoc/all').subscribe(res => {
      this.lopHocList = res;
    });
  }

  doSearch() {
    this.pointSearch.page = 0;
    this.getAll();
  }

  getAll() {
    this.apiService.post('/api/diem/search-profile', this.pointSearch).subscribe(data => {
      this.pointSearch = data;
      this.pointModel = this.pointSearch.data;
    });
  }

  openAddPoints() {
    this.ngbModal.open(ProfilePointsAddComponent, {size: 'lg'});
  }

  importExcelFile() {

  }

  exportToExcelFile() {
    this.apiService.get('/api/diem/download/points.xlsx').subscribe(res => {
      this.toastr.success('File đã được tải xuống!');
    }, error => {
      this.toastr.error('Lỗi tải file!');
    });
  }

  editPoints(points) {
    const modalRef = this.ngbModal.open(ProfilePointsEditComponent, {size: 'lg'});
    modalRef.componentInstance.points = points;
  }

  delete(id: number) {
    this.apiService.delete('/api/diem/delete/' + id).subscribe(res => {
      this.toastr.success('Xóa thành công!');
      this.getAll();
    }, error => {
      this.toastr.error('Xóa thất bại!');
    });
  }
}
