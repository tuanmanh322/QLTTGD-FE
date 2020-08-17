import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ApiService} from '../../../shared/service/api.service';
import {MonHocModel} from '../../../shared/model/mon-hoc.model';

@Component({
  selector: 'app-class-create',
  templateUrl: './class-create.component.html',
  styleUrls: ['./class-create.component.css']
})
export class ClassCreateComponent implements OnInit {
  @ViewChild('submitele') submitele: ElementRef<HTMLElement>;
  lopHocForm: FormGroup;

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
    this.apiService.get('/api/mon-hoc/all').subscribe(res => {
      this.mhEnti = res;
    });

    this.lopHocForm = this.fb.group({
      maLop: ['', [Validators.required]],
      tenlop: ['', [Validators.required]],
      siso: ['', [Validators.required]],
      thoigianbatdau: ['', [Validators.required]],
      thoigianketthuc: ['', [Validators.required]],
      diadiem: ['', [Validators.required]],
      hocphi: ['', [Validators.required]],
      maMonhoc: ['', [Validators.required]],
      kipDay: ['', [Validators.required]]
    });
  }

  get f() {
    return this.lopHocForm.controls;
  }

  onSubmit() {
    if (this.lopHocForm.invalid) {
      return;
    }
    this.apiService.post('/api/lop-hoc/add', this.lopHocForm.value).subscribe(res => {
      this.toarst.success('Thêm mới lớp học thành công');
      this.apiService.onFilter('create');
      this.activeModal.dismiss();
    }, error => {
      this.toarst.error('Thêm mới thất bại');
    });
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
