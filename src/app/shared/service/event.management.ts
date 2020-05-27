import {Injectable} from '@angular/core';
import {Observable, Observer, Subscription} from 'rxjs';
import {filter, map, share} from 'rxjs/operators';
import {EventModel} from '../model/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventManagement {
  observable: Observable<EventModel | string>;
  observer: Observer<EventModel | string>;

  constructor() {
    this.observable = new Observable((observer: Observer<EventModel | string>) => {
      this.observer = observer;
    }).pipe(share());
  }

  /**
   * Method to broadcast the event to observer
   */
  broadcast(event: EventModel | string): void {
    if (this.observer) {
      this.observer.next(event);
    }
  }

  /**
   * Method to subscribe to an event with callback
   */
  subscribe(eventName: string, callback: any): Subscription {
    const subscriber: Subscription = this.observable
      .pipe(
        filter((event: EventModel | string) => {
          if (typeof event === 'string') {
            return event === eventName;
          }
          return event.name === eventName;
        }),
        map((event: EventModel | string) => {
          if (typeof event !== 'string') {
            // when releasing generator-jhipster v7 then current return will be changed to
            // (to avoid redundant code response.content in JhiEventManager.subscribe callbacks):
            // return event.content;
            return event;
          }
        })
      )
      .subscribe(callback);
    return subscriber;
  }

  /**
   * Method to unsubscribe the subscription
   */
  destroy(subscriber: Subscription): void {
    subscriber.unsubscribe();
  }
}
