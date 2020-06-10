import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientLayoutsModule} from '../../shared/client-layouts/client-layouts.module';
import {RouterModule} from '@angular/router';
import {ProfileDetailComponent} from './profile-detail/profile-detail.component';


@NgModule({
  imports: [
    CommonModule,
    ClientLayoutsModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profile-emp'
      },
      {
        path: 'profile-emp/:id',
        component: ProfileDetailComponent
      }
    ])
  ],
  declarations: [ProfileDetailComponent],
  exports: [ProfileDetailComponent]
})
export class ProfileEmpModule {

}
