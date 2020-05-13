import {RouterModule, Routes} from '@angular/router';
import {ClassListComponent} from './class-list/class-list.component';
import {ClassDetailComponent} from './class-detail/class-detail.component';
import {ClassCreateComponent} from './class-create/class-create.component';
import {ClassEditComponent} from './class-edit/class-edit.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ClassListComponent,
    data: {
      title: 'Class-List',
      meta: {
        title: 'Class-list',
        description: 'Class-list',
        override: true
      },
    },
  },
  {
    path: 'detail/:id',
    component: ClassDetailComponent,
    data: {
      title: 'Class-Detail',
      meta: {
        title: 'Class-Detail',
        description: 'Class-Detail',
        override: true
      },
    },
  },
  {
    path: 'create',
    component: ClassCreateComponent,
    data: {
      title: 'Class-Create',
      meta: {
        title: 'Class-Create',
        description: 'Class-Create',
        override: true
      },
    },
  },
  {
    path: 'edit/:id',
    component: ClassEditComponent,
    data: {
      title: 'Class-Edit',
      meta: {
        title: 'Class-Edit',
        description: 'Class-Edit',
        override: true
      },
    },
  }
];
export const classRoutes = RouterModule.forChild(routes);
