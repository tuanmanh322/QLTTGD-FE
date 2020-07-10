import {Injectable} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {ApiService} from './api.service';
import {ToastrService} from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  constructor(
    private rxStompService: RxStompService, private apiService: ApiService,
    private toarstr: ToastrService
  ) {

  }

  notification;

  startListening() {
    console.log(this.rxStompService.active);
    if (!this.rxStompService.active) {
      this.rxStompService.activate();
    }
    this.notification = this.rxStompService.watch('/user/queue/feed').subscribe((message) => {
      this.toarstr.success('Bạn có 1 thông báo mới');
      var img = <HTMLImageElement> document.getElementById('notification-icon');
      img.src = '../../../assets/img/no-notification.png';

      var mainDiv: HTMLDivElement = <HTMLDivElement> document.getElementById('container');
      // notification.classList.toggle("notification-off");

      var notificationContainer: HTMLDivElement = document.createElement('div');
      var cross: HTMLButtonElement = document.createElement('button');
      var notificationMessage: HTMLParagraphElement = document.createElement('p');
      mainDiv.appendChild(notificationContainer);
      notificationContainer.appendChild(cross);
      notificationContainer.appendChild(notificationMessage);
      notificationMessage.textContent = 'You have a new notification...';
      notificationContainer.classList.add('notification', 'is-link');
      cross.classList.add('delete');
      cross.onclick = function() {
        notificationContainer.remove();
      };

      setTimeout(() => {
        notificationContainer.remove();
      }, 10000);
    });
  }

  stopListenning() {
    this.notification.unsubscribe();
    this.rxStompService.deactivate();
  }

  getNofitication() {
    return this.apiService.get('/api/notification/all-detail');
  }

  isUnread(){
    return this.apiService.get('/api/notification/un-read');
  }

}
