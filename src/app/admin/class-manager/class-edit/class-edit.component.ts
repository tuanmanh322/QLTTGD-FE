import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {LopHocModel} from '../../../shared/model/lop-hoc.model';
import {ApiService} from '../../../shared/service/api.service';
import {MonHocModel} from '../../../shared/model/mon-hoc.model';

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

  mhEnti: MonHocModel[];

  kip1 = 'Kíp 1(7h - 9h)';
  kip2 = 'Kíp 2(9h30- 12h)';
  kip3 = 'Kíp 3(13h-15h)';
  kip4 = 'Kíp 4(15h-18h)';
  kip5 = 'Kíp 5(18h30-21h30)';
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
      id: new FormControl(this.lopHocModel.id),
      maLop: new FormControl(this.lopHocModel.maLop, [Validators.required]),
      tenlop: new FormControl(this.lopHocModel.tenLop, [Validators.required]),
      siso: new FormControl(this.lopHocModel.siSo, [Validators.required]),
      thoigianbatdau: new FormControl(this.lopHocModel.ngayKhaiGiang, [Validators.required]),
      thoigianketthuc: new FormControl(this.lopHocModel.ngayKetThuc, [Validators.required]),
      diadiem: new FormControl(this.lopHocModel.diaDiem, [Validators.required]),
      hocphi: new FormControl(this.lopHocModel.hocPhi, [Validators.required]),
      maMonhoc: new FormControl(this.lopHocModel.maMonHoc, [Validators.required]),
      kipDay: new FormControl(this.lopHocModel.kipDay, [Validators.required]),
    });
    this.tenMonHoc = this.lopHocModel.tenMonHoc;

    this.apiService.get('/api/mon-hoc/all').subscribe(res => {
      this.mhEnti = res;
    });
  }

  get f() {
    return this.lopHocForm.controls;
  }

  onSubmit() {
    // const lh = {
    //   id: this.lopHocModel.id,
    //   maLop: this.lopHocForm.get('maLop').value,
    //   tenlop:  this.lopHocForm.get('tenlop').value,
    //   siso:  this.lopHocForm.get('siso').value,
    //   thoigianbatdau:  this.lopHocForm.get('thoigianbatdau').value,
    //   thoigianketthuc:  this.lopHocForm.get('thoigianketthuc').value,
    //   diadiem:  this.lopHocForm.get('diadiem').value,
    //   hocphi: this.lopHocForm.get('').value,
    //   maMonhoc:  this.lopHocForm.get('').value,
    //   kipDay:  this.lopHocForm.get('').value,
    // }
    this.apiService.put('/api/lop-hoc/edit', this.lopHocForm.value).subscribe(res => {
      this.toarst.success('Cập nhật lớp học thành công');
      this.apiService.onFilter('edit');
      this.activeModal.dismiss();
    }, error => {
      this.toarst.error('Cập nhật thất bại');
    });
  }
  cancel(){
    this.activeModal.dismiss();
  }

}
