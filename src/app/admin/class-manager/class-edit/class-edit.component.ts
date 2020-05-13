import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {LopHocModel} from '../../../shared/model/lop-hoc.model';
import {ApiService} from '../../../shared/service/api.service';

@Component({
  selector: 'app-class-edit',
  templateUrl: './class-edit.component.html',
  styleUrls: ['./class-edit.component.css']
})
export class ClassEditComponent implements OnInit {
  @Input() lophoc: any;
  lopHocForm: FormGroup;
  lopHocModel: LopHocModel;

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
      maLop: new FormControl('', [Validators.required]),
      tenlop: new FormControl('', [Validators.required]),
      siso: new FormControl('', [Validators.required]),
      thoigianbatdau: new FormControl('', [Validators.required]),
      thoigianketthuc: new FormControl('', [Validators.required]),
      diadiem: new FormControl('', [Validators.required]),
      hocphi: new FormControl('', [Validators.required]),
      maMonhoc: new FormControl('', [Validators.required])
    });
  }

  get f() {
    return this.lopHocForm.controls;
  }

  onSubmit() {
    this.apiService.post('/api/lop-hoc/edit', this.lopHocForm.value).subscribe(res => {
      this.toarst.success('Thêm mới lớp học thành công');
      this.router.navigate(['/admin/class']);
    }, error => {
      this.toarst.error('Thêm mới thất bại');
    });
  }
  cancel(){
    this.activeModal.dismiss();
  }

}
