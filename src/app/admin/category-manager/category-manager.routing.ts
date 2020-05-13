import {RouterModule, Routes} from '@angular/router';
import {CategoryListComponent} from './category-list/category-list.component';
import {CategoryDetailsComponent} from './category-details/category-details.component';
import {CategoryCreateComponent} from './category-create/category-create.component';
import {CategoryEditComponent} from './category-edit/category-edit.component';


const routes : Routes  = [
  {
    path: '',
    pathMatch: 'full',
    component: CategoryListComponent,
    data: {
      title: 'Category-List',
      meta: {
        title: 'Category-list',
        description: 'Category-list',
        override: true
      },
    },
  },
  {
    path: 'detail/:id',
    component: CategoryDetailsComponent,
    data: {
      title: 'Category-Detail',
      meta: {
        title: 'Category-Detail',
        description: 'Category-Detail',
        override: true
      },
    },
  },
  {
    path: 'create',
    component: CategoryCreateComponent,
    data: {
      title: 'Category-Create',
      meta: {
        title: 'Category-Create',
        description: 'Category-Create',
        override: true
      },
    },
  },
  {
    path: 'edit/:id',
    component: CategoryEditComponent,
    data: {
      title: 'Category-Edit',
      meta: {
        title: 'Category-Edit',
        description: 'Category-Edit',
        override: true
      },
    },
  }
]
export const categoryRoutes = RouterModule.forChild(routes);
