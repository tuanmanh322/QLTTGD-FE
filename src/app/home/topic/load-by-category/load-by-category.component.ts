import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../shared/service/api.service';
import {Title} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {Baiviet} from '../../../shared/model/baiviet';

@Component({
  selector: 'app-load-by-category',
  templateUrl: './load-by-category.component.html',
  styleUrls: ['./load-by-category.component.css']
})
export class LoadByCategoryComponent implements OnInit {
  baiViet: Baiviet[];
  date: any;
  timeFormatter = 0;
  time: any;
  message = '';
  isRenderDATA: boolean;

  constructor(
    private apiService: ApiService,
    private title: Title,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    setInterval(() => this.timeFormatter = Math.random(), 60 * 10000);
    this.route.params.subscribe(paramMap => {
      const idCD = paramMap.id;
      this.apiService.get('/api/baiviet/by-cd/' + idCD).subscribe(res => {
        if (res === ' ' || res === undefined || res === null) {
          this.isRenderDATA = false;
          this.message = 'Chủ đề này chưa có dữ liệu';
        } else {
          this.isRenderDATA = true;
          this.baiViet = res;
        }
      });
    });
  }

}
