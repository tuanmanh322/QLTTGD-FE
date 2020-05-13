import {NgModule} from '@angular/core';
import {TeacherListComponent} from './teacher-list/teacher-list.component';
import {TeacherCreateComponent} from './teacher-create/teacher-create.component';
import {TeacherEditComponent} from './teacher-edit/teacher-edit.component';
import {TeacherDetailComponent} from './teacher-detail/teacher-detail.component';
import {teacherRoutes} from './teacher-manager.routing';

@NgModule({
  declarations: [TeacherListComponent, TeacherCreateComponent, TeacherEditComponent, TeacherDetailComponent],
  imports: [
    teacherRoutes
  ],
  providers: []
})
export class TeacherManagerModule {
}
