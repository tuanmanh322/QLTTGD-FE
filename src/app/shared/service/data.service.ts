import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class DataService {
  // $title = new EventEmitter();
  public _title = new Subject<any>();

  // cast = this._title.asObservable();
  data = '';
  constructor() {
    this._title.subscribe(data => {
      this.data = data;
      console.log(this.data);
    })
  }

  // sendData(title) {
  //   this.$title.emit(title);
  // }

  sendTitle(title){
    console.log(title);
    this._title.next(title);

  }

}
