import {NgModule} from '@angular/core';
import {CheckinListComponent} from './checkin-list/checkin-list.component';
import {CheckinLoadComponent} from './checkin-load/checkin-load.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {PaginatorModule} from '../../shared/paginator/paginator.module';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {PipeModule} from '../../shared/pipe/pipe.module';
import {CalendarCommonModule, CalendarDayModule, CalendarMonthModule, CalendarWeekModule} from 'angular-calendar';
import {FlatpickrModule} from 'angularx-flatpickr';
import {ClientLayoutsModule} from '../../shared/client-layouts/client-layouts.module';


@NgModule({
  declarations: [CheckinListComponent, CheckinLoadComponent],
  imports: [
    NgbModalModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    PaginatorModule,
    RouterModule.forChild([
      {
        path: '',
        component: CheckinListComponent
      },
      {
        path: 'detail/:id',
        component: CheckinLoadComponent
      }
    ]),
    PipeModule,
    CalendarCommonModule,
    CalendarWeekModule,
    CalendarDayModule,
    CalendarMonthModule,
    FlatpickrModule,
    ClientLayoutsModule
  ]
})
export class CheckinManagerModule {

}
