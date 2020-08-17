import { Component, OnInit } from '@angular/core';
import {HangMucModel} from '../../../shared/model/hang-muc-model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MonHocModel} from '../../../shared/model/mon-hoc.model';
import {ApiService} from '../../../shared/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-topic-create',
  templateUrl: './topic-create.component.html',
  styleUrls: ['./topic-create.component.css']
})
export class TopicCreateComponent implements OnInit {

  hmForm: FormGroup;

  mh: MonHocModel[];

  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {
    this.api.get('/api/mon-hoc/all').subscribe(res => {
      this.mh = res;
    });
    this.hmForm = this.fb.group({
      maHangmucbaiviet: new FormControl('', [Validators.required]),
      tenhangmuc: new FormControl('', [Validators.required]),
      mota: new FormControl('', [Validators.required]),
      maMonhoc: new FormControl(''),
    });
  }

  get f() {
    return this.hmForm.controls;
  }

  onCreate() {
    if (this.hmForm.valid) {
      const hmE = {
        maHangmucbaiviet: this.hmForm.get('maHangmucbaiviet').value,
        tenhangmuc: this.hmForm.get('tenhangmuc').value,
        mota: this.hmForm.get('mota').value,
        maMonhoc: this.hmForm.get('maMonhoc').value
      };
      this.api.post('/api/hang-muc/add', hmE).subscribe(res => {
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
