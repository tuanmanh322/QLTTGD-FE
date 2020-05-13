import {NgModule} from '@angular/core';
import {MainComponent} from './main/main.component';
import {FooterAdminComponent} from './footer-admin/footer-admin.component';
import {NavbarAdminComponent} from './navbar-admin/navbar-admin.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [MainComponent, FooterAdminComponent, NavbarAdminComponent],
  imports: [
    CommonModule, RouterModule,   NgbModule, FormsModule, ReactiveFormsModule
  ],
  exports: [MainComponent, FooterAdminComponent, NavbarAdminComponent]
})
export class LayoutsModule {
}

