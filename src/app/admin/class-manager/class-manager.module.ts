import {NgModule} from '@angular/core';
import {ClassCreateComponent} from './class-create/class-create.component';
import {ClassListComponent} from './class-list/class-list.component';
import {ClassDetailComponent} from './class-detail/class-detail.component';
import {ClassEditComponent} from './class-edit/class-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {PaginatorModule} from '../../shared/paginator/paginator.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [ClassCreateComponent, ClassListComponent, ClassDetailComponent, ClassEditComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModalModule,
    PaginatorModule,
    RouterModule.forChild([
      {
        path: '',
        component: ClassListComponent
      }
    ])
  ],
  providers: [],
  entryComponents: [ClassCreateComponent]
})
export class ClassManagerModule {
}
