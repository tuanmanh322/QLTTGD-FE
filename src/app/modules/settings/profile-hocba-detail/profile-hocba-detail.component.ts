import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HocBa} from '../../../shared/model/hoc-ba';

@Component({
  selector: 'app-profile-hocba-detail',
  templateUrl: './profile-hocba-detail.component.html',
  styleUrls: ['./profile-hocba-detail.component.css']
})
export class ProfileHocbaDetailComponent implements OnInit {
  @Input() hocBa: any;

  hocBaModel: HocBa;
  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.hocBaModel = this.hocBa;
  }

  cancel(){
    this.activeModal.dismiss();
  }

}
