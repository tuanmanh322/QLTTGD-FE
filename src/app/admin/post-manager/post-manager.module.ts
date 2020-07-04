import {NgModule} from '@angular/core';
import {PostCreateComponent} from './post-create/post-create.component';
import {PostListComponent} from './post-list/post-list.component';
import {PostDetailComponent} from './post-detail/post-detail.component';
import {PostEditComponent} from './post-edit/post-edit.component';
import {postRoutes} from './post-manager.routing';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaginatorModule} from '../../shared/paginator/paginator.module';

@NgModule({
  declarations: [PostCreateComponent, PostListComponent, PostDetailComponent, PostEditComponent],
  imports: [
    postRoutes,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PaginatorModule
  ],
  providers: []
})
export class PostManagerModule {
}
