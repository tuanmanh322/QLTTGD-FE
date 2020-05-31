import {NgModule} from '@angular/core';
import {LoadAllTopicComponent} from './load-all-topic/load-all-topic.component';
import {LoadByCategoryComponent} from './load-by-category/load-by-category.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [LoadAllTopicComponent, LoadByCategoryComponent],
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
        path: 'by-c/:id',
        component: LoadByCategoryComponent
      }
    ])
  ],
  providers: []
})
export class TopicModule {

}
