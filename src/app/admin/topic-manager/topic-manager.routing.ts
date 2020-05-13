import {RouterModule, Routes} from '@angular/router';
import {TopicListComponent} from './topic-list/topic-list.component';
import {TopicDetailComponent} from './topic-detail/topic-detail.component';
import {TopicCreateComponent} from './topic-create/topic-create.component';
import {TopicEditComponent} from './topic-edit/topic-edit.component';


const routes: Routes  = [
  {
    path: '',
    pathMatch: 'full',
    component: TopicListComponent,
    data: {
      title: 'Topic-List',
      meta: {
        title: 'Topic-list',
        description: 'Topic-list',
        override: true
      },
    },
  },
  {
    path: 'detail/:id',
    component: TopicDetailComponent,
    data: {
      title: 'Topic-Detail',
      meta: {
        title: 'Topic-Detail',
        description: 'Topic-Detail',
        override: true
      },
    },
  },
  {
    path: 'create',
    component: TopicCreateComponent,
    data: {
      title: 'Topic-Create',
      meta: {
        title: 'Topic-Create',
        description: 'Topic-Create',
        override: true
      },
    },
  },
  {
    path: 'edit/:id',
    component: TopicEditComponent,
    data: {
      title: 'Topic-Edit',
      meta: {
        title: 'Topic-Edit',
        description: 'Topic-Edit',
        override: true
      },
    },
  }
]
export const topicRoutes = RouterModule.forChild(routes);
