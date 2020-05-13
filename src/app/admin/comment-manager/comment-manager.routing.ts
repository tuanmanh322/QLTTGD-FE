import {RouterModule, Routes} from '@angular/router';
import {CommentListComponent} from './comment-list/comment-list.component';
import {CommentDetailComponent} from './comment-detail/comment-detail.component';
import {CommentCreateComponent} from './comment-create/comment-create.component';
import {CommentEditComponent} from './comment-edit/comment-edit.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CommentListComponent,
    data: {
      title: 'Comment-List',
      meta: {
        title: 'Comment-list',
        description: 'Comment-list',
        override: true
      },
    },
  },
  {
    path: 'detail/:id',
    component: CommentDetailComponent,
    data: {
      title: 'Comment-Detail',
      meta: {
        title: 'Comment-Detail',
        description: 'Comment-Detail',
        override: true
      },
    },
  },
  {
    path: 'create',
    component: CommentCreateComponent,
    data: {
      title: 'Comment-Create',
      meta: {
        title: 'Comment-Create',
        description: 'Comment-Create',
        override: true
      },
    },
  },
  {
    path: 'edit/:id',
    component: CommentEditComponent,
    data: {
      title: 'Comment-Edit',
      meta: {
        title: 'Comment-Edit',
        description: 'Comment-Edit',
        override: true
      },
    },
  }
];
export const commentRoutes = RouterModule.forChild(routes);
