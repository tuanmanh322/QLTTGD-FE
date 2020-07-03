import {NgModule} from '@angular/core';
import {SubjectListComponent} from './subject-list/subject-list.component';
import {SubjectCreateComponent} from './subject-create/subject-create.component';
import {SubjectEditComponent} from './subject-edit/subject-edit.component';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {PaginatorModule} from '../../shared/paginator/paginator.module';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [SubjectListComponent, SubjectCreateComponent, SubjectEditComponent],
  imports: [
    NgbModalModule,
    PaginatorModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: SubjectListComponent
      }
    ])
  ]
})
export class SubjectModule {

}
