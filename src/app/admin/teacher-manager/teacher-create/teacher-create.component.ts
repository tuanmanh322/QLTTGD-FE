import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../../shared/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LopHocModel} from '../../../shared/model/lop-hoc.model';
import {CardModel} from '../../../shared/model/card-model';
import {CardTeacherComponent} from '../card-teacher/card-teacher.component';

@Component({
  selector: 'app-teacher-create',
  templateUrl: './teacher-create.component.html',
  styleUrls: ['./teacher-create.component.css']
})
export class TeacherCreateComponent implements OnInit {

  gvForm: FormGroup;
  lopHocList: LopHocModel[];
  card: CardModel;
  Nam = 'Nam';
  Nu = 'Nữ';

  kip1 = 'Kíp 1(7h - 9h)';
  kip2 = 'Kíp 2(9h30- 12h)';
  kip3 = 'Kíp 3(13h-15h)';
  kip4 = 'Kíp 4(15h-18h)';
  kip5 = 'Kíp 5(18h30-21h30)';

  constructor(
    public activeModal: NgbActiveModal,
    private api: ApiService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private ngbModal: NgbModal
  ) {
  }

  ngOnInit() {

    this.api.get('/api/lop-hoc/all').subscribe(res => {
      this.lopHocList = res;
    });
    this.gvForm = this.fb.group({
      maGiaoVien: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      sex: new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      cmt: new FormControl('', [Validators.required]),
      sodt: new FormControl('', [Validators.required]),
      // kipDay: new FormControl('', [Validators.required]),
      luongcoban: new FormControl('', [Validators.required]),
      idLop: new FormControl('', [Validators.required]),
    });
  }

  onCreate() {
    if (this.gvForm.valid) {
      this.api.post('/api/giao-vien/add', this.gvForm.value).subscribe(res => {
        this.card = res.data;
        this.activeModal.dismiss();
        this.api.onFilter('create-teacher');
        this.ngbModal.open(CardTeacherComponent, {size: 'lg'}).componentInstance.card = this.card;
      });
    }

  }

  get f() {
    return this.gvForm.controls;
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
