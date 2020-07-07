import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChuDeCount} from '../shared/model/chu-de-count';
import {ToastrService} from 'ngx-toastr';
import {ApiService} from '../shared/service/api.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {DataService} from '../shared/service/data.service';
import {ChuDeService} from '../shared/service/chu-de.service';
import {NotificationService} from '../shared/service/notification.service';
import {SubMenu} from '../shared/model/sub-menu';


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
  titleTopic = '';
  subMenu: SubMenu[];

  countAllBv = 0;

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
    // this.getTopic();
    this.getSubMenu();
    // this.chuDeSerivce.getChuDeStates().subscribe(() => {
    //   this.getTopic();
    // });
    setTimeout(() => {
      this.getAllVL.nativeElement.click();
    }, 200);
    // this.chuDeCount.map(cd => {
    //   this.totalCount = this.totalCount + cd.baiVietCount;
    // });
    // this.apiService.get('/api/baiviet/count-all-bv').subscribe(res => {
    //   this.countAllBv = res;
    // });
  }

  ngOnDestroy(): void {
    this.notificationService.stopListenning();
  }

  toggleDate(i: any) {
    let elem = document.getElementById('#hm' + i);
    switch (elem.classList.length) {
      case 2:
        elem.classList.add('show');
        break;
      case 3:
        elem.classList.remove('show');
        break;
    }
  }

  getSubMenu() {
    this.apiService.get('/api/hang-muc/hm-cd').subscribe(res => {
      this.subMenu = res;
      this.subMenu.map(value => value.chudes.map(cd => {
        this.totalCount = cd.baiVietCount + this.totalCount;
      }));
    });
  }

  getTopic() {
    this.apiService.get('/api/chu-de/get-count').subscribe(res => {
      this.chuDeCount = res;
      this.chuDeCount.map(cd => {
        this.totalCount = this.totalCount + cd.baiVietCount;
      });
    });
  }

  onSend() {
    this.apiService.sendTitle(this.titleTopic);
  }
}
