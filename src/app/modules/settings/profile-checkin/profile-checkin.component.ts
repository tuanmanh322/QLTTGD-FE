import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../shared/service/api.service';
import {CheckinModel} from '../../../shared/model/checkin-model';
import {CheckinSearch} from '../../../shared/model/checkin-search';

@Component({
  selector: 'app-profile-checkin',
  templateUrl: './profile-checkin.component.html',
  styleUrls: ['./profile-checkin.component.css']
})
export class ProfileCheckinComponent implements OnInit {

  checkInModel: CheckinModel[];

  checkInSearch: CheckinSearch = {
    page: 0,
    pageSize: 10,
    orders: [],
    totalRecords: 0
  };


  constructor(
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.apiService.post('/api/checkin/search-profile', this.checkInSearch).subscribe(data => {
      this.checkInSearch = data;
      this.checkInModel = this.checkInSearch.data;
    });
  }
}
