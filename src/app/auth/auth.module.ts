import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {ClientLayoutsModule} from '../shared/client-layouts/client-layouts.module';
import { NotifyComponent } from './notify/notify.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, NotifyComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    ClientLayoutsModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ])
  ],
  exports: [LoginComponent, RegisterComponent]
})
export class AuthModule {

}
