import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from 'src/app/shared/service/api.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {LopEnti} from '../../../shared/model/lop-enti';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {
  @ViewChild('submitele') submitele: ElementRef<HTMLElement>;
  hocSinhForm: FormGroup;

  fileSelect: boolean;

  preview = '';
  Nam = 'NAM';
  Nu = 'NỮ';
  lopList: LopEnti[];

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toarst: ToastrService
  ) {
  }

  ngOnInit() {

    this.apiService.get('/api/lop-hoc/all').subscribe(res => {
      this.lopList = res;
    });

    this.hocSinhForm = this.fb.group({
      tenhocsinh: ['', [Validators.required]],
      ngaysinh: ['', [Validators.required]],
      sodt: ['', [Validators.required, Validators.pattern('^[0-9]{1,10}$')]],
      diachi: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      imageHS: [''],
      lopHoc: ['']
    });
  }

  get f() {
    return this.hocSinhForm.controls;
  }

  onSubmit() {
    if (this.hocSinhForm.invalid) {
      return;
    }
    const ngaysinh = (new Date(this.hocSinhForm.get('ngaysinh').value)).toUTCString();
    const fd = new FormData();
    fd.append('birthday', ngaysinh);
    fd.append('tenhocsinh', this.hocSinhForm.get('tenhocsinh').value);
    fd.append('sodt', this.hocSinhForm.get('sodt').value);
    fd.append('diachi', this.hocSinhForm.get('diachi').value);
    fd.append('sex', this.hocSinhForm.get('sex').value);
    fd.append('maLop', this.hocSinhForm.get('lopHoc').value);
    if (this.fileSelect === true) {
      fd.append('imageHS', this.hocSinhForm.get('imageHS').value);
    }

    this.apiService.post('/api/hoc-sinh/add', fd).subscribe(res => {
      this.toarst.success('Thêm mới học sinh thành công');
      this.apiService.onFilter('create');
      this.activeModal.dismiss();
    }, error => {
      this.toarst.error('Thêm mới thất bại');
    });
  }

  cancel() {
    this.activeModal.dismiss();
  }

  SelectFile(event) {
    const reader = new FileReader();
    if (event.target.files.length && event.target.files) {
      const [file] = event.target.files;
      // read file as url
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.preview = reader.result as string;
        if (file.type === 'image/jpeg' || file.type === 'image/pjpeg' || file.type === 'image/png' || file.type === 'image/jpg') {
          this.hocSinhForm.get('imageHS').setValue(file);
          this.fileSelect = true;
        } else {
          this.toarst.error('Định dạng ảnh không đúng!');
          this.hocSinhForm.get('imageHS').setValue('');
        }
      };
    }
  }

}
