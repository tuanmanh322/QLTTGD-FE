import {Component, OnInit} from '@angular/core';
import {ChuDeCount} from '../shared/model/chu-de-count';
import {ToastrService} from 'ngx-toastr';
import {ApiService} from '../shared/service/api.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  styleUrls: ['home.component.scss'],
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
  chuDeCount: ChuDeCount[];

  constructor(
    private toastr: ToastrService,
    private apiService: ApiService,
    private router: Router,
    private title: Title
  ) {

  }

  ngOnInit(): void {
    this.title.setTitle('Trang chủ');
    this.getTopic();

  }

  getTopic() {
    this.apiService.get('/api/chu-de/get-count').subscribe(res => {
      this.chuDeCount = res;
    });
  }
}
