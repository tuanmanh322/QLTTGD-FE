import {NgModule} from '@angular/core';
import {commentRoutes} from './comment-manager.routing';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentDetailComponent } from './comment-detail/comment-detail.component';
import { CommentCreateComponent } from './comment-create/comment-create.component';
import { CommentEditComponent } from './comment-edit/comment-edit.component';

@NgModule({
  declarations: [CommentListComponent, CommentDetailComponent, CommentCreateComponent, CommentEditComponent],
  imports: [
    commentRoutes
  ],
  providers: []
})
export class CommentManagerModule {
}
