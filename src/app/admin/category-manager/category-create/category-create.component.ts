import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../shared/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HangMucModel} from '../../../shared/model/hang-muc-model';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  cdForm: FormGroup;

  hangmuc: HangMucModel[];

  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {
    this.api.get('/api/hang-muc/all').subscribe(res => {
      this.hangmuc = res;
    });
    this.cdForm = this.fb.group({
      maChude: new FormControl('', [Validators.required]),
      tenChude: new FormControl('', [Validators.required]),
      noiDung: new FormControl('', [Validators.required]),
      maHangmucbaiviet: new FormControl(''),
    });
  }

  get f() {
    return this.cdForm.controls;
  }

  onCreate() {
    if (this.cdForm.valid) {
      const hmE = {
        maChude: this.cdForm.get('maChude').value,
        tenChude: this.cdForm.get('tenChude').value,
        noiDung: this.cdForm.get('noiDung').value,
        idHangMuc: this.cdForm.get('maHangmucbaiviet').value
      };
      this.api.post('/api/chu-de/add', hmE).subscribe(res => {
        this.api.onFilter('Add topic');
        this.toastr.success('Thêm mới thành công!');
        this.activeModal.dismiss();
      }, error => {
        this.toastr.error('Thêm mới thất bại!');
      });
    }
  }

  cancel() {
    this.activeModal.dismiss();
  }

}
