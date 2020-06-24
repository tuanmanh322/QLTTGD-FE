import {Component, Input, OnInit} from '@angular/core';
import {GiaoVienModel} from '../../../shared/model/giao-vien.model';
import {ApiService} from '../../../shared/service/api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrls: ['./teacher-edit.component.css']
})
export class TeacherEditComponent implements OnInit {
  @Input() gv: any;

  gvM: GiaoVienModel;

  gvForm: FormGroup;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.gvM = this.gv;

    this.gvForm = this.fb.group({
      Name: new FormControl(this.gvM.name, [Validators.required]),
      idLop: new FormControl(this.gvM.idLop, [Validators.required]),
      kipDay: new FormControl(this.gvM.kipDay, [Validators.required]),
      luongcoban: new FormControl(this.gvM.luongcoban, [Validators.required])
    });
  }

  edit() {
    this.api.put('/api/giao-vien/edit', this.gvForm.value).subscribe(res => {
      this.api.onFilter('edit-teacher');
    });
  }
}
