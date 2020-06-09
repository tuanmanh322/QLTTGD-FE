import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../service/api.service';

@Component({
  selector: 'app-footer-client',
  templateUrl: './footer-client.component.html',
  styleUrls: ['./footer-client.component.css']
})
export class FooterClientComponent implements OnInit {
data = '';
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.$title.subscribe(data => {
      this.data = data;
      console.log(this.data);
    })
  }

}
