import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../shared/service/api.service';
import {LopHocModel} from '../../../shared/model/lop-hoc.model';
import {LopHocSearch} from '../../../shared/model/lop-hoc-search';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProfileHocbaDetailComponent} from '../profile-hocba-detail/profile-hocba-detail.component';
import {UserProfileModel} from '../../../shared/model/user-profile.model';
import {PointsModel} from '../../../shared/model/points-model';
import {PointsSearch} from '../../../shared/model/points-search';

@Component({
  selector: 'app-profile-hocba',
  templateUrl: './profile-hocba.component.html',
  styleUrls: ['./profile-hocba.component.css']
})
export class ProfileHocbaComponent implements OnInit {

  // lopHocModel: LopHocModel[];
  // lopHocSearch: LopHocSearch = {
  //   orders: [],
  //   totalRecords: 0,
  //   page: 0,
  //   pageSize: 10
  // };

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

  constructor(
    private apiService: ApiService,
    private ngbModal: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.getAllHocBa();
    this.apiService.get('/api/lop-hoc/all').subscribe(res => {
      this.lopHocList = res;
    });
  }

  getAllHocBa() {
    // this.apiService.post('/api/lop-hoc/get-hoc-ba-by-id-the', this.lopHocSearch).subscribe(res => {
    //   this.lopHocSearch = res;
    //   this.lopHocModel = this.lopHocSearch.data;
    // });
    this.apiService.post('/api/diem/search-profile-st', this.pointSearch).subscribe(data => {
      this.pointSearch = data;
      this.pointModel = this.pointSearch.data;
    });
  }

  goToDetail(hocBa: PointsModel) {
    const modaRef = this.ngbModal.open(ProfileHocbaDetailComponent, {size: 'lg'});
    modaRef.componentInstance.hocBa = hocBa;
  }
}
