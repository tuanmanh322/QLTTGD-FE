import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HangMucModel} from '../../../shared/model/hang-muc-model';
import {ApiService} from '../../../shared/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ChudeModel} from '../../../shared/model/chude-model';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  @Input() cd: any;
  cdForm: FormGroup;

  hangmuc: HangMucModel[];
  chude: ChudeModel;

  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {
    this.chude = this.cd;
    this.api.get('/api/hang-muc/all').subscribe(res => {
      this.hangmuc = res;
    });
    this.cdForm = this.fb.group({
      maChude: new FormControl(this.chude.machude, [Validators.required]),
      tenChude: new FormControl(this.chude.tenchude, [Validators.required]),
      noiDung: new FormControl(this.chude.noidung, [Validators.required]),
      maHangmucbaiviet: new FormControl(this.chude.tenHangmuc)
    });
  }

  get f() {
    return this.cdForm.controls;
  }

  onEdit() {
    if (this.cdForm.valid) {
      const hmE = {
        id: this.chude.id,
        maChude: this.cdForm.get('maChude').value,
        tenChude: this.cdForm.get('tenChude').value,
        noiDung: this.cdForm.get('noiDung').value,
        maHangmucbaiviet: this.cdForm.get('maHangmucbaiviet').value
      };
      this.api.post('/api/chu-de/edit', hmE).subscribe(res => {
        this.api.onFilter('edit cate');
        this.toastr.success('Cập nhật thành công!');
        this.activeModal.dismiss();
      }, error => {
        this.toastr.error('Cập nhật thất bại!');
      });
    }
  }

  cancel() {
    this.activeModal.dismiss();
  }


}
