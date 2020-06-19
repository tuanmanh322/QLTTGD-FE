import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChuDeCount} from '../shared/model/chu-de-count';
import {ToastrService} from 'ngx-toastr';
import {ApiService} from '../shared/service/api.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {DataService} from '../shared/service/data.service';
import {ChuDeService} from '../shared/service/chu-de.service';
import {NotificationService} from '../shared/service/notification.service';


@Component({
  selector: 'app-home',
  styleUrls: ['home.component.scss'],
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('getAllVL') getAllVL: ElementRef<HTMLElement>;
  chuDeCount: ChuDeCount[];
  totalCount: number = 0;
  data = '';

  constructor(
    private toastr: ToastrService,
    private apiService: ApiService,
    private router: Router,
    private title: Title,
    private chuDeSerivce: ChuDeService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.notificationService.startListening();
    this.title.setTitle('Trang chủ');
    this.getTopic();

    // this.chuDeSerivce.getChuDeStates().subscribe(() => {
    //   this.getTopic();
    // });
    setTimeout(() => {
      this.getAllVL.nativeElement.click();
    }, 200);
    // this.chuDeCount.map(cd => {
    //   this.totalCount = this.totalCount + cd.baiVietCount;
    // });
  }

  ngOnDestroy(): void {
    this.notificationService.stopListenning();
  }

  getTopic() {
    this.apiService.get('/api/chu-de/get-count').subscribe(res => {
      this.chuDeCount = res;
      this.chuDeCount.map(cd => {
        this.totalCount = this.totalCount + cd.baiVietCount;
      });
    });
  }
}
