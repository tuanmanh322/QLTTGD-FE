import {NgModule} from '@angular/core';
import {LoadAllTopicComponent} from './load-all-topic/load-all-topic.component';
import {LoadByCategoryComponent} from './load-by-category/load-by-category.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import {PipeModule} from '../../shared/pipe/pipe.module';


@NgModule({
  declarations: [LoadAllTopicComponent, LoadByCategoryComponent, TopicDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'all-topic'
      },
      {
        path: 'all-topic',
        component: LoadAllTopicComponent
      },
      {
        path: 'all-topic/by-c/:id',
        component: LoadByCategoryComponent
      },
      {
        path: 'topic/:id',
        component: TopicDetailComponent
      }
    ]),
    PipeModule
  ],
  providers: []
})
export class TopicModule {

}
