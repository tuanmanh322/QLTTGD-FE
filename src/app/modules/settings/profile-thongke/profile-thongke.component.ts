import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../shared/service/api.service';
import {BaiVietTotal} from '../../../shared/model/bai-viet-total';
import {BaivietSearchTotal} from '../../../shared/model/baiviet-search-total';

@Component({
  selector: 'app-profile-thongke',
  templateUrl: './profile-thongke.component.html',
  styleUrls: ['./profile-thongke.component.css']
})
export class ProfileThongkeComponent implements OnInit {
  baiVietModel: BaiVietTotal[];

  baiVietSearch: BaivietSearchTotal = {
    pageSize: 10,
    page: 0,
    orders: [],
    totalRecords: 0,
    startDate: null,
    endDate: null
  };


  constructor(
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.apiService.post('/api/baiviet/search-tuong-tac', this.baiVietSearch).subscribe(data => {
      this.baiVietSearch = data;
      this.baiVietModel = this.baiVietSearch.data;
    });
  }

  search() {
    this.baiVietSearch.page = 0;
    this.getAll();
  }

}
