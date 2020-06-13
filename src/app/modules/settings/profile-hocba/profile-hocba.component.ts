import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../shared/service/api.service';
import {LopHocModel} from '../../../shared/model/lop-hoc.model';
import {LopHocSearch} from '../../../shared/model/lop-hoc-search';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProfileHocbaDetailComponent} from '../profile-hocba-detail/profile-hocba-detail.component';

@Component({
  selector: 'app-profile-hocba',
  templateUrl: './profile-hocba.component.html',
  styleUrls: ['./profile-hocba.component.css']
})
export class ProfileHocbaComponent implements OnInit {

  lopHocModel: LopHocModel[];
  lopHocSearch: LopHocSearch = {
    orders: [],
    totalRecords: 0,
    page: 0,
    pageSize: 10
  };

  constructor(
    private apiService: ApiService,
    private ngbModal: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.getAllHocBa();
  }

  getAllHocBa() {
    this.apiService.post('/api/lop-hoc/get-hoc-ba-by-id-the', this.lopHocSearch).subscribe(res => {
      this.lopHocSearch = res;
      this.lopHocModel = this.lopHocSearch.data;
    });
  }

  goToDetail(hocBa) {
    const modaRef = this.ngbModal.open(ProfileHocbaDetailComponent,{size: 'lg'});
    modaRef.componentInstance.hocBa = hocBa;
  }
}
