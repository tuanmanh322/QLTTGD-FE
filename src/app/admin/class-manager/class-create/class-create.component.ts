import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ApiService} from '../../../shared/service/api.service';

@Component({
  selector: 'app-class-create',
  templateUrl: './class-create.component.html',
  styleUrls: ['./class-create.component.css']
})
export class ClassCreateComponent implements OnInit {
  @ViewChild('submitele') submitele: ElementRef<HTMLElement>;
  lopHocForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toarst: ToastrService
  ) {
  }

  ngOnInit() {
    this.lopHocForm = this.fb.group({
      maLop: ['', [Validators.required]],
      tenlop: ['', [Validators.required]],
      siso: ['', [Validators.required]],
      thoigianbatdau: ['', [Validators.required]],
      thoigianketthuc: ['', [Validators.required]],
      diadiem: ['', [Validators.required]],
      hocphi: ['', [Validators.required]],
      maMonhoc: ['', [Validators.required]]
    });
  }

  get f() {
    return this.lopHocForm.controls;
  }

  onSubmit() {
    if (this.lopHocForm.invalid){
      return;
    }
    this.apiService.post('/api/lop-hoc/add', this.lopHocForm.value).subscribe(res => {
      this.toarst.success('Thêm mới lớp học thành công');
      this.router.navigate(['/admin/class']);
      // setTimeout(() => {
      //   this.submitele.nativeElement.click();
      // }, 200);
    }, error => {
      this.toarst.error('Thêm mới thất bại');
    });
  }
  cancel(){
    this.activeModal.dismiss();
  }
}
