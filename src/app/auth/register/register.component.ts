import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../shared/service/api.service';
import {NotifyComponent} from '../notify/notify.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  ispwNotMatch: boolean;
  isEmailExisted: boolean;

  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private apiService: ApiService,
    private ngbModal: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  getRepassword(event) {
    const repw = event.target.value;
    if (repw !== this.registerForm.get('password').value) {
      this.ispwNotMatch = true;
    } else {
      this.ispwNotMatch = false;
    }
  }

  onCancle() {
    this.activeModal.dismiss();
  }

  register() {
    if (this.registerForm.valid) {
      this.apiService.post('/api/user/register', this.registerForm.value).subscribe(res => {
        this.toastr.success('Đăng kí thành công!');
        const modalRef = this.ngbModal.open(NotifyComponent, {size: 'lg'});
        modalRef.componentInstance.notify = res.data;
        this.activeModal.dismiss();
      }, error => {
        this.toastr.error('Đăng kí thất bại!');
      });
    }
  }

  checkMailExist(event) {
    const email = event.target.value;
    this.apiService.get('/api/user/check-email?email=' + email.trim()).subscribe(res => {
      if (res === true) {
        this.isEmailExisted = true;
      } else {
        this.isEmailExisted = false;
      }
    });
  }

  get f() {
    return this.registerForm.controls;
  }
}
