import {ModuleWithProviders, NgModule} from '@angular/core';
import {ApiService} from './service/api.service';
import {LayoutsModule} from './layouts/layouts.module';
import {PaginatorModule} from './paginator/paginator.module';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgbAccordionModule} from '@ng-bootstrap/ng-bootstrap';
import {StorageService} from './service/storage.service';
import {UserService} from './service/user.service';
import {EventManagement} from './service/event.management';
import {DataService} from './service/data.service';
import {NotificationService} from './service/notification.service';
import {ChuDeService} from './service/chu-de.service';
import {BaiVietService} from './service/bai-viet.service';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {FlatpickrDefaults} from 'angularx-flatpickr';
import {CookieeService} from './service/Cookiee.service';


@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    CommonModule,
    PaginatorModule,
    NgbAccordionModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports: [LayoutsModule],
  providers: [
    ApiService,
    StorageService,
    UserService,
    EventManagement,
    DataService,
    NotificationService,
    ChuDeService,
    BaiVietService,
    FlatpickrDefaults,
    CookieeService
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return { ngModule: SharedModule };
  }
}
