import {NgModule} from '@angular/core';
import {TopicCreateComponent} from './topic-create/topic-create.component';
import {TopicListComponent} from './topic-list/topic-list.component';
import {TopicDetailComponent} from './topic-detail/topic-detail.component';
import {TopicEditComponent} from './topic-edit/topic-edit.component';
import {topicRoutes} from './topic-manager.routing';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {PaginatorModule} from '../../shared/paginator/paginator.module';

@NgModule({
  declarations: [TopicCreateComponent, TopicListComponent, TopicDetailComponent, TopicEditComponent],
  imports: [
    topicRoutes,
    NgbModalModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    PaginatorModule
  ],
  providers: []
})
export class TopicManagerModule {
}
