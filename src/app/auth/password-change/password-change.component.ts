import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../shared/service/api.service';
import {UserService} from '../../shared/service/user.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {
  passwordForm: FormGroup;

  isNotMatch: boolean;

  constructor(
    private apiSerVice: ApiService,
    private fb: FormBuilder,
    private userService: UserService,
    private ngbModal: NgbModal,
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      oldpw: new FormControl('', [Validators.required]),
      newpw: new FormControl('', [Validators.required, Validators.minLength(8)])
    });

  }

  onSubmit() {
    if (this.passwordForm.valid && this.isNotMatch === false) {
      const PassWordChange = {
        oldPassword: this.passwordForm.get('oldpw').value,
        newPassword: this.passwordForm.get('newpw').value
      };
      this.apiSerVice.post('/api/user/change-password', PassWordChange).subscribe(res => {
        console.log(res);
        this.userService.logOut();
        this.activeModal.dismiss();
        this.ngbModal.open(LoginComponent,{size: 'lg'});
      });
    }

  }

  pwCheck(event) {
    const rePw = event.target.value;
    if (rePw !== this.passwordForm.get('newpw').value) {
      this.isNotMatch = true;
    } else {
      this.isNotMatch = false;
    }
  }

  close() {
    this.activeModal.dismiss();
  }

  get f() {
    return this.passwordForm.controls;
  }
}
