import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../shared/service/api.service';
import {Title} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-load-by-category',
  templateUrl: './load-by-category.component.html',
  styleUrls: ['./load-by-category.component.css']
})
export class LoadByCategoryComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private title: Title,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
