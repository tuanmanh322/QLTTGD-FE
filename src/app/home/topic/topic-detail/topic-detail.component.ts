import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../shared/service/api.service';
import {Title} from '@angular/platform-browser';
import {Baiviet} from '../../../shared/model/baiviet';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent implements OnInit {
  baiViet: Baiviet;
  timeFormatter: number = 0;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private title: Title
  ) {
  }

  ngOnInit(): void {
    setInterval(() => this.timeFormatter = Math.random(), 60 * 1000);
    this.route.params.subscribe(routeParam => {
      const idBV = routeParam.id;
      this.apiService.get('/api/baiviet/detail-baiviet/' + idBV).subscribe(res => {
        this.baiViet = res;
        this.title.setTitle(this.baiViet.title);
      });
    });
  }
  showComment(){

  }
}
