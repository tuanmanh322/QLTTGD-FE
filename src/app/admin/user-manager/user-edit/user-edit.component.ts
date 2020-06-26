import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LopHocModel} from '../../../shared/model/lop-hoc.model';
import {ApiService} from '../../../shared/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserListModel} from '../../../shared/model/user-list.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  @Input() user: any;


  userList: UserListModel;
  userForm: FormGroup;
  lopHocList: LopHocModel[];
  Nam = 'Nam';
  Nu = 'Nữ';
  switchTab = 0;

  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.userList = this.user;
    this.api.get('/api/lop-hoc/all').subscribe(res => {
      this.lopHocList = res;
    });
    this.userForm = this.fb.group({
      name: new FormControl(this.userList.userName, [Validators.required]),
      idRole: new FormControl(this.userList.idRole, [Validators.required]),
      sex: new FormControl(this.userList.sex, [Validators.required]),
      quequan: new FormControl(this.userList.quequan, [Validators.required]),
      sodt: new FormControl(this.userList.sdt, [Validators.required])
    });
    if (this.userList.idRole == 2) {
      this.switchTab = 2;
      this.userForm.addControl('luongcoban', new FormControl(this.userList.luongcoban, [Validators.required]));
      this.userForm.addControl('idLop', new FormControl(this.userList.idLop));
    }
  }

  get f() {
    return this.userForm.controls;
  }

  openTeacher() {
    this.switchTab = 2;
    this.userForm.addControl('luongcoban', new FormControl(this.userList.luongcoban, [Validators.required]));
    this.userForm.addControl('idLop', new FormControl(this.userList.idLop));
  }

  onEdit() {
    if (this.userForm.valid) {
      const usEdit = {
        idLopOld: this.userList.idLop,
        name: this.userForm.get('name').value,
        idRole: this.userForm.get('idRole').value,
        sex: this.userForm.get('sex').value,
        quequan: this.userForm.get('quequan').value,
        sodt: this.userForm.get('sodt').value,
        idLop: this.userForm.get('idLop').value,
        luongcoban: this.userForm.get('luongcoban').value,

      }
      this.api.put('/api/user/edit-admin', usEdit).subscribe(res => {
        this.toastr.success('Sửa thành công!');
        this.activeModal.dismiss();
        this.api.onFilter('user-edit');
      });
    }
  }

  cancel() {
    this.activeModal.dismiss();
  }
}

