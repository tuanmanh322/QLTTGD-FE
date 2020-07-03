import {Component, OnInit} from '@angular/core';
import {MonHocModel} from '../../../shared/model/mon-hoc.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../shared/service/api.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-subject-create',
  templateUrl: './subject-create.component.html',
  styleUrls: ['./subject-create.component.css']
})
export class SubjectCreateComponent implements OnInit {

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
    this.mhForm = this.fb.group({
      maMonhoc: new FormControl('', [Validators.required]),
      tenmonhoc: new FormControl('', [Validators.required])
    });
  }

  get f() {
    return this.mhForm.controls;
  }

  onEdit() {
    if (this.mhForm.valid && this.existTenMh === false && this.exitsMh === false) {
      this.api.post('/api/mon-hoc', this.mhForm.value).subscribe(res => {
        this.toastr.success('Thêm thành công!');
        this.api.onFilter('ADD môn học');
        this.activeModal.dismiss();
      }, error => {
        this.toastr.error('Thêm thất bại!');
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
