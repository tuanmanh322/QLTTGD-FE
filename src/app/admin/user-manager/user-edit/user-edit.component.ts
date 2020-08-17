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
    this.userList = this.user;
    this.api.get('/api/lop-hoc/all').subscribe(res => {
      this.lopHocList = res;
    });
    this.userForm = this.fb.group({
      name: new FormControl(this.userList.userName, [Validators.required]),
      idRole: new FormControl(this.userList.idRole, [Validators.required]),
      gioitinh: new FormControl(this.userList.sex.toString().toUpperCase(), [Validators.required]),
      address: new FormControl(this.userList.quequan, [Validators.required]),
      phone: new FormControl(this.userList.sodt, [Validators.required])
    });
    if (this.userList.idRole === 2 || this.switchTab === 2) {
      this.switchTab = 2;
      this.userForm.addControl('luongcoban', new FormControl(this.userList.luongcoban, [Validators.required]));
      // this.userForm.addControl('idLop', new FormControl(this.userList.idLop));
    }else{
      this.userForm.removeControl('luongcoban');
      // this.userForm.removeControl('idLop');
    }
  }

  get f() {
    return this.userForm.controls;
  }

  openTeacher() {
    this.switchTab = 2;
    this.userForm.addControl('luongcoban', new FormControl(this.userList.luongcoban, [Validators.required]));
    // this.userForm.addControl('idLop', new FormControl(this.userList.idLop));
  }

  onEdit() {
    if (this.userForm.valid) {
      let usEdit = {};
      if (this.switchTab === 2) {
        usEdit = {
          idThe: this.userList.idThe,
          idLopOld: this.userList.idLop,
          name: this.userForm.get('name').value,
          idRole: this.userForm.get('idRole').value,
          sex: this.userForm.get('gioitinh').value,
          quequan: this.userForm.get('address').value,
          sodt: this.userForm.get('phone').value,
          // tslint:disable-next-line:radix
          // idLop: parseInt(this.userForm.get('idLop').value),
          luongcoban: this.userForm.get('luongcoban').value,
        };
      } else {
        usEdit = {
          idThe: this.userList.idThe,
          idLopOld: this.userList.idLop,
          name: this.userForm.get('name').value,
          idRole: this.userForm.get('idRole').value,
          sex: this.userForm.get('gioitinh').value,
          quequan: this.userForm.get('address').value,
          sodt: this.userForm.get('phone').value,
        };
      }

      this.api.put('/api/user/edit-admin', usEdit).subscribe(res => {
        this.toastr.success('Sửa thành công!');
        this.activeModal.dismiss();
        this.api.onFilter('user-edit');
      },error =>  {
        this.toastr.error('Sửa thất bại!');
      });
    }
  }

  cancel() {
    this.activeModal.dismiss();
  }
}

