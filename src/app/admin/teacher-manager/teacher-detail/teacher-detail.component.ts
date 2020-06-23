import {Component, Input, OnInit} from '@angular/core';
import {GiaoVienModel} from '../../../shared/model/giao-vien.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.css']
})
export class TeacherDetailComponent implements OnInit {
  @Input() gv: any;

  giaoVien: GiaoVienModel;

  constructor(
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {
    this.giaoVien = this.gv;
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
