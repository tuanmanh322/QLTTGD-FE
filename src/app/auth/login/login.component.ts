import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../shared/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginModel} from '../../shared/model/login.model';
import {RegisterComponent} from '../register/register.component';
import {Token} from '../../shared/model/token';
import {StorageService} from '../../shared/service/storage.service';
import {UserService} from '../../shared/service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  tokenM: Token;

  constructor(
    public activeModal: NgbActiveModal,
    private apiService: ApiService,
    private storageSerivce: StorageService,
    private userService: UserService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private ngbModal: NgbModal,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      maThe: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  close() {
    this.activeModal.dismiss();
  }

  get f() {
    return this.loginForm.controls;
  }

  onLogin() {
    const login: LoginModel = {
      maThe: this.loginForm.get('maThe').value,
      password: this.loginForm.get('password').value,
      rememberMe: false
    };
    this.userService.login(login).subscribe(res => {
        const token = res.headers.get('Authorization');
        this.tokenM = res.body;
        this.storageSerivce.saveToken(token);
        this.storageSerivce.saveUser(login.maThe);
        this.toastr.success('Đăng nhập thành công!');
        this.apiService.onFilter('Login');
        this.router.navigate(['']);
      }, error => {
        this.loginForm.get('password').reset();
        if (error.status === 401) {
          if (error.error) {
            this.toastr.error(`Lỗi ${error.error.message}`);
          } else {
            this.toastr.error('Bạn không có quyền truy cập');
          }
        }
      }
    );
  }

  goToRegister() {
    this.ngbModal.open(RegisterComponent, {size: 'lg'});
  }
}
