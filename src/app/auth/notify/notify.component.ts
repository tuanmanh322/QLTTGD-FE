import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {
  @Input() notify: any;

  constructor(
    public activeModal: NgbActiveModal,
    private ngbModal: NgbModal
  ) {
  }


  ngOnInit(): void {
  }

  onCancle() {
    this.activeModal.dismiss();
    // this.ngbModal.open(LoginComponent, {size: 'lg'});
  }
}
