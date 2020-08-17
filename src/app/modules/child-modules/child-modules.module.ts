import {NgModule} from '@angular/core';
import {DocumentDataComponent} from './document-data/document-data.component';
import {PipeModule} from '../../shared/pipe/pipe.module';
import {SharedModule} from '../../shared/shared.module';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaginatorModule} from '../../shared/paginator/paginator.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {SocialSharingModule} from '../../shared/social-sharing/social-sharing.module';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [DocumentDataComponent],
  imports: [
    PipeModule,
    SharedModule,
    CKEditorModule,
    FormsModule,
    PaginatorModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    SocialSharingModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'all',
        pathMatch: 'full'
      },
      {
        path: 'all',
        component: DocumentDataComponent,
      }
    ]),
    CommonModule
  ]
})
export class ChildModulesModule {

}
