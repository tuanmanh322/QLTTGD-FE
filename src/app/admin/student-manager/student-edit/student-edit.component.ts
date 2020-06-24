import { HocSinhModel } from './../../../shared/model/hoc-sinh-model';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/service/api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  @Input() hocsinh: any;
  hocSinhForm: FormGroup;
  hocSinhModel: HocSinhModel;
  tenMonHoc: string;
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toarst: ToastrService
  ) { }

  ngOnInit() {
    this.hocSinhModel = this.hocsinh;
    this.hocSinhForm = this.fb.group({
      maHocSinh: new FormControl({value: this.hocSinhModel.id, disable:true}),
      tenhocsinh: new FormControl(this.hocSinhModel.Name, [Validators.required]),
      ngaysinh: new FormControl(this.hocSinhModel.NgaySinh, [Validators.required]),
      sodt: new FormControl(this.hocSinhModel.sodt, [Validators.required]),
      email: new FormControl(this.hocSinhModel.email, [Validators.required]),
      diachi: new FormControl(this.hocSinhModel.diachi, [Validators.required]),
      lopHoc: new FormControl(this.hocSinhModel.maLop, [Validators.required]),
      maMonhoc: new FormControl('', [Validators.required])
    });
    this.tenMonHoc = this.hocSinhModel.tenMonHoc;
  }
  get f() {
    return this.hocSinhForm.controls;
  }
  onSubmit() {
    this.apiService.post('/api/hoc-sinh/edit', this.hocSinhForm.value).subscribe(res => {
      this.toarst.success('Thêm mới học sinh thành công');
      this.apiService.onFilter('edit');
      this.activeModal.dismiss();
    }, error => {
      this.toarst.error('Thêm mới thất bại');
    });
  }
  cancel(){
    this.activeModal.dismiss();
  }

}
