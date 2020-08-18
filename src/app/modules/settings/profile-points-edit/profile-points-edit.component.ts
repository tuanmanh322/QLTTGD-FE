import {Component, Input, OnInit} from '@angular/core';
import {PointsModel} from '../../../shared/model/points-model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../shared/service/api.service';
import {LopHocModel} from '../../../shared/model/lop-hoc.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-profile-points-edit',
  templateUrl: './profile-points-edit.component.html',
  styleUrls: ['./profile-points-edit.component.css']
})
export class ProfilePointsEditComponent implements OnInit {
  @Input() points: any;

  pointModel: PointsModel;
  pointForm: FormGroup;
  lopHoc: LopHocModel[];
  kip1 = 'Kíp 1(7h - 9h)';
  kip2 = 'Kíp 2(9h30- 12h)';
  kip3 = 'Kíp 3(13h-15h)';
  kip4 = 'Kíp 4(15h-18h)';
  kip5 = 'Kíp 5(18h30-21h30)';

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    public  activeModal: NgbActiveModal,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.pointModel = this.points;
    this.apiService.get('/api/lop-hoc/all').subscribe(res => {
      this.lopHoc = res;
    });

    this.pointForm = this.fb.group({
      // kipDay: new FormControl(this.pointModel.kipDay, [Validators.required]),
      // idLop: new FormControl(this.pointModel.idLop, [Validators.required]),
      diemMieng: new FormControl(this.pointModel.diemMieng, [Validators.required, Validators.pattern('^(10|\\d)(\\.\\d{1,2})?$')]),
      diem15p: new FormControl(this.pointModel.diem15p, [Validators.required, Validators.pattern('^(10|\\d)(\\.\\d{1,2})?$')]),
      diem90p: new FormControl(this.pointModel.diem90p, [Validators.required, Validators.pattern('^(10|\\d)(\\.\\d{1,2})?$')]),
    });
  }

  // tenLop
  onEdit() {
    if (this.pointForm.valid) {
      const points = {
        id: this.pointModel.id,
        maDiem: this.pointModel.maDiem,
        // maLop: this.pointForm.get('idLop').value,
        // idUser: this.pointModel.idUser,
        diemmieng: this.pointForm.get('diemMieng').value,
        diem15p: this.pointForm.get('diem15p').value,
        diem90p: this.pointForm.get('diem90p').value,
        diemtb: this.parseDiemTB(),
        // username: this.pointModel.userName,
        // kipDay: this.pointForm.get('kipDay').value,
        // idLopOld: this.pointModel.idLop
      };
      this.apiService.put('/api/diem/edit', points).subscribe(res => {
        this.toastr.success('Cập nhật thành công!');
        this.activeModal.dismiss();
        this.apiService.onFilter('edit');
      }, error => {
        this.toastr.error('Cập nhật thất bại!');
      });
    }
  }

  cancel() {
    this.activeModal.dismiss();
  }

  parseDiemTB() {
    let diemTB = ((parseFloat(this.pointForm.get('diemMieng').value) + parseFloat(this.pointForm.get('diem15p').value)) + parseFloat(this.pointForm.get('diem90p').value) * 2) / 4;
    return diemTB;
  }

  get f() {
    return this.pointForm.controls;
  }
}
