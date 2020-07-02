import {Component, Input, OnInit} from '@angular/core';
import {HangMucModel} from '../../../shared/model/hang-muc-model';
import {ApiService} from '../../../shared/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MonHocModel} from '../../../shared/model/mon-hoc.model';

@Component({
  selector: 'app-topic-edit',
  templateUrl: './topic-edit.component.html',
  styleUrls: ['./topic-edit.component.css']
})
export class TopicEditComponent implements OnInit {
  @Input() top: any;

  hm: HangMucModel;

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
    this.hm = this.top;
    this.api.get('/api/mon-hoc/all').subscribe(res => {
      this.mh = res;
    });
    this.hmForm = this.fb.group({
      maHangmucbaiviet: new FormControl(this.hm.maHangmucbaiviet, [Validators.required]),
      tenhangmuc: new FormControl(this.hm.tenhangmuc, [Validators.required]),
      mota: new FormControl(this.hm.mota, [Validators.required]),
      maMonhoc: new FormControl(this.hm.maMonhoc),
    });
  }

  get f() {
    return this.hmForm.controls;
  }

  onEdit() {
    if (this.hmForm.valid) {
      const hmE = {
        id: this.hm.id,
        maHangmucbaiviet: this.hmForm.get('maHangmucbaiviet').value,
        tenhangmuc: this.hmForm.get('tenhangmuc').value,
        mota: this.hmForm.get('mota').value,
        maMonhoc: this.hmForm.get('maMonhoc').value
      };
      this.api.put('/api/hang-muc/edit', hmE).subscribe(res => {
        this.api.onFilter('Edit topic');
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
