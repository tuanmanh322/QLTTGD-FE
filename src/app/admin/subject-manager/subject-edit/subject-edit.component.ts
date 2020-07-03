import {Component, Input, OnInit} from '@angular/core';
import {MonHocModel} from '../../../shared/model/mon-hoc.model';
import {ApiService} from '../../../shared/service/api.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.css']
})
export class SubjectEditComponent implements OnInit {
  @Input() sb: any;

  mh: MonHocModel;

  mhForm: FormGroup;
  exitsMh: boolean;
  existTenMh: boolean;
  constructor(
    private api: ApiService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.mh = this.sb;
    this.mhForm = this.fb.group({
      maMonhoc: new FormControl(this.mh.maMonHoc, [Validators.required]),
      tenMonHoc: new FormControl(this.mh.tenMonHoc, [Validators.required])
    });
  }

  get f() {
    return this.mhForm.controls;
  }

  onEdit() {
    if (this.mhForm.valid) {
      const mhF = {
        id: this.mh.id,
        maMonhoc: this.mhForm.get('maMonhoc').value,
        tenmonhoc: this.mhForm.get('tenMonHoc').value,
      };

      this.api.put('/api/mon-hoc', mhF).subscribe(res => {
        this.toastr.success('Cập nhật thành công!');
        this.api.onFilter('Edit môn học');
        this.activeModal.dismiss();
      }, error => {
        this.toastr.error('Cập nhật thất bại!');
      });
    }
  }

  cancel() {
    this.activeModal.dismiss();
  }

  checkExistMa(event) {
    const maMh = event.target.value;
    this.api.get('/api/mon-hoc/check-mamh?maMH=' + maMh).subscribe(res => {
      this.exitsMh = res;
    });
  }

  checkExistTen(event) {
    const tenmh = event.target.value;
    this.api.get('/api/mon-hoc/check-tenmh?tenMH=' + tenmh).subscribe(res => {
      this.existTenMh = res;
    });
  }
}
