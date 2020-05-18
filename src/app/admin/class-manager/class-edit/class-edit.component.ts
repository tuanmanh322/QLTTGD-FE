import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {LopHocModel} from '../../../shared/model/lop-hoc.model';
import {ApiService} from '../../../shared/service/api.service';

@Component({
  selector: 'app-class-edit',
  templateUrl: './class-edit.component.html',
  styleUrls: ['./class-edit.component.css']
})
export class ClassEditComponent implements OnInit {
  @Input() lophoc: any;
  lopHocForm: FormGroup;
  lopHocModel: LopHocModel;
  tenMonHoc: string;
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toarst: ToastrService
  ) {
  }

  ngOnInit() {
    this.lopHocModel = this.lophoc;
    this.lopHocForm = this.fb.group({
      maLop: new FormControl({value: this.lopHocModel.id, disable:true}),
      tenlop: new FormControl(this.lopHocModel.tenLop, [Validators.required]),
      siso: new FormControl(this.lopHocModel.siSo, [Validators.required]),
      thoigianbatdau: new FormControl(this.lopHocModel.ngayKhaiGiang, [Validators.required]),
      thoigianketthuc: new FormControl(this.lopHocModel.ngayKetThuc, [Validators.required]),
      diadiem: new FormControl(this.lopHocModel.diaDiem, [Validators.required]),
      hocphi: new FormControl(this.lopHocModel.hocPhi, [Validators.required]),
      maMonhoc: new FormControl('', [Validators.required])
    });
    this.tenMonHoc = this.lopHocModel.tenMonHoc;
  }

  get f() {
    return this.lopHocForm.controls;
  }

  onSubmit() {
    this.apiService.post('/api/lop-hoc/edit', this.lopHocForm.value).subscribe(res => {
      this.toarst.success('Thêm mới lớp học thành công');
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
