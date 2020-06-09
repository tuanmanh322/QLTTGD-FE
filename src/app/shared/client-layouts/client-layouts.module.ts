import {NgModule} from '@angular/core';
import { MainClientComponent } from './main-client/main-client.component';
import { NavbarClientComponent } from './navbar-client/navbar-client.component';
import { FooterClientComponent } from './footer-client/footer-client.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HasAnyAuthorityDirective} from '../directive/has-any-authority.directive';
import {SharedModule} from '../shared.module';
import { SearchFormClientComponent } from './search-form-client/search-form-client.component';


@NgModule({
  declarations: [MainClientComponent, NavbarClientComponent, FooterClientComponent, HasAnyAuthorityDirective, SearchFormClientComponent],
  imports: [
    CommonModule, RouterModule,   NgbModule, FormsModule, SharedModule
  ],
  exports: [MainClientComponent, NavbarClientComponent, FooterClientComponent, HasAnyAuthorityDirective]
})
export class ClientLayoutsModule {

}
