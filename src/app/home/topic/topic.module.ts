import {NgModule} from '@angular/core';
import {LoadAllTopicComponent} from './load-all-topic/load-all-topic.component';
import {LoadByCategoryComponent} from './load-by-category/load-by-category.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import {PipeModule} from '../../shared/pipe/pipe.module';
import {SharedModule} from '../../shared/shared.module';
import {DataService} from '../../shared/service/data.service';


@NgModule({
  declarations: [LoadAllTopicComponent, LoadByCategoryComponent, TopicDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'all-topic',
        pathMatch: 'full'
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
        path: 'all-topic/topic/:id',
        component: TopicDetailComponent
      }
    ]),
    PipeModule,
    SharedModule
  ],
  providers: [DataService]
})
export class TopicModule {

}
