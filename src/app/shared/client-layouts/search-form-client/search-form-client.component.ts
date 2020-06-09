import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../service/data.service';

@Component({
  selector: 'app-search-form-client',
  templateUrl: './search-form-client.component.html',
  styleUrls: ['./search-form-client.component.css']
})
export class SearchFormClientComponent implements OnInit {
  title = '';

  constructor(
    private dataService: DataService
  ) {
  }

  ngOnInit(): void {
  }


}
