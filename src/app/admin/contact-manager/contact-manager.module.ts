import {NgModule} from '@angular/core';
import {ContactListComponent} from './contact-list/contact-list.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaginatorModule} from '../../shared/paginator/paginator.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule,
    RouterModule.forChild([
      {
        path: '',
        component: ContactListComponent
      }
    ])
  ],
  declarations: [ContactListComponent]
})
export class ContactManagerModule {

}
