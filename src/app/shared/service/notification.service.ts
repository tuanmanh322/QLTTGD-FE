import {Injectable} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {ApiService} from './api.service';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  constructor(
    private rxStompService: RxStompService, private apiService: ApiService
  ) {

  }

  notification;

  startListening() {
    console.log(this.rxStompService.active);
    if (!this.rxStompService.active) {
      this.rxStompService.activate();
    }
    this.notification = this.rxStompService.watch('/user/api/feed').subscribe((message) => {
      var img = <HTMLImageElement> document.getElementById('notification-icon');
      img.src = 'assets\\notification.png';

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
    return this.apiService.get('/api/notification/all');
  }

  isUnread(){
    return this.apiService.get('/api/notification/un-read');
  }

}
