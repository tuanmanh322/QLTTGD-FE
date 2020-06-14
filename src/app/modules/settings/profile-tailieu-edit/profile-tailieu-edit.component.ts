import {Component, Input, OnInit} from '@angular/core';
import {TaiLieu} from '../../../shared/model/tai-lieu';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../shared/service/api.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-profile-tailieu-edit',
  templateUrl: './profile-tailieu-edit.component.html',
  styleUrls: ['./profile-tailieu-edit.component.css']
})
export class ProfileTailieuEditComponent implements OnInit {
  @Input() document: any;

  taiLieu: TaiLieu;

  taiLieuForm: FormGroup;
  isSelectFile: boolean;

  constructor(
    private apiService: ApiService,
    public modalActivate: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.taiLieu = this.document;
    this.taiLieuForm = this.fb.group({
      title: new FormControl(this.taiLieu.title, [Validators.required]),
      noidung: new FormControl(this.taiLieu.title, [Validators.required]),
      fileDocument: new FormControl('', [Validators.required])
    });
  }

  uploadFile(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      const fileSize = parseInt(file.size) / 1024;
      if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        || file.type === 'application/msword'
        || file.type === 'application/pdf') {
        if (fileSize < 10240) {
          this.taiLieuForm.get('fileDocument').setValue(file);
          this.isSelectFile = true;
        } else {
          this.toastr.error('Kích thước file quá lớn, bạn chỉ được chọn file có kích thước dưới 10MB');
        }
      } else {
        this.isSelectFile = false;
        this.taiLieuForm.get('fileDocument').setValue('');
        this.toastr.error('Định dạng file không đúng');
      }
    }
  }

  onCancle() {
    this.modalActivate.dismiss();
  }

  onEdit() {
    const formData = new FormData();
    formData.append('title', this.taiLieuForm.get('title').value);
    formData.append('noidung', this.taiLieuForm.get('noidung').value);
    if (this.isSelectFile === true) {
      formData.append('fileDocument', this.taiLieuForm.get('fileDocument').value);
    }
    this.apiService.post('/api/document/edit/' + this.taiLieu.id, formData).subscribe(res => {
      this.toastr.success('Cập nhật thành công!');
    }, error => {
      this.toastr.error('Cập nhật thất bại!');
    });
  }

  get f() {
    return this.taiLieuForm.controls;
  }
}
