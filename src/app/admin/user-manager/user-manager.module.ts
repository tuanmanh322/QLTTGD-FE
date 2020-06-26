import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {PaginatorModule} from '../../shared/paginator/paginator.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import {RouterModule} from '@angular/router';
import { UserEditComponent } from './user-edit/user-edit.component';


@NgModule({
  declarations: [UserListComponent, UserCreateComponent, UserEditComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModalModule,
    PaginatorModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserListComponent
      }
    ])
  ]
})
export class UserManagerModule {

}
