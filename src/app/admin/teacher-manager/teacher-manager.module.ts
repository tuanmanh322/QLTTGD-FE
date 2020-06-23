import {NgModule} from '@angular/core';
import {TeacherListComponent} from './teacher-list/teacher-list.component';
import {TeacherCreateComponent} from './teacher-create/teacher-create.component';
import {TeacherEditComponent} from './teacher-edit/teacher-edit.component';
import {TeacherDetailComponent} from './teacher-detail/teacher-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {PaginatorModule} from '../../shared/paginator/paginator.module';
import {RouterModule} from '@angular/router';
import { CardTeacherComponent } from './card-teacher/card-teacher.component';

@NgModule({
  declarations: [TeacherListComponent, TeacherCreateComponent, TeacherEditComponent, TeacherDetailComponent, CardTeacherComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModalModule,
    PaginatorModule,
    RouterModule.forChild([
      {
        path: '',
        component: TeacherListComponent
      }
    ])
  ],
})
export class TeacherManagerModule {
}
