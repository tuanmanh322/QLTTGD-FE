import {NgModule} from '@angular/core';
import {StudentListComponent} from './student-list/student-list.component';
import {StudentDetailComponent} from './student-detail/student-detail.component';
import {StudentCreateComponent} from './student-create/student-create.component';
import {StudentEditComponent} from './student-edit/student-edit.component';
import {studentRoutes} from './student-manager.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginatorModule } from 'src/app/shared/paginator/paginator.module';

@NgModule({
  declarations: [StudentListComponent, StudentDetailComponent, StudentCreateComponent, StudentEditComponent],
  imports: [
    studentRoutes,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModalModule,
    PaginatorModule
  ],
  providers: [],
  entryComponents: [StudentCreateComponent]
})
export class StudentManagerModule {
}
