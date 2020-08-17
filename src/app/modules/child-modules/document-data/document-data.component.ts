import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../shared/service/api.service';
import {TaiLieu} from '../../../shared/model/tai-lieu';
import {TaiLieuSearch} from '../../../shared/model/tai-lieu-search';

@Component({
  selector: 'app-document-data',
  templateUrl: './document-data.component.html',
  styleUrls: ['./document-data.component.css']
})
export class DocumentDataComponent implements OnInit {
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

  ) { }

  ngOnInit(): void {
    this.doSearch();
  }

  getAll() {
    this.apiService.post('/api/document/search-all', this.taiLieuSearch).subscribe(data => {
      this.taiLieuSearch = data;
      this.taiLieuModel = this.taiLieuSearch.data;
    });
  }

  doSearch() {
    this.taiLieuSearch.page = 0;
    this.getAll();
  }
}
