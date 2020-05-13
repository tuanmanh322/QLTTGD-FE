import {RouterModule, Routes} from '@angular/router';
import {PostListComponent} from './post-list/post-list.component';
import {PostDetailComponent} from './post-detail/post-detail.component';
import {PostCreateComponent} from './post-create/post-create.component';
import {PostEditComponent} from './post-edit/post-edit.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PostListComponent,
    data: {
      title: 'Post-List',
      meta: {
        title: 'Post-list',
        description: 'Post-list',
        override: true
      },
    },
  },
  {
    path: 'detail/:id',
    component: PostDetailComponent,
    data: {
      title: 'Post-Detail',
      meta: {
        title: 'Post-Detail',
        description: 'Post-Detail',
        override: true
      },
    },
  },
  {
    path: 'create',
    component: PostCreateComponent,
    data: {
      title: 'Post-Create',
      meta: {
        title: 'Post-Create',
        description: 'Post-Create',
        override: true
      },
    },
  },
  {
    path: 'edit/:id',
    component: PostEditComponent,
    data: {
      title: 'Post-Edit',
      meta: {
        title: 'Post-Edit',
        description: 'Post-Edit',
        override: true
      },
    },
  }
];
export const postRoutes = RouterModule.forChild(routes);
