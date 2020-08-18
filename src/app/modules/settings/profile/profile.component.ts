import {StorageService} from './../../../shared/service/storage.service';
import {Component, OnInit} from '@angular/core';
import {UserProfileModel} from '../../../shared/model/user-profile.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../shared/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {ADMIN, ANONYMOUS, CURRENT_USER, ROLE, STUDENT, TEACHER} from '../../../shared/model/qlttgd.constant';
import {MonHocModel} from '../../../shared/model/mon-hoc.model';
import {HangMucModel} from '../../../shared/model/hang-muc-model';
import {LopHocModel} from '../../../shared/model/lop-hoc.model';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfileModel;
  userForm: FormGroup;
  roleUser: string;
  preview: string = '';
  isEmailExisted: boolean;
  avatarUrl: any;
  fileTypeImg: any;
  switchTab: number = 1;
  monHocList: MonHocModel[];
  hangMucModel: HangMucModel[];
  lopHocModel: LopHocModel[];
  Nam = 'NAM';
  Nu = 'NỮ';
  kip1 = 'Kíp 1(7h - 9h)';
  kip2 = 'Kíp 2(9h30- 12h)';
  kip3 = 'Kíp 3(13h-15h)';
  kip4 = 'Kíp 4(15h-18h)';
  kip5 = 'Kíp 5(18h30-21h30)';
  fileSelect: boolean;
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private storageService: StorageService,
    private title: Title
  ) {
  }

  ngOnInit(): void {
    this.title.setTitle('Trang cá nhân');
    this.userProfile = JSON.parse(localStorage.getItem(CURRENT_USER));
    this.apiService.get('/api/mon-hoc/all').subscribe(data => {
      this.monHocList = data;
    });
    this.apiService.get('/api/hang-muc/all').subscribe(data => {
      this.hangMucModel = data;
    });
    this.apiService.get('/api/lop-hoc/all').subscribe(data => {
      this.lopHocModel = data;
    });
    this.userForm = this.fb.group({
      name: new FormControl(this.userProfile.name, [Validators.required]),
      gioitinh: new FormControl(this.userProfile.gioitinh, [Validators.required]),
      ngaysinh: new FormControl(this.userProfile.ngaysinh, [Validators.required]),
      // socmt: new FormControl(this.userProfile.socmt, [Validators.required]),
      // quoctich: new FormControl(this.userProfile.quoctich, [Validators.required]),
      // quequan: new FormControl(this.userProfile.quequan, [Validators.required]),
      noiohientai: new FormControl(this.userProfile.noiohientai, [Validators.required]),
      // hokhau: new FormControl(this.userProfile.hokhau, [Validators.required]),
      // quatrinhlamviec: new FormControl(this.userProfile.quatrinhlamviec, [Validators.required]),
      email: new FormControl(this.userProfile.email, [Validators.required, Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')]),
      sodt: new FormControl(this.userProfile.sodt, [Validators.required]),
      imageAvatar: new FormControl()
    });
    if (this.userProfile.role === ADMIN) {
      this.roleUser = 'Quản trị viên';
    }
    if (this.userProfile.role === TEACHER) {
      this.roleUser = 'Giáo viên';
      // this.userForm.addControl('tenLop', new FormControl(this.userProfile.tenLop, [Validators.required]));
      // this.userForm.addControl('tenMH', new FormControl(this.userProfile.tenMH, [Validators.required]));
      // this.userForm.addControl('tenHangMuc', new FormControl(this.userProfile.tenHangMuc, [Validators.required]));
      // this.userForm.addControl('kipDay', new FormControl(this.userProfile.kipDay, [Validators.required]));
    }
    if (this.userProfile.role === STUDENT) {
      this.roleUser = 'Học sinh';
    }
    if (this.userProfile.role === ANONYMOUS) {
      this.roleUser = 'Khách';
    }

    // this.avatarUrl = 'data:image/jpg;base64,' + this.userProfile.imagePath;
  }

  onEdit() {
    // if (this.userForm.valid) {
    let ngaysinh = (new Date(this.userForm.get('ngaysinh').value)).toUTCString();
    const formData = new FormData();
    formData.append('name', this.userForm.get('name').value);
    formData.append('gioitinh', this.userForm.get('gioitinh').value);
    formData.append('ngaysinh', ngaysinh);
    // formData.append('socmt', this.userForm.get('socmt').value);
    // formData.append('quoctich', this.userForm.get('quoctich').value);
    // formData.append('quequan', this.userForm.get('quequan').value);
    formData.append('noiohientai', this.userForm.get('noiohientai').value);
    // formData.append('hokhau', this.userForm.get('hokhau').value);
    formData.append('email', this.userForm.get('email').value);
    formData.append('sodt', this.userForm.get('sodt').value);
    if (this.userForm.get('imageAvatar').value !== null) {
      formData.append('imageAvatar', this.userForm.get('imageAvatar').value);
    }
    if (this.userProfile.role === TEACHER) {
      // formData.append('idLop', this.userForm.get('tenLop').value);
      // formData.append('tenMH', this.userForm.get('tenMH').value);
      // formData.append('tenHangMuc', this.userForm.get('tenHangMuc').value);
      // formData.append('kipDay', this.userForm.get('kipDay').value);
    }
    this.apiService.post('/api/user/edit-profile', formData).subscribe(res => {
      this.userProfile = res.data;
      this.userProfile.role = localStorage.getItem(ROLE);
      // this.avatarUrl = 'data:' + this.fileTypeImg + ';base64,' + this.userProfile.imagePath;
      localStorage.removeItem(CURRENT_USER);
      localStorage.setItem(CURRENT_USER, JSON.stringify(this.userProfile));
      this.toastr.success('Cập nhật thành công');
    }, error => {
      this.toastr.error('Cập nhật thất bại');
    });
    // }
  }

  uploadFile(event) {
    const imgTypes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/jpg'
    ];
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.preview = reader.result as string;
        if (file.type === 'image/jpeg' || file.type === 'image/pjpeg' || file.type === 'image/png' || file.type === 'image/jpg') {
          this.fileTypeImg = file.type;
          this.userForm.get('imageAvatar').setValue(file);
          this.fileSelect = true;
        } else {
          this.toastr.error('Định dạng ảnh không đúng!');
          this.userForm.get('imageAvatar').setValue('');
        }
      };
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
    return this.userForm.controls;
  }

  goMain() {
    this.switchTab = 1;
  }

  goHocBa() {
    this.switchTab = 2;
  }

  goToClass() {
    this.switchTab = 3;
  }

  goToPoints() {
    this.switchTab = 4;
  }

  goCheckIn() {
    this.switchTab = 5;
  }

  goTaiLieu() {
    this.switchTab = 6;
  }

  goThongKe() {
    this.switchTab = 7;
  }
}
