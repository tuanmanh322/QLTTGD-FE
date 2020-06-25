import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {PaginatorModule} from '../../shared/paginator/paginator.module';


@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModalModule,
    PaginatorModule
  ]
})
export class UserManagerModule {

}
