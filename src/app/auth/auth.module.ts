import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {ClientLayoutsModule} from '../shared/client-layouts/client-layouts.module';
import { NotifyComponent } from './notify/notify.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {AuthGuard} from '../shared/guard/auth.guard';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, NotifyComponent, PasswordChangeComponent, ForgotPasswordComponent],
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
      },
      {
        path: 'change-password',
        canActivate: [AuthGuard],
        component: PasswordChangeComponent
      }
    ])
  ],
  exports: [LoginComponent, RegisterComponent]
})
export class AuthModule {

}
