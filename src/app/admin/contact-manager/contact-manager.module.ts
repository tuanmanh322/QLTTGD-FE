import {NgModule} from '@angular/core';
import {ContactListComponent} from './contact-list/contact-list.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaginatorModule} from '../../shared/paginator/paginator.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule
  ],
  declarations: [ContactListComponent]
})
export class ContactManagerModule {

}
