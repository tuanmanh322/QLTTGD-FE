import {NgModule} from '@angular/core';
import {TopicCreateComponent} from './topic-create/topic-create.component';
import {TopicListComponent} from './topic-list/topic-list.component';
import {TopicDetailComponent} from './topic-detail/topic-detail.component';
import {TopicEditComponent} from './topic-edit/topic-edit.component';
import {topicRoutes} from './topic-manager.routing';

@NgModule({
  declarations: [TopicCreateComponent, TopicListComponent, TopicDetailComponent, TopicEditComponent],
  imports: [
    topicRoutes
  ],
  providers: []
})
export class TopicManagerModule {
}
