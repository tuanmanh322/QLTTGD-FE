import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/shared/service/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {
  @ViewChild('submitele') submitele: ElementRef<HTMLElement>;
  hocSinhForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toarst: ToastrService
  ) { }

  ngOnInit() {
    this.hocSinhForm = this.fb.group({
      tenhocsinh: ['', [Validators.required]],
      ngaysinh: ['', [Validators.required]],
      sodt: ['', [Validators.required]],
      email: ['', [Validators.required]],
      diachi: ['', [Validators.required]],
      lopHoc: ['', [Validators.required]],
      maMonhoc: ['', [Validators.required]]
    });
  }
  get f() {
    return this.hocSinhForm.controls;
  }
  onSubmit() {
    if (this.hocSinhForm.invalid){
      return;
    }
    this.apiService.post('/api/hoc-sinh/add', this.hocSinhForm.value).subscribe(res => {
      this.toarst.success('Thêm mới học sinh thành công');
      this.apiService.onFilter('create');
      this.activeModal.dismiss();
    }, error => {
      this.toarst.error('Thêm mới thất bại');
    });
  }
  cancel(){
    this.activeModal.dismiss();
  }

}
