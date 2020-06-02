import {Component, OnInit} from '@angular/core';
import {Baiviet} from '../../../shared/model/baiviet';
import {ApiService} from '../../../shared/service/api.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-load-all-topic',
  templateUrl: './load-all-topic.component.html',
  styleUrls: ['./load-all-topic.component.css']
})
export class LoadAllTopicComponent implements OnInit {
  baiViet: Baiviet[];
  date: any;
  timeFormatter: number = 0;
  time: any;
  constructor(
    private apiService: ApiService,
    private title: Title
  ) {
  }

  ngOnInit(): void {
    this.title.setTitle('Trang chủ');
    setInterval(() => this.timeFormatter = Math.random(), 60 * 1000);
    this.getAllTopic();
    this.time = new Date().getTime();
    console.log(this.time);
  }

  getAllTopic() {
    this.apiService.get('/api/baiviet/all-total').subscribe(res => {
      this.baiViet = res;
    });
  }

}
