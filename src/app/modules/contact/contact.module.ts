import {NgModule} from '@angular/core';
import { ContactFormComponent } from './contact-form/contact-form.component';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    NgbModalModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ContactFormComponent]
})
export class ContactModule {

}
