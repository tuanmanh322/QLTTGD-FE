import {RouterModule, Routes} from '@angular/router';
import {TeacherListComponent} from './teacher-list/teacher-list.component';
import {TeacherDetailComponent} from './teacher-detail/teacher-detail.component';
import {TeacherCreateComponent} from './teacher-create/teacher-create.component';
import {TeacherEditComponent} from './teacher-edit/teacher-edit.component';


const routes: Routes  = [
  {
    path: '',
    pathMatch: 'full',
    component: TeacherListComponent,
    data: {
      title: 'Teacher-List',
      meta: {
        title: 'Teacher-list',
        description: 'Teacher-list',
        override: true
      },
    },
  },
  {
    path: 'detail/:id',
    component: TeacherDetailComponent,
    data: {
      title: 'Teacher-Detail',
      meta: {
        title: 'Teacher-Detail',
        description: 'Teacher-Detail',
        override: true
      },
    },
  },
  {
    path: 'create',
    component: TeacherCreateComponent,
    data: {
      title: 'Teacher-Create',
      meta: {
        title: 'Teacher-Create',
        description: 'Teacher-Create',
        override: true
      },
    },
  },
  {
    path: 'edit/:id',
    component: TeacherEditComponent,
    data: {
      title: 'Teacher-Edit',
      meta: {
        title: 'Teacher-Edit',
        description: 'Teacher-Edit',
        override: true
      },
    },
  }
]
export const teacherRoutes = RouterModule.forChild(routes);
