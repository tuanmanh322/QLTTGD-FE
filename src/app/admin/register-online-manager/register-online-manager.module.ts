import {NgModule} from '@angular/core';
import { ListRegisterComponent } from './list-register/list-register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {PaginatorModule} from '../../shared/paginator/paginator.module';
import {RouterModule} from '@angular/router';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PaginatorModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListRegisterComponent
      }
    ])
  ],
  declarations: [ListRegisterComponent],

})
export class RegisterOnlineManagerModule {

}
