import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../shared/service/api.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-hoi-dap',
  templateUrl: 'hoi-dap.component.html',
  styleUrls: ['hoi-dap.component.scss']
})
export class HoiDapComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private title: Title
  ) {

  }

  ngOnInit(): void {
  }

}
