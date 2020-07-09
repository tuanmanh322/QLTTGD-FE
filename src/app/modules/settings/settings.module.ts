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
import { ProfileTailieuAddComponent } from './profile-tailieu-add/profile-tailieu-add.component';
import { ProfileTailieuEditComponent } from './profile-tailieu-edit/profile-tailieu-edit.component';
import { ProfilePointsAddComponent } from './profile-points-add/profile-points-add.component';
import { ProfilePointsEditComponent } from './profile-points-edit/profile-points-edit.component';
import { RegisterLopComponent } from './register-lop/register-lop.component';
import {PipeModule} from '../../shared/pipe/pipe.module';


@NgModule({
  declarations: [ProfileComponent, ProfileClassComponent, ProfileHocbaComponent, ProfilePointsComponent, ProfileCheckinComponent, ProfileThongkeComponent, ProfileTailieuComponent, ProfileHocbaDetailComponent, ProfileTailieuAddComponent, ProfileTailieuEditComponent, ProfilePointsAddComponent, ProfilePointsEditComponent, RegisterLopComponent],
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
      {
        path: 'register-lop',
        component: RegisterLopComponent
      }

    ]),
    PaginatorModule,
    PipeModule
  ]
})
export class SettingsModule {

}
