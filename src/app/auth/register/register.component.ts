import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../shared/service/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  pwMatch: boolean;

  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('^ \\ w + @ [a-zA-Z _] +? \\. [a-zA-Z] {2,3} $')]),
      password: new FormControl('', [Validators.required,Validators.min(6)]),
      idRole: new FormControl('', [Validators.required])
    });
  }

  getRepassword(event) {
    const repw = event.target.value;
    if (repw !== this.registerForm.get('password').value) {
      this.pwMatch = false;
    } else {
      this.pwMatch = true;
    }
  }

  onCancle() {
    this.activeModal.dismiss();
  }
  register(){
    if (this.registerForm.valid){
      this.apiService.post('/api/user/add', this.registerForm.value).subscribe(res=> {
         this.toastr.success('Đăng kí thành công!');
      },error => {
        this.toastr.error('Đăng kí thất bại!');
      })
    }
  }
}
