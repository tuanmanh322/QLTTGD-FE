import {Component, Input, OnInit} from '@angular/core';
import {ShareBaseComponent} from '../share-base.component';

@Component({
  selector: 'app-facebook-share',
  templateUrl: './facebook-share.component.html',
  styleUrls: ['./facebook-share.component.css']
})
export class FacebookShareComponent extends ShareBaseComponent implements OnInit  {
  @Input() url = location.href;
  @Input() buttonColor = '';
  constructor() {
    super();
  }

  ngOnInit(): void {
    super.applyTippy();
  }

  share() {
    window.open('https://www.facebook.com/sharer/sharer.php?' + encodeURIComponent( this.url ),
      'facebook-share-dialog', 'width=626,height=436');
    return false;
  }
}
