import {NgModule} from '@angular/core';
import {ClientLayoutsModule} from '../../shared/client-layouts/client-layouts.module';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile/profile.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfileClassComponent} from './profile-class/profile-class.component';
import { ProfileHocbaComponent } from './profile-hocba/profile-hocba.component';
import { ProfilePointsComponent } from './profile-points/profile-points.component';
import { ProfileCheckinComponent } from './profile-checkin/profile-checkin.component';
import { ProfileThongkeComponent } from './profile-thongke/profile-thongke.component';
import { ProfileTailieuComponent } from './profile-tailieu/profile-tailieu.component';
import {PaginatorModule} from '../../shared/paginator/paginator.module';
import { ProfileHocbaDetailComponent } from './profile-hocba-detail/profile-hocba-detail.component';


@NgModule({
  declarations: [ProfileComponent, ProfileClassComponent, ProfileHocbaComponent, ProfilePointsComponent, ProfileCheckinComponent, ProfileThongkeComponent, ProfileTailieuComponent, ProfileHocbaDetailComponent],
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

    ]),
    PaginatorModule
  ]
})
export class SettingsModule {

}
