import {NgModule} from '@angular/core';
import {StudentListComponent} from './student-list/student-list.component';
import {StudentDetailComponent} from './student-detail/student-detail.component';
import {StudentCreateComponent} from './student-create/student-create.component';
import {StudentEditComponent} from './student-edit/student-edit.component';
import {studentRoutes} from './student-manager.routing';

@NgModule({
  declarations: [StudentListComponent, StudentDetailComponent, StudentCreateComponent, StudentEditComponent],
  imports: [
    studentRoutes
  ],
  providers: []
})
export class StudentManagerModule {
}
