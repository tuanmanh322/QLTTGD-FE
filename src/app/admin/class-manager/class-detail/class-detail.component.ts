import { ToastrService } from 'ngx-toastr';
import { LopHocModel } from './../../../shared/model/lop-hoc.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.css']
})
export class ClassDetailComponent implements OnInit {
  @Input() lophocPass: any;
  lopModel: LopHocModel;
  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.lopModel = this.lophocPass;
  }

  cancel(){
    this.activeModal.dismiss();
  }

}
