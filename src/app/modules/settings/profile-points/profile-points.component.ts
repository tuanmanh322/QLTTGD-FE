import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../shared/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PointsModel} from '../../../shared/model/points-model';
import {PointsSearch} from '../../../shared/model/points-search';
import {ProfilePointsAddComponent} from '../profile-points-add/profile-points-add.component';
import {LopHocModel} from '../../../shared/model/lop-hoc.model';
import {ProfilePointsEditComponent} from '../profile-points-edit/profile-points-edit.component';
import {UserProfileModel} from '../../../shared/model/user-profile.model';
import {CURRENT_USER} from '../../../shared/model/qlttgd.constant';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-profile-points',
  templateUrl: './profile-points.component.html',
  styleUrls: ['./profile-points.component.css']
})
export class ProfilePointsComponent implements OnInit {
  userProfile: UserProfileModel;
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
  downloadLink = '';
  isSelectFile: boolean;
  file: File;

  uploadForm: FormGroup = new FormGroup({
    fileUp: new FormControl(''),
    idUser: new FormControl('')
  });
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
    this.userProfile = JSON.parse(localStorage.getItem(CURRENT_USER));
    this.downloadLink = 'http://localhost:1234/api/diem/download/points.xlsx?d=' + this.userProfile.id;
    this.getAll();
    this.apiService.get('/api/lop-hoc/all').subscribe(res => {
      this.lopHocList = res;
    });
    // this.uploadForm.get('idUser').setValue(this.userProfile.id);

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
    if (this.isSelectFile === true) {
      const formData = new FormData();
      formData.append('excelFile', this.uploadForm.get('fileUp').value);
      this.apiService.post('/api/media/file-excel/'+ this.userProfile.idUser, formData).subscribe(res => {
        this.toastr.success('Tải lên thành công!');
        setTimeout(() => {
          this.getAll();
        }, 5000);
      }, error => {
        this.toastr.error('Tải lên thất bại!');
      });
    }
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

  uploadFile(event) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      const fileSize = parseInt(file.size) / 1024;
      if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        if (fileSize < 10240) {
          this.isSelectFile = true;
          this.uploadForm.get('fileUp').setValue(file);
        } else {
          this.toastr.error('Kích thước file quá lớn, bạn chỉ được chọn file có kích thước dưới 10MB');
        }
      } else {
        this.isSelectFile = false;
        this.toastr.error('Định dạng file không đúng');
      }
    }
  }
}
