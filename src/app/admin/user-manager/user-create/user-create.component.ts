import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../shared/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {LopHocModel} from '../../../shared/model/lop-hoc.model';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  userForm: FormGroup;
  lopHocList: LopHocModel[];
  Nam = 'NAM';
  Nu = 'NỮ';
  switchTab = 0;

  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.api.get('/api/lop-hoc/all').subscribe(res => {
      this.lopHocList = res;
    });
    this.userForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      idRole: new FormControl('', [Validators.required]),
      sex: new FormControl('', [Validators.required]),
      quequan: new FormControl('', [Validators.required]),
      sodt: new FormControl('', [Validators.required])
    });
  }

  get f() {
    return this.userForm.controls;
  }

  openTeacher() {
    this.switchTab = 2;
    this.userForm.addControl('luongcoban', new FormControl('', [Validators.required]));
    this.userForm.addControl('idLop', new FormControl(''));
  }

  onCreate() {
    if (this.userForm.valid) {
      this.api.post('/api/user/add-admin', this.userForm.value).subscribe(res => {
        this.toastr.success('Thêm thành công!');
        this.activeModal.dismiss();
        this.api.onFilter('user-create');
      }, error => {
        this.toastr.error('Thêm mới thất bại!');
      });
    }
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
