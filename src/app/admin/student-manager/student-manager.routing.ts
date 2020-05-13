import {RouterModule, Routes} from '@angular/router';
import {StudentListComponent} from './student-list/student-list.component';
import {StudentDetailComponent} from './student-detail/student-detail.component';
import {StudentCreateComponent} from './student-create/student-create.component';
import {StudentEditComponent} from './student-edit/student-edit.component';


const routes: Routes  = [
  {
    path: '',
    pathMatch: 'full',
    component: StudentListComponent,
    data: {
      title: 'Student-List',
      meta: {
        title: 'Student-list',
        description: 'Student-list',
        override: true
      },
    },
  },
  {
    path: 'detail/:id',
    component: StudentDetailComponent,
    data: {
      title: 'Student-Detail',
      meta: {
        title: 'Student-Detail',
        description: 'Student-Detail',
        override: true
      },
    },
  },
  {
    path: 'create',
    component: StudentCreateComponent,
    data: {
      title: 'Student-Create',
      meta: {
        title: 'Student-Create',
        description: 'Student-Create',
        override: true
      },
    },
  },
  {
    path: 'edit/:id',
    component: StudentEditComponent,
    data: {
      title: 'Student-Edit',
      meta: {
        title: 'Student-Edit',
        description: 'Student-Edit',
        override: true
      },
    },
  }
]
export const studentRoutes = RouterModule.forChild(routes);
