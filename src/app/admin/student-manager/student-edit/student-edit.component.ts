import {HocSinhModel} from './../../../shared/model/hoc-sinh-model';
import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {ApiService} from 'src/app/shared/service/api.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {LopEnti} from '../../../shared/model/lop-enti';

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
  lopList: LopEnti[];
  Nam = 'NAM';
  Nu = 'NỮ';
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toarst: ToastrService
  ) {
  }

  ngOnInit() {

    this.apiService.get('/api/lop-hoc/all').subscribe(res => {
      this.lopList = res;
    });
    this.hocSinhModel = this.hocsinh;
    this.hocSinhForm = this.fb.group({
      // maHocSinh: new FormControl(this.hocSinhModel.id),
      tenhocsinh: new FormControl(this.hocSinhModel.hocsinhName, [Validators.required]),
      ngaysinh: new FormControl(this.hocSinhModel.NgaySinh, [Validators.required]),
      sodt: new FormControl(this.hocSinhModel.sodt, [Validators.required]),
      // email: new FormControl(this.hocSinhModel.email, [Validators.required]),
      diachi: new FormControl(this.hocSinhModel.diachi, [Validators.required]),
      lopHoc: new FormControl(this.hocSinhModel.maLop, [Validators.required]),
      // maMonhoc: new FormControl('', [Validators.required]),
      GioiTinh: new FormControl(this.hocSinhModel.gioitinh, [Validators.required])
    });
    this.tenMonHoc = this.hocSinhModel.tenMonHoc;
  }

  get f() {
    return this.hocSinhForm.controls;
  }

  onSubmit() {
    if (this.hocSinhForm.valid) {
      const hsinh = {
        id: this.hocSinhModel.id,
        hocsinhName: this.hocSinhForm.get('tenhocsinh').value,
        birthday: this.hocSinhForm.get('ngaysinh').value,
        sodt: this.hocSinhForm.get('sodt').value,
        diachi: this.hocSinhForm.get('diachi').value,
        gioitinh: this.hocSinhForm.get('GioiTinh').value,
        maLop: this.hocSinhForm.get('lopHoc').value,
        oldMaLop: this.hocSinhModel.maLop
      };
      this.apiService.put('/api/hoc-sinh/edit', hsinh).subscribe(res => {
        this.toarst.success('Cập nhật học sinh thành công');
        this.apiService.onFilter('edit');
        this.activeModal.dismiss();
      }, error => {
        this.toarst.error('Cập nhật thất bại');
      });
    }
  }

  cancel() {
    this.activeModal.dismiss();
  }

}
