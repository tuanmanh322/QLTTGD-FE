import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {NotificationService} from '../../service/notification.service';

@Component({
  selector: 'app-main-client',
  templateUrl: './main-client.component.html',
  styleUrls: ['./main-client.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainClientComponent implements OnInit, OnDestroy {

  constructor(
    private notifiService: NotificationService
  ) { }

  ngOnInit(): void {
    this.notifiService.startListening();
  }

  ngOnDestroy(): void {
    this.notifiService.stopListenning();
  }
}
