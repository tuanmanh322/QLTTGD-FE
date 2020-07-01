import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../shared/service/api.service';
import {Title} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  contactForm: FormGroup;

  constructor(
    private api: ApiService,
    private title: Title,
    private toastr: ToastrService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')]),
      sdt: new FormControl('', [Validators.required, Validators.minLength(10)]),
      status: new FormControl('', [Validators.maxLength(255)]),
    });
  }

  doPost() {
    if (this.contactForm.valid) {
      this.api.post('/api/contact', this.contactForm.value).subscribe(res => {
        this.toastr.success('Tạo liên hệ thành công!');
        this.activeModal.dismiss();
      }, error => {
        this.toastr.error('Tạo liên hệ thất bại!');
      });
    }
  }

  get f() {
    return this.contactForm.controls;
  }

  onCancle() {
    this.activeModal.dismiss();
  }
}
