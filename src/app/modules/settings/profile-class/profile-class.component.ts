import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../shared/service/api.service';
import {Title} from '@angular/platform-browser';
import {LopHocSearch} from '../../../shared/model/lop-hoc-search';
import {LopHocModel} from '../../../shared/model/lop-hoc.model';

@Component({
  selector: 'app-profile-class',
  templateUrl: './profile-class.component.html',
  styleUrls: ['./profile-class.component.css']
})
export class ProfileClassComponent implements OnInit {
  lopHocModel: LopHocModel[];
  lopHocSearch: LopHocSearch = {
    page: 0,
    pageSize: 10,
    orders: [],
    totalRecords: 0
  };

  constructor(
    private apiService: ApiService,
    private title: Title
  ) {
  }

  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this.apiService.post('/api/lop-hoc/get-lop-hoc-by-id-the', this.lopHocSearch).subscribe(res => {
      this.lopHocSearch = res;
      this.lopHocModel = this.lopHocSearch.data;
    });
  }
}
