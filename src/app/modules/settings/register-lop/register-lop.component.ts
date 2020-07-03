import {Component, OnInit} from '@angular/core';
import {LopEnti} from '../../../shared/model/lop-enti';
import {Title} from '@angular/platform-browser';
import {ApiService} from '../../../shared/service/api.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register-lop',
  templateUrl: './register-lop.component.html',
  styleUrls: ['./register-lop.component.css']
})
export class RegisterLopComponent implements OnInit {
  lopLIst: LopEnti[];

  lopId: number[];

  lopRegister = [];
  kip1 = 'Kíp 1(7h - 9h)';
  kip2 = 'Kíp 2(9h30- 12h)';
  kip3 = 'Kíp 3(13h-15h)';
  kip4 = 'Kíp 4(15h-18h)';
  kip5 = 'Kíp 5(18h30-21h30)';

  checkSubmit: boolean;

  constructor(
    private title: Title,
    private api: ApiService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.title.setTitle('Đăng ký lớp học');
    this.fetchAllLop();
  }

  fetchAllLop() {
    this.api.get('/api/lop-hoc/get-lop-unexpired').subscribe(res => {
      this.lopLIst = res;
    });
  }

  getLop(event, o) {
    if (event.target.checked) {
      this.lopRegister.push(o);
      console.log(this.lopRegister);
    } else {
      this.lopRegister.forEach(item => {
        const lo = this.lopRegister.indexOf(item);
        if (item === o) {
          this.lopRegister.splice(lo, 1);
          console.log(this.lopRegister);
        }
      });
    }
  }

  removeListRe(lo) {
    this.lopRegister.forEach(it => {
      const lop = this.lopRegister.indexOf(it);
      if (it === lo) {
        this.lopRegister.splice(lop, 1);
        console.log(this.lopRegister);
      }
    });
  }

  onRegister() {
    if (this.lopRegister.length !== 0) {
      this.lopRegister.map(item => {
        this.api.get('/api/hoc-sinh/register-lop/' + item.id).subscribe(res => {
          if (res.code === 500) {
            this.toastr.error(res.message);
          } else {
            this.checkSubmit = true;
            this.toastr.success('Đăng ký thành công!');
          }
        });
      });
    }
  }
}
