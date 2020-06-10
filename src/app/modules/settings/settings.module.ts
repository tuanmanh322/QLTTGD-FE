import {NgModule} from '@angular/core';
import {ClientLayoutsModule} from '../../shared/client-layouts/client-layouts.module';
import {CommonModule} from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ClientLayoutsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        component: ProfileComponent
      },

    ])
  ]
})
export class SettingsModule {

}
