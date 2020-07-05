import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserProfileModel} from '../../model/user-profile.model';
import {CURRENT_USER} from '../../model/qlttgd.constant';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {
  userprofile: UserProfileModel;
  constructor() { }

  ngOnInit(): void {
    this.userprofile = JSON.parse(localStorage.getItem(CURRENT_USER))
  }

}
