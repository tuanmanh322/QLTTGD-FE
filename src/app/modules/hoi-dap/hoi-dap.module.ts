import {NgModule} from '@angular/core';
import {HoiDapComponent} from './hoi-dap.component';
import {ClientLayoutsModule} from '../../shared/client-layouts/client-layouts.module';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {PostCommentComponent} from './post-comment/post-comment.component';
import {PostBaivietComponent} from './post-baiviet/post-baiviet.component';
import {BaivietDetaiComponent} from './baiviet-detai/baiviet-detai.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [HoiDapComponent, PostCommentComponent, PostBaivietComponent, BaivietDetaiComponent],
  imports: [
    ClientLayoutsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HoiDapComponent
      }
    ]),
    CKEditorModule
  ]
})
export class HoiDapModule {

}
