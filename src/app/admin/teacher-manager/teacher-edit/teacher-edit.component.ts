import {Component, Input, OnInit} from '@angular/core';
import {GiaoVienModel} from '../../../shared/model/giao-vien.model';
import {ApiService} from '../../../shared/service/api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {LopEnti} from '../../../shared/model/lop-enti';

@Component({
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrls: ['./teacher-edit.component.css']
})
export class TeacherEditComponent implements OnInit {
  @Input() gv: any;

  gvM: GiaoVienModel;

  gvForm: FormGroup;
  lopHocList: LopEnti[];
  Nam = 'NAM';
  Nu = 'NỮ';

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {
    this.gvM = this.gv;
    this.api.get('/api/lop-hoc/all').subscribe(res => {
      this.lopHocList = res;
    });

    this.gvForm = this.fb.group({
      Name: new FormControl(this.gvM.name, [Validators.required]),
      idLop: new FormControl(this.gvM.idLop, [Validators.required]),
      kipDay: new FormControl(this.gvM.kipDay, [Validators.required]),
      luongcoban: new FormControl(this.gvM.luongcoban, [Validators.required]),
      NgaySinh: new FormControl(this.gvM.NgaySinh, [Validators.required]),
      sex: new FormControl(this.gvM.sex, [Validators.required]),
      cmt: new FormControl(this.gvM.socmt, [Validators.required]),
      sodt: new FormControl(this.gvM.sodt, [Validators.required])
    });
  }

  edit() {
    if (this.gvForm.valid) {
      const gvF = {
        id: this.gvM.id,

        maGiaoVien: this.gvM.maGiaoVien,

        name: this.gvForm.get('Name').value,

        sex: this.gvForm.get('sex').value,

        NgaySinh: this.gvForm.get('NgaySinh').value,

        socmt: this.gvForm.get('cmt').value,

        sodt: this.gvForm.get('sodt').value,

        maLop: this.gvM.maLop,

        tenLop: this.gvM.tenLop,

        maThe: this.gvM.maThe,

        kipDay: this.gvForm.get('kipDay').value,

        luongcoban: this.gvForm.get('luongcoban').value,

        idLop: this.gvForm.get('idLop').value,

        siso: this.gvM.siso,

        maGV: this.gvM.id,
      };
      this.api.put('/api/giao-vien/edit', gvF).subscribe(res => {
        this.toastr.success('Cập nhật thành công!');
        this.activeModal.dismiss();
        this.api.onFilter('edit-teacher');
      }, error => {
        this.toastr.error('Cập nhật thất bại!');
      });
    }
  }

  cancel() {
    this.activeModal.dismiss();
  }

  get f() {
    return this.gvForm.controls;
  }
}
